import Card from "../../components/Card";
import { useEffect, useState } from "react";
import Menu from "../../components/Menu";
import { useCart } from "../../hooks/useCart";
import { useProduct } from "../../hooks/useProduct";
import PageWrapper from "../../components/PageWrapper";

import "./styled.scss";
import Footer from "../../components/Footer";

const Products = () => {
  const [quantity, setQuantity] = useState(0);
  const [productsToShow, setProductsToShow] = useState(20);
  const { searchedProducts, filterByCategoryArray, product, loadMoreProducts } =
    useProduct();

  const { addToCart } = useCart();

  const sendToCart = (id, qtd) => {
    const findedItem = searchedProducts.find((item) => id === item.PRODUTO_ID);

    addToCart(findedItem, qtd);
  };

  const extractCategories = () => {
    const categories = product.map((item) => {
      return {
        name: item.categoria.CATEGORIA_NOME,
        id: item.categoria.CATEGORIA_ID,
      };
    });
    return categories.filter(
      (item, i) =>
        categories.findIndex((item2) => item2.name === item.name) === i
    );
  };

  const filterByCheckbox = () => {
    const checkboxes = document.querySelectorAll(".category-input");
    const categories = [];
    checkboxes.forEach((checkbox) => {
      if (checkbox.checked) {
        categories.push(checkbox.value);
      }
    });
    filterByCategoryArray(categories);
  };

  const handleLoadMore = () => {
    setProductsToShow((prevCount) => prevCount + 20); // fará carregar mais 20 produtos
    loadMoreProducts(); 
  };

  return (
    <>
      <Menu />
      <PageWrapper id="wrapper-products">
        <div className="column">
          <span className="title_categories">Categorias</span>
          <div className="categories">
            {extractCategories().map((item, i) => (
              <span className="category-container" key={i}>
                <input
                  name={item.name}
                  type="checkbox"
                  className="category-input"
                  value={item.name}
                  onChange={filterByCheckbox}
                />
                <label htmlFor={item.name}>{item.name}</label>
              </span>
            ))}
          </div>
        </div>
        <div className="first-column">
          <div className="card-wrapper">
            {searchedProducts.length > 0 ? (
              searchedProducts.slice(0, productsToShow).map((item, i) => (
                <Card
                  key={i}
                  item={item}
                  setState={setQuantity}
                  state={quantity}
                  id={"card-" + item.PRODUTO_ID}
                  click={() =>
                    sendToCart(
                      item.PRODUTO_ID,
                      quantity["card-" + item.PRODUTO_ID]
                    )
                  }
                />
              ))
            ) : (
              <div>Nenhum produto encontrado!</div>
            )}
          </div>
          {searchedProducts.length > productsToShow && (
            <button className="load-more" onClick={handleLoadMore}>
              Carregar mais
            </button>
          )}
        </div>
      </PageWrapper>

      <Footer />
    </>
  );
};

export default Products;
