import { Link } from "react-router";
import CommentCard from "../../ui/website/communities/CommentCard";

export default function CommunityPostDetails() {
  return (
    <section className="community-post-details">
      <div className="container" style={{ maxWidth: "800px" }}>
        {/* Post image */}
        <div className="post-image row">
          <div className="col-12 p-2">
            <div className="image-wrapper">
              <img
                src="/images/dashboard/community-post.svg"
                alt="community post"
              />
            </div>
          </div>{" "}
          <div className="col-12 p-2">
            {" "}
            {/* Title */}
            <h1 className="post-title">
              كيفية تحويل الرسوم ثلاثة الابعاد إلى ثنائية الابعاد
            </h1>
          </div>
          <div className="col-12 p-2">
            {/* Description */}
            <p className="post-description ">
              السيرة الذاتية هي عبارة عن ملخص منظم للخبرات المهنية، والخلفية
              التعليمية، والمهارات، والمعلومات الشخصية ذات الصلة بمقدم طلب
              العمل. تُستخدم السيرة الذاتية لعرض مؤهلات الشخص، والتعريف بالمهن
              التي عمل بها سابقًا، وما يمتلكه من قدرات وخبرات، وذلك بهدف تقديمها
              لأصحاب العمل عند التقدم لوظيفة معينة.
            </p>
          </div>
          <div className="col-12 p-2">
            {" "}
            <div className="post-links">
              <h3 className="links-title">الروابط</h3>
              <Link className="post-link">
                <img src="/icons/file-icon.svg" alt="file" />
                <span>https://zoom.us/1225dfe852ffa/php</span>
              </Link>
              <Link className="post-link">
                <img src="/icons/file-icon.svg" alt="file" />
                <span>https://zoom.us/1225dfe852ffa/php</span>
              </Link>
              <Link className="post-link">
                <img src="/icons/file-icon.svg" alt="file" />
                <span>https://zoom.us/1225dfe852ffa/php</span>
              </Link>
            </div>
          </div>
          <div className="col-12 p-2">
            {/* Post stats */}
            <div className="post-stats">
              <div className="stat-item">
                <img src="/icons/eye.svg" alt="views" />
                <span>5</span>
              </div>
              <div className="stat-item">
                <img src="/icons/heart-fill.svg" alt="likes" />
                <span>5</span>
              </div>
              <div className="stat-item">
                <img src="/icons/share.svg" alt="shares" />
                <span>5</span>
              </div>{" "}
              <div className="stat-item">
                <img src="/icons/comments.svg" alt="comments" />
                <span>5</span>
              </div>
              <div className="stat-item">
                <img src="/icons/comments.svg" alt="comments" />
                <span>5</span>
              </div>{" "}
            </div>
          </div>
          <div className="col-12 p-2">
            {" "}
            <div className="comments-section">
              <h3 className="comments-title">التعليقات</h3>
              {Array.from({ length: 5 }).map((_, index) => (
                <CommentCard key={index} className="comment-card" />
              ))}
            </div>
          </div>
        </div>

        {/* Comments */}
      </div>
    </section>
  );
}
