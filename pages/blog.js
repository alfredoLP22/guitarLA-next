import Layout from "@/components/layout";
import Post from "@/components/post";
import styles from '@/styles/grid.module.css';

function Blog({ posts }) {
  return (
    <Layout title={"Blog"} description={"Nuestro blog"}>
      <main className="contenedor">
        <h2 className="heading">Blog</h2>
        <div className={styles.grid}>
          {posts?.map((post) => (
            <Post post={post.attributes} key={post.id} />
          ))}
        </div>
      </main>
    </Layout>
  );
}

export async function getStaticProps() {
  const resp = await fetch(`${process.env.API_URL}/posts?populate=imagen`);
  const { data: posts } = await resp.json();

  return {
    props: {
      posts,
    },
  };
}
export default Blog;
