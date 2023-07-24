import ProductItem from "./ProductItem";
import classes from "./Products.module.css";

const DUMMY_PRODUCTS = [
  {
    id: 1,
    price: 6,
    title: "Book",
    description: "My First Book",
  },
  {
    id: 2,
    price: 16,
    title: "Book",
    description: "My First Book",
  },
  {
    id: 3,
    price: 10,
    title: "Book",
    description: "My First Book",
  },
  {
    id: 4,
    price: 15,
    title: "Book",
    description: "My First Book",
  },
];

const Products = (props) => {
  return (
    <section className={classes.products}>
      <h2>Buy your favorite products</h2>
      <ul>
        {DUMMY_PRODUCTS.map((product) => {
          return (
            <ProductItem
              key={product.id}
              title={product.title}
              price={product.price}
              description={product.description}
              id={product.id}
            />
          );
        })}
      </ul>
    </section>
  );
};

export default Products;
