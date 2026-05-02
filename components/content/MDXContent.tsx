import type {
  AnchorHTMLAttributes,
  HTMLAttributes,
  QuoteHTMLAttributes,
} from "react";
import { MDXRemote } from "next-mdx-remote/rsc";

const mdxComponents = {
  h2: (props: HTMLAttributes<HTMLHeadingElement>) => <h2 {...props} />,
  h3: (props: HTMLAttributes<HTMLHeadingElement>) => <h3 {...props} />,
  p: (props: HTMLAttributes<HTMLParagraphElement>) => <p {...props} />,
  ul: (props: HTMLAttributes<HTMLUListElement>) => <ul {...props} />,
  ol: (props: HTMLAttributes<HTMLOListElement>) => <ol {...props} />,
  blockquote: (props: QuoteHTMLAttributes<HTMLQuoteElement>) => <blockquote {...props} />,
  a: (props: AnchorHTMLAttributes<HTMLAnchorElement>) => (
    <a {...props} rel="noreferrer" target={props.href?.startsWith("http") ? "_blank" : undefined} />
  ),
};

export function MDXContent({ source }: { source: string }) {
  return (
    <div className="rich-text">
      <MDXRemote source={source} components={mdxComponents} />
    </div>
  );
}
