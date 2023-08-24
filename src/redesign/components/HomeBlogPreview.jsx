import style from "../style";
import { SectionBottom, SectionTop } from "./Section";
import { posts } from "../data/Posts";
import useDisplayCategory from "./useDisplayCategory";
import Carousel from "./Carousel";
import moment from "moment";
import { useState } from "react";
import useCountryId from "./useCountryId";
import EmphasisedLink from "./EmphasisedLink";

export default function HomeBlogPreview() {
  const countryId = useCountryId();
  const featuredPosts =
    posts.filter(
      (post) => post.tags.includes("featured") && post.tags.includes(countryId)
    ) || [];
  const allPosts = posts.filter(
    (post) => post.tags.includes(countryId) || post.tags.includes("global")
  );
  const displayCategory = useDisplayCategory();
  return (
    <>
      <SectionTop
        backgroundColor={style.colors.WHITE}
        title="Expert policy analysis"
      />
      {
        {
          mobile: (
            <MobileBlogPreview
              featuredPosts={featuredPosts}
              allPosts={allPosts}
            />
          ),
          tablet: (
            <TabletBlogPreview
              featuredPosts={featuredPosts}
              allPosts={allPosts}
            />
          ),
          desktop: (
            <DesktopBlogPreview
              featuredPosts={featuredPosts}
              allPosts={allPosts}
            />
          ),
        }[displayCategory]
      }
    </>
  );
}

function ReadMore() {
  const displayCategory = useDisplayCategory();
  const mobile = displayCategory === "mobile";

  return <div style={{display: "flex", justifyContent: mobile ? "center" : "flex-end"}}>
    <div style={{
      margin: 40,
    }}>
      <EmphasisedLink text="Read more" url="/" size={14} />
    </div>
  </div>
}

function DesktopBlogPreview({ featuredPosts, allPosts }) {
  return (
    <SectionBottom>
      <div style={{ marginTop: 50, display: "flex", flexDirection: "row" }}>
        <FeaturedBlogPreview blogs={featuredPosts} />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            width: "40%",
            marginLeft: 20,
          }}
        >
          <SmallBlogPreview blog={allPosts[0]} />
          <div style={{ height: 20 }} />
          <SmallBlogPreview blog={allPosts[1]} />
          <div style={{ height: 20 }} />
          <SmallBlogPreview blog={allPosts[2]} />
          <div style={{ height: 20 }} />
          <SmallBlogPreview blog={allPosts[3]} />
        </div>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          marginTop: 40,
        }}
      >
        <MediumBlogPreview blog={allPosts[4]} />
        <div style={{ width: 40 }} />
        <MediumBlogPreview blog={allPosts[5]} />
        <div style={{ width: 40 }} />
        <MediumBlogPreview blog={allPosts[6]} />
      </div>
      <ReadMore />
    </SectionBottom>
  );
}

function TabletBlogPreview({ featuredPosts, allPosts }) {
  return (
    <SectionBottom>
      <div style={{ marginTop: 50, display: "flex", flexDirection: "row" }}>
        <FeaturedBlogPreview blogs={featuredPosts} />
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          marginTop: 40,
        }}
      >
        <div style={{ flex: 1 }}>
          <MediumBlogPreview blog={allPosts[4]} />
        </div>
        <div style={{ width: 40 }} />
        <div
          style={{
            display: "flex",
            flex: 1,
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <SmallBlogPreview blog={allPosts[5]} />
          <div style={{ height: 40 }} />
          <SmallBlogPreview blog={allPosts[6]} />
          <div style={{ height: 40 }} />
          <SmallBlogPreview blog={allPosts[7]} />
          <div style={{ height: 40 }} />
          <SmallBlogPreview blog={allPosts[8]} />
        </div>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          marginTop: 40,
        }}
      >
        <MediumBlogPreview blog={allPosts[4]} />
        <div style={{ width: 40 }} />
        <MediumBlogPreview blog={allPosts[5]} />
      </div>
      <ReadMore />
    </SectionBottom>
  );
}

function MobileBlogPreview({ featuredPosts, allPosts }) {
  return (
    <div>
      <div
        style={{
          display: "flex",
          overflowX: "scroll",
          marginBottom: 40,
          marginTop: 40,
        }}
      >
        <div style={{minWidth: 20}} />
        {featuredPosts.map((blog, i) => (
          <div
            key={i}
            style={{ minWidth: 250, marginLeft: 20, marginRight: 20 }}
          >
            <MediumBlogPreview blog={blog} />
          </div>
        ))}
        <div style={{minWidth: 20}} />
      </div>
      <SectionBottom>
        <div
          style={{
            display: "flex",
            flex: 1,
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <SmallBlogPreview blog={allPosts[5]} />
          <div style={{ height: 40 }} />
          <SmallBlogPreview blog={allPosts[6]} />
          <div style={{ height: 40 }} />
          <SmallBlogPreview blog={allPosts[7]} />
          <div style={{ height: 40 }} />
          <SmallBlogPreview blog={allPosts[8]} />
        </div>
      <ReadMore />
      </SectionBottom>
    </div>
  );
}

function BlogBox({
  topLeft,
  topRight,
  left,
  children,
  bottomLeft,
  bottomRight,
  noBorder,
  style,
}) {
  return (
    <div
      style={{
        display: "flex",
        border: noBorder ? null : `1px solid black`,
        ...style,
      }}
    >
      <div style={{display: "flex"}}>
      {left}
      </div>
      <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div>{topLeft}</div>
          <div>{topRight}</div>
        </div>
        {children}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: "auto",
          }}
        >
          <div>{bottomLeft}</div>
          <div>{bottomRight}</div>
        </div>
      </div>
    </div>
  );
}

