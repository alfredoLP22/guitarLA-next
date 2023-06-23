import Layout from "@/components/layout";
import Image from "next/image";
import styles from "@/styles/blog.module.css";
import { formatearFecha } from "@/utils/helper";

function Post({ post }) {
  const { cotenido, imagen, titulo, publishedAt } = post[0].attributes;

  return (
    <Layout title={`Guitarra ${titulo}`}>
      <article className={`${styles.post} ${styles['mt-3']}`}>
        <Image
          width={1000}
          height={400}
          src={imagen.data.attributes.formats.medium.url}
          alt={`Post ${titulo}`}
        />
        <div className={styles.cotenido}>
          <h3>{titulo}</h3>
          <p className={styles.fecha}>{formatearFecha(publishedAt)}</p>
          <p className={styles.texto}>{cotenido}</p>
        </div>
      </article>
    </Layout>
  );
}
export async function getServerSideProps({ query: { url } }) {
  const resp = await fetch(
    `${process.env.API_URL}/posts?filters[url]=${url}&populate=imagen`
  );
  const { data: post } = await resp.json();

  return {
    props: {
      post,
    },
  };
}
export default Post;
