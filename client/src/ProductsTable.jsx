import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
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

// ProductsTable component: shows products in a styled MUI table
const ProductsTable = () => {
  // useState to store the products we get from the API
  const [products, setProducts] = useState([]);

  // useEffect runs once when the component mounts
  useEffect(() => {
    // Fetching real product data from Fake Store API
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json()) // Parse JSON response
      .then((data) => setProducts(data)); // Store data in state
  }, []);

  const handleDelete = (id) => {
    fetch(`https://fakestoreapi.com/products/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then(() => {
        // Remove the product visually from the table
        setProducts(products.filter((product) => product.id !== id));
      })
      .catch((err) => console.error("Delete failed", err));
  };

  return (
    <>
      {/* Title above the table */}
      <Typography variant="h4" gutterBottom>
        Product List
      </Typography>

      {/* Material UI Table with Paper background */}
      <TableContainer component={Paper}>
        <Table aria-label="product table">
          <TableHead>
            <TableRow>
              <TableCell>Image</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Category</TableCell>
              <TableCell align="right">Price ($)</TableCell>
              <TableCell align="right">Actions</TableCell>
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
                    sx={{ width: 50, height: 50 }}
                  />
                </TableCell>
                <TableCell>{product.title}</TableCell>
                <TableCell>{product.category}</TableCell>
                <TableCell align="right">{product.price}</TableCell>

                {/* This is where product.id is valid */}
                <TableCell align="right">
                  <IconButton
                    color="error"
                    onClick={() => handleDelete(product.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default ProductsTable;