function BlogTags({ tags }) {
  const displayCategory = useDisplayCategory();
  return (
    <div
      style={{
        display: "flex",
      }}
    >
      {tags.map((tag) => (
        <div
          key={tag}
          style={{
            backgroundColor:
              {
                featured: style.colors.TEAL_LIGHT,
                "in-the-news": style.colors.BLUE_LIGHT,
              }[tag] || style.colors.WHITE,
            padding: displayCategory === "desktop" ? 10 : 20,
            fontFamily: "Roboto",
            fontSize: 12,
            textTransform: "uppercase",
            borderRight: `1px solid ${style.colors.BLACK}`,
            borderBottom: `1px solid ${style.colors.BLACK}`,
          }}
        >
          {tag.replaceAll("-", " ")}
        </div>
      ))}
    </div>
  );
}

function FeaturedBlogPreview({ blogs }) {
  // Only defined for desktop and tablet displays
  const displayCategory = useDisplayCategory();
  const [currentBlogIndex, setCurrentBlogIndex] = useState(0);
  const currentBlog = blogs[currentBlogIndex] || {};
  const imageUrl = currentBlog.image
    ? require("../images/posts/" + currentBlog.image)
    : require("../images/placeholder.png");
  return (
    <div
      style={{
        width: displayCategory === "desktop" ? "60%" : "100%",
        height: "100%",
      }}
    >
      <img
        src={imageUrl}
        width="100%"
        height={displayCategory === "desktop" ? 450 : 400}
        style={{
          objectFit: "cover",
        }}
      />
      <div
        style={{
          border: `1px solid ${style.colors.BLACK}`,
        }}
      >
        <BlogBox
          noBorder
          topLeft={<BlogTags tags={currentBlog.tags || []} />}
          bottomRight={
            <div style={{ margin: 30 }}>
              <EmphasisedLink text="Read" url="/" size={14} />
            </div>
          }
          style={{
            backgroundColor: style.colors.TEAL_LIGHT,
          }}
        >
          <div style={{ padding: 30 }}>
            <p style={{ textTransform: "uppercase" }}>
              {moment(currentBlog.date).format("MMMM D, YYYY")}
            </p>
            <h3>{currentBlog.title}</h3>
            <p>{currentBlog.description}</p>
          </div>
        </BlogBox>
        <Carousel
          current={currentBlogIndex}
          total={blogs.length}
          setCurrent={setCurrentBlogIndex}
        />
      </div>
    </div>
  );
}

export function MediumBlogPreview({ blog }) {
  const displayCategory = useDisplayCategory();
  const imageUrl = blog.image
    ? require("../images/posts/" + blog.image)
    : require("../images/placeholder.png");
  return (
    <div
      style={{
        flex: 1,
      }}
    >
      <div>
        <img
          src={imageUrl}
          height={300}
          width="100%"
          style={{ objectFit: "cover" }}
        />
      </div>
      <BlogBox
        style={{
          backgroundColor: blog.tags.includes(["in-the-news"])
            ? style.colors.BLUE_LIGHT
            : style.colors.LIGHT_GRAY,
          minHeight: displayCategory === "mobile" ? 300 : 350,
        }}
        topLeft={<BlogTags tags={blog.tags} />}
        bottomRight={
          <div style={{ margin: 30 }}>
            <EmphasisedLink text="Read" url="/" size={14} />
          </div>
        }
      >
        <div style={{ padding: 20 }}>
          <p style={{ textTransform: "uppercase" }}>
            {moment(blog.date).format("MMMM D, YYYY")}
          </p>
          <h5>{blog.title}</h5>
          <p>{blog.description}</p>
        </div>
      </BlogBox>
    </div>
  );
}

function SideTags({ tags }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        backgroundColor: "red"
      }}
    >
      {tags.slice(0, 2).map((tag, i) => (
        <div
          key={tag}
          style={{
            flex: 1,
            backgroundColor:
              {
                featured: style.colors.TEAL_LIGHT,
                "in-the-news": style.colors.BLUE_LIGHT,
              }[tag] || style.colors.WHITE,
            padding: 20,
            fontFamily: "Roboto",
            fontSize: 12,
            textTransform: "uppercase",
            borderTop: i == 1 ? `1px solid ${style.colors.BLACK}` : "none",
            borderRight: `1px solid ${style.colors.BLACK}`,
            width: 50,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{
              transform: "rotate(-90deg)",
            }}
          >
            {tag.replaceAll("-", " ")}
          </div>
        </div>
      ))}
    </div>
  );
}

function SmallBlogPreview({ blog }) {
  const displayCategory = useDisplayCategory();
  let topLeft = null,
    left = null;
  if (displayCategory === "desktop") {
    topLeft = <BlogTags tags={blog.tags} />;
  } else {
    left = <SideTags tags={blog.tags} />;
  }

  return (
    <BlogBox
      topLeft={topLeft}
      left={left}
      topRight={
        <p
          style={{
            fontSize: 14,
            padding: 10,
            paddingBottom: 0,
            textTransform: "uppercase",
          }}
        >
          {moment(blog.date).format("MMMM D, YYYY")}
        </p>
      }
      bottomRight={
        <div style={{ marginRight: 10, marginBottom: 10 }}>
          <EmphasisedLink text="Read" url="/" size={14} />
        </div>
      }
      style={{
        backgroundColor: blog.tags.includes(["in-the-news"])
          ? style.colors.BLUE_LIGHT
          : style.colors.LIGHT_GRAY,
        height: "100%",
      }}
    >
      <div style={{ padding: 10, paddingTop: 0 }}>
        <h5>{blog.title}</h5>
      </div>
    </BlogBox>
  );
}
