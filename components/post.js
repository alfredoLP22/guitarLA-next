import Image from "next/image";
import Link from "next/link";
import styles from '@/styles/blog.module.css';
import { formatearFecha } from '@/utils/helper';

function Post({ post }) {
  const { cotenido, imagen, titulo, url, publishedAt } = post;
  return (
    <article>
      <Image
        width={600}
        height={400}
        src={imagen.data.attributes.formats.medium.url}
        alt={`Post ${titulo}`}
      />
      <div className={styles.cotenido}>
        <h3>{titulo}</h3>
        <p className={styles.fecha}>{formatearFecha(publishedAt)}</p>
        <p className={styles.resumen}>{cotenido}</p>
        <Link href={`/blog/${url}`} className={styles.enlace}>Leer post</Link>
      </div>
    </article>
  );
}

export default Post;
