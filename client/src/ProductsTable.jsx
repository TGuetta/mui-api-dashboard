import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Avatar,
} from "@mui/material";

const ProductsTable = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  return (
    <>
      <Typography variant="h4" gutterBottom>
        Product List
      </Typography>
      <TableContainer component={Paper}>
        <Table aria-label="product table">
          <TableHead>
            <TableRow>
              <TableCell>Image</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Category</TableCell>
              <TableCell align="right">Price ($)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.id}>
                <TableCell>
                  <Avatar
                    variant="square"
                    src={product.image}
                    alt={product.title}
                  />
                </TableCell>
                <TableCell>{product.title}</TableCell>
                <TableCell>{product.category}</TableCell>
                <TableCell align="right">{product.price}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default ProductsTable;
