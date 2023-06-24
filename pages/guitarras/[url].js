import Image from "next/image";
import styles from "@/styles/guitarras.module.css";
import Layout from "@/components/layout";
import { useState } from "react";

function Producto({ guitarra, agregarCarrito }) {
  const [cantidad, setCantidad ] = useState(0);
  const { nombre, descripcion, imagen, precio } = guitarra[0].attributes;

  const handleSubmit = (e) => {
    e.preventDefault();
    if(cantidad < 1) {
      alert("cantidad no valida");
      return;
    }
    const guitarraSeleccionada = {
      id: guitarra[0].id,
      imagen: imagen.data.attributes.formats.medium.url,
      nombre,
      precio,
      cantidad
    }

    agregarCarrito(guitarraSeleccionada);
  }
  return (
    <Layout title={`Guitarra ${nombre}`}>
      <div className={styles.guitarra}>
        <Image
          src={imagen.data.attributes.formats.medium.url}
          alt={`Imagen ${nombre}`}
          width={600}
          height={400}
        />
        <div className={styles.contenido}>
          <h3>{nombre}</h3>
          <p className={styles.descripcion}>{descripcion}</p>
          <p className={styles.precio}>${precio}</p>

          <form className={styles.formulario} onSubmit={handleSubmit}>
            <label htmlFor="cantidad">Cantidad</label>
            <select id="cantidad" onChange={(e) => setCantidad(+e.target.value)}>
              <option value="0">-- Seleccione --</option>              
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>

            <input type="submit" value={'Agregar al carrito'}/>
          </form>
        </div>
      </div>
    </Layout>
  );
}
// export async function getServerSideProps({ query: { url } }) {
//   const resp = await fetch(
//     `${process.env.API_URL}/guitarras?filters[url]=${url}&populate=imagen`
//   );
//   const { data: guitarra } = await resp.json();

//   return {
//     props: {
//       guitarra,
//     },
//   };
// }
export async function getStaticPaths() {
  const resp = await fetch(`${process.env.API_URL}/guitarras`);
  const { data } = await resp.json();

  const paths = data.map((guitarra) => ({
    params: {
      url: guitarra.attributes.url,
    },
  }));

  return {
    paths,
    fallback: false,
  };
}
export async function getStaticProps({ params: { url } }) {
  const resp = await fetch(
    `${process.env.API_URL}/guitarras?filters[url]=${url}&populate=imagen`
  );
  const { data: guitarra } = await resp.json();

  return {
    props: {
      guitarra,
    },
  };
}
export default Producto;
