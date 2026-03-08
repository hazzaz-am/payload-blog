import Image from "next/image";
import { ArticleMetadata } from "../_components/article-metadata";

export default function BlogPostPage() {
  return (
    <div className="prose lg:prose-lg dark:prose-invert">
      <h1>How to Create a BLog</h1>

      <ArticleMetadata 
        intent="post"
        data={{
          author,
          publishedAt,
          readTimeMins
        }}
        className="not-prose"
      />

      <Image 
        src={""}
        alt=""
        width={600}
        height={300}
        className="w-full rounded-md object-center object-cover"
      />

      <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Molestiae, reiciendis!</p>
    </div>
  )
}