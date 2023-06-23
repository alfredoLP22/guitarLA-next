import Layout from "@/components/layout";
import Guitarra from "@/components/guitarra";
import styles from '@/styles/grid.module.css';

function Tienda({ guitarras }) {
  return (
    <Layout title={"Tienda"} description={"tienda de musica"}>
      <main className="contenedor">
        <h2 className="heading">Nuestra colección</h2>
        <div className={styles.grid}>
          {guitarras?.map((guitarra) => (
            <Guitarra key={guitarra.id} guitarra={guitarra.attributes} />
          ))}
        </div>
      </main>
    </Layout>
  );
}
// export async function getStaticProps() {
//   const resp = await fetch(`${process.env.API_URL}/guitarras?populate=imagen`);
//   const { data: guitarras } = await resp.json();

//   return {
//     props: {
//       guitarras,
//     },
//   };
// }
export async function getServerSideProps() {
  const resp = await fetch(`${process.env.API_URL}/guitarras?populate=imagen`);
  const { data: guitarras } = await resp.json();

  return {
    props: {
      guitarras,
    },
  };
}
export default Tienda;

// const res = await fetch('https://api.github.com/repos/vercel/next.js')
// const {data: guitarras} = await resp.json();
