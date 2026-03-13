import Link from "next/link";

import type { Metadata } from "next";

import { blogPosts } from "@/data/blogs";

export const metadata: Metadata = {
  title: "Blog List | Truelysell",
  description:
    "Explore the latest service marketplace insights and practical booking guides.",
};

export default function BlogsPage() {
  return (
    <>
      <div className="breadcrumb-bar text-center">
        <div className="container">
          <div className="row">
            <div className="col-md-12 col-12">
              <h2 className="breadcrumb-title mb-2">Blog List</h2>
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb justify-content-center mb-0">
                  <li className="breadcrumb-item">
                    <Link href="/">Home</Link>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                    Blog List
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
            <div className="row justify-content-center">
              <div className="col-lg-8 col-md-10">
                {blogPosts.map((post) => (
                  <article key={post.id} className="blog-list">
                    <div className="blog-image">
                      <Link href={`/blogs/${post.slug}`}>
                        <img
                          src={post.image}
                          alt={post.title}
                          className="img-fluid w-100"
                        />
                      </Link>
                    </div>
                    <div className="blog-content-body">
                      <div className="d-flex align-items-center flex-wrap gap-2 mb-3">
                        <span className="badge badge-light text-dark p-2">
                          {post.category}
                        </span>
                        <span className="text-dark">
                          <i className="ti ti-calendar me-1" />
                          {post.publishedAt}
                        </span>
                        <span className="text-dark">
                          <i className="ti ti-clock-hour-4 me-1" />
                          {post.readTime}
                        </span>
                      </div>

                      <div>
                        <p className="fs-16 mb-2 text-dark">
                          <Link href={`/blogs/${post.slug}`}>{post.title}</Link>
                        </p>
                        <p className="fs-14">{post.excerpt}</p>

                        <div className="d-flex align-items-center flex-wrap gap-1">
                          <div className="d-flex align-items-center blog-profile">
                            <img
                              src={post.author.avatar}
                              alt={post.author.name}
                              className="avatar avatar-sm rounded-circle me-2"
                            />
                            <span className="fs-14 text-dark">
                              {post.author.name}
                            </span>
                          </div>
                          <div className="d-flex align-items-center blog-profile">
                            <span className="fs-14 text-dark d-flex align-items-center ms-3">
                              <span className="me-1">
                                <i className="ti ti-thumb-up text-gray" />
                              </span>
                              {post.likes} Like(s)
                            </span>
                          </div>
                          <div className="d-flex align-items-center blog-profile">
                            <span className="fs-14 text-dark d-flex align-items-center ms-3">
                              <span className="me-1">
                                <i className="ti ti-messages text-gray" />
                              </span>
                              {post.comments} Comment(s)
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>

            <div className="table-paginate d-flex justify-content-center align-items-center flex-wrap row-gap-3">
              <nav aria-label="Blog list pagination">
                <ul className="paginations d-flex justify-content-center align-items-center">
                  <li className="page-item me-2">
                    <span className="d-flex justify-content-center align-items-center text-muted">
                      <i className="ti ti-arrow-left me-2" />
                      Prev
                    </span>
                  </li>
                  <li className="page-item me-2">
                    <span className="page-link-1 active d-flex justify-content-center align-items-center">
                      1
                    </span>
                  </li>
                  <li className="page-item me-2">
                    <span className="d-flex justify-content-center align-items-center text-muted">
                      Next
                      <i className="ti ti-arrow-right ms-2" />
                    </span>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
