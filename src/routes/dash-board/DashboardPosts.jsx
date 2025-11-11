import PostCard from "../../ui/website/communities/posts/PostCard";

export default function DashboardPosts() {
  const posts = [
    {
      id: 1,
      title: "Sunset Over the Mountains",
      desc: "Captured this beautiful sunset during my last hike.",
      file: "https://via.placeholder.com/400x300.png?text=Sunset",
      type: "image",
      aspect_ratio: "4/3",
      created_at: "2025-11-11",
      views_count: 120,
      likes_count: 45,
      comments_count: 10,
      shares_count: 5,
    },
    {
      id: 2,
      title: "Morning Coffee Routine",
      desc: "A quick video showing my morning coffee setup.",
      file: "https://www.w3schools.com/html/mov_bbb.mp4",
      type: "video",
      aspect_ratio: "16/9",
      created_at: "2025-11-10",
      views_count: 98,
      likes_count: 30,
      comments_count: 7,
      shares_count: 3,
    },
    {
      id: 3,
      title: "City Lights Photography",
      desc: "Long exposure shots of the city at night.",
      file: "https://via.placeholder.com/400x400.png?text=City+Lights",
      type: "image",
      aspect_ratio: "1/1",
      created_at: "2025-11-09",
      views_count: 200,
      likes_count: 80,
      comments_count: 25,
      shares_count: 12,
    },
    {
      id: 4,
      title: "Yoga Routine",
      desc: "A short video of my morning yoga stretches.",
      file: "https://www.w3schools.com/html/movie.mp4",
      type: "video",
      aspect_ratio: "16/9",
      created_at: "2025-11-08",
      views_count: 150,
      likes_count: 60,
      comments_count: 15,
      shares_count: 8,
    },
    {
      id: 5,
      title: "Nature Walk",
      desc: "Peaceful walk in the forest with amazing scenery.",
      file: "https://via.placeholder.com/400x250.png?text=Nature+Walk",
      type: "image",
      aspect_ratio: "16/10",
      created_at: "2025-11-07",
      views_count: 90,
      likes_count: 20,
      comments_count: 5,
      shares_count: 2,
    },
  ];

  return (
    <div className="consultations-section">
      <div className="row">
        {posts.map((post) => (
          <div className="col-12 p-2" key={post.id}>
            <PostCard post={post} />
          </div>
        ))}
      </div>
    </div>
  );
}
