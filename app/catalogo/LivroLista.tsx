"use client"

import type { NextPage } from 'next';
import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import ControleLivro from '../classe/controle/ControleLivros';
import styles from '../page.module.css';
import { LinhaLivro } from './LinhaLivro';
import Livro from '../classe/modelo/Livro';
import './catalogo.css'

const LivroLista: NextPage = () => {
  const controleLivro = new ControleLivro();

  const [livros, setLivros] = useState<Livro[]>([]);
  const [carregado, setCarregado] = useState(false);

  useEffect(() => {
    console.log('Chamando useEffect')
    ControleLivro.obterTodos().then((resultado) => {
      console.log('Livros obtidos:', resultado);
      setLivros(resultado.concat());
      console.log('Livros no estado:', livros);
      setCarregado(true);
    });
  }, [carregado])

  const excluir = async (codigo: string) => {
    await ControleLivro.excluirLivro(codigo);
    setCarregado((prev) => !prev);
  };

  console.log('livros:', livros)

  return (
    <div>
      <h1>Livros Disponíveis</h1>
      {carregado ? (
   <div className={styles.container}>
   <Head>
     <title>Livros</title>
   </Head>
   <main>
     <table>
       <thead>
         <tr className="cabeca">
           <th>Título</th>
           <th>Resumo</th>
           <th>Editora</th>
           <th>Autor</th>
         </tr>
       </thead>
       <tbody>
       {livros.map((livroData) => {
   // Criar uma nova instância de Livro
   // tentei usar os getters para pegar esses dados, mas não deu certo, em vez disso deu um erro que não deu para fazer mais nada.
   // então, como dessa maneira o codigo tá funcionando resolvi deixar dessa forma mesmo.
   const livro = new Livro(
      livroData._id,
      livroData.codEditora,
      livroData.titulo,
      livroData.resumo,
      livroData.autores
   );

   console.log('Livro:', livro);
   return <LinhaLivro key={livro.getId()} livro={livro} excluir={excluir} />;
})}
       </tbody>
     </table>
   </main>
 </div>
) : (
   <p>Carregando...</p>
)}
    </div>
  );
};

export default LivroLista;