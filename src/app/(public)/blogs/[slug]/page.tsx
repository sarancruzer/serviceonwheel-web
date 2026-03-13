import Link from "next/link";
import { notFound } from "next/navigation";

import type { Metadata } from "next";

import {
  blogCategoryCounts,
  blogPosts,
  getBlogPostBySlug,
  getRelatedBlogPosts,
  recentBlogPosts,
} from "@/data/blogs";

type BlogDetailPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: BlogDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    return {
      title: "Blog | Truelysell",
    };
  }

  return {
    title: `${post.title} | Truelysell`,
    description: post.excerpt,
  };
}

export default async function BlogDetailPage({ params }: BlogDetailPageProps) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = getRelatedBlogPosts(post.slug, post.category);
  const categories = Object.entries(blogCategoryCounts).sort(
    ([left], [right]) => left.localeCompare(right),
  );
  const allTags = Array.from(
    new Set(blogPosts.flatMap((blogPost) => blogPost.tags)),
  ).slice(0, 8);

  return (
    <>
      <div className="breadcrumb-bar text-center">
        <div className="container">
          <div className="row">
            <div className="col-md-12 col-12">
              <h2 className="breadcrumb-title mb-2">Blog Details</h2>
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb justify-content-center mb-0">
                  <li className="breadcrumb-item">
                    <Link href="/">Home</Link>
                  </li>
                  <li className="breadcrumb-item">
                    <Link href="/blogs">Blogs</Link>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                    {post.title}
                  </li>
                </ol>
              </nav>
            </div>
          </div>
          <div className="breadcrumb-bg">
            <img
              src="/assets/img/bg/breadcrumb-bg-01.png"
              className="breadcrumb-bg-1"
              alt="Img"
            />
            <img
              src="/assets/img/bg/breadcrumb-bg-02.png"
              className="breadcrumb-bg-2"
              alt="Img"
            />
          </div>
        </div>
      </div>

      <div className="page-wrapper sow-blog-page">
        <div className="content">
          <div className="container">
            <div className="row">
              <div className="col-lg-8">
                <article className="blog-details">
                  <div className="blog-head mb-4">
                    <div className="blog-category">
                      <ul>
                        <li>
                          <span className="badge badge-light text-dark p-2">
                            {post.category}
                          </span>
                        </li>
                        <li>
                          <i className="ti ti-calendar me-1" />
                          {post.publishedAt}
                        </li>
                        <li>
                          <i className="ti ti-clock-hour-4 me-1" />
                          {post.readTime}
                        </li>
                      </ul>
                    </div>
                    <h3>{post.title}</h3>

                    <div className="d-flex align-items-center flex-wrap gap-3">
                      <div className="d-flex align-items-center">
                        <img
                          src={post.author.avatar}
                          alt={post.author.name}
                          className="avatar avatar-sm rounded-circle me-2"
                        />
                        <span>{post.author.name}</span>
                      </div>
                      <span className="text-muted">{post.author.role}</span>
                      <span className="text-muted">
                        <i className="ti ti-thumb-up me-1" />
                        {post.likes} likes
                      </span>
                      <span className="text-muted">
                        <i className="ti ti-messages me-1" />
                        {post.comments} comments
                      </span>
                    </div>
                  </div>

                  <div className="mb-4">
                    <img
                      src={post.detailImage ?? post.image}
                      alt={post.title}
                      className="img-fluid w-100 rounded-3"
                    />
                  </div>

                  <div className="blog-content">
                    {post.body.map((paragraph, index) => (
                      <div key={`${post.id}-paragraph-${index}`}>
                        <p>{paragraph}</p>
                        {index === 0 && post.highlight ? (
                          <p className="test-info my-4">{post.highlight}</p>
                        ) : null}
                      </div>
                    ))}
                  </div>

                  <div className="adicon-widget mt-4 flex-wrap justify-content-between">
                    <span>Tags</span>
                    <div className="d-flex align-items-center flex-wrap gap-2">
                      {post.tags.map((tag) => (
                        <span key={tag}>{tag}</span>
                      ))}
                    </div>
                  </div>
                </article>

                {relatedPosts.length > 0 ? (
                  <section className="mt-4">
                    <div className="d-flex align-items-center justify-content-between mb-3">
                      <h4 className="mb-0">Related Posts</h4>
                      <Link href="/blogs" className="link-primary">
                        View All
                      </Link>
                    </div>
                    <div className="row">
                      {relatedPosts.map((relatedPost) => (
                        <div key={relatedPost.id} className="col-md-6">
                          <article className="grid-blog h-100">
                            <div className="blog-image">
                              <Link href={`/blogs/${relatedPost.slug}`}>
                                <img
                                  src={relatedPost.image}
                                  alt={relatedPost.title}
                                  className="img-fluid w-100"
                                />
                              </Link>
                            </div>
                            <div className="blog-content p-3">
                              <div className="blog-category">
                                <ul>
                                  <li>{relatedPost.category}</li>
                                  <li>{relatedPost.publishedAt}</li>
                                </ul>
                              </div>
                              <h5 className="blog-title">
                                <Link href={`/blogs/${relatedPost.slug}`}>
                                  {relatedPost.title}
                                </Link>
                              </h5>
                              <p>{relatedPost.excerpt}</p>
                            </div>
                          </article>
                        </div>
                      ))}
                    </div>
                  </section>
                ) : null}
              </div>

              <div className="col-lg-4">
                <aside className="blog-sidebar">
                  <div className="card search-widget mb-4">
                    <div className="card-body">
                      <h5 className="side-title">Search</h5>
                      <div className="input-group">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Search blogs"
                          readOnly
                        />
                        <button type="button" className="btn">
                          <i className="ti ti-search" />
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="card about-widget mb-4">
                    <div className="card-body">
                      <img
                        src="/assets/img/blogs/blog-05.jpg"
                        alt="About our blog"
                      />
                      <h5 className="side-title">About Our Blog</h5>
                      <p>
                        Insights for customers, providers, and operators
                        building better service experiences across the
                        marketplace.
                      </p>
                      <Link href="/services" className="btn btn-dark w-100">
                        Browse Services
                      </Link>
                    </div>
                  </div>

                  <div className="card mb-4">
                    <div className="card-body">
                      <h5 className="side-title">Latest Posts</h5>
                      <ul className="latest-posts">
                        {recentBlogPosts.map((recentPost) => (
                          <li key={recentPost.id}>
                            <div className="post-thumb">
                              <Link href={`/blogs/${recentPost.slug}`}>
                                <img
                                  src={recentPost.image}
                                  alt={recentPost.title}
                                />
                              </Link>
                            </div>
                            <div className="post-info">
                              <p>{recentPost.publishedAt}</p>
                              <h4>
                                <Link href={`/blogs/${recentPost.slug}`}>
                                  {recentPost.title}
                                </Link>
                              </h4>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="card category-widget mb-4">
                    <div className="card-body">
                      <h5 className="side-title">Categories</h5>
                      <ul className="categories">
                        {categories.map(([category, count]) => (
                          <li key={category}>
                            <Link href="/blogs">
                              {category}
                              <span>{count}</span>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="card tags-widget">
                    <div className="card-body">
                      <h5 className="side-title">Popular Tags</h5>
                      <div className="ad-widget">
                        <ul>
                          {allTags.map((tag) => (
                            <li key={tag}>
                              <Link href="/blogs">{tag}</Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </aside>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
