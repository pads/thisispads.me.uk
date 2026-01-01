import { AtpAgent, RichText } from "@atproto/api";
import fs from "node:fs/promises";
import { glob } from "glob";
import { resolve } from "path";
import matter from "gray-matter";
import slug from "slug";

const BLUESKY_SERVICE = "https://bsky.social";

const getLatestBlogPost = async () => {
    const files = await glob("posts/*.md");

    const allPostMeta = await Promise.all(
        files.map(async (file) => {
            const content = await fs.readFile(resolve(file), { encoding: "utf8" });
            const meta = matter(content);
            const { title, description, date } = meta.data;
            const url = `${process.env.HOST}/blog/${slug(meta.data.title)}`;
            return {
                url,
                date,
                title,
                description,
            };
        }),
    );

    return allPostMeta.sort((current, next) => {
        return new Date(next.date).getTime() - new Date(current.date).getTime();
    })[0];
};

const publishLatestBlogPost = async (post) => {
    const agent = new AtpAgent({ service: BLUESKY_SERVICE });

    await agent.login({
        identifier: process.env.BLUESKY_IDENTIFIER,
        password: process.env.BLUESKY_PASSWORD,
    });

    const content = `${post.title}: ${post.description} ${post.url}`;

    // Create rich text to properly handle links
    const rt = new RichText({ text: content });
    await rt.detectFacets(agent);

    try {
        await agent.post({
            text: rt.text,
            facets: rt.facets,
            createdAt: new Date().toISOString(),
        });
        console.log("done");
    } catch (err) {
        console.error(err);
        process.exit(-1);
    }
};

getLatestBlogPost().then(publishLatestBlogPost);

