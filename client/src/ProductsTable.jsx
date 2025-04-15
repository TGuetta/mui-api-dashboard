import React, { useEffect, useState } from "react"; // Importing React and hooks

// Importing React and Material UI core components
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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  IconButton,
} from "@mui/material";

// Material UI components for styling
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

// ProductsTable component: shows products in a styled MUI table
const ProductsTable = () => {
  // useState to store the products we get from the API
  const [products, setProducts] = useState([]);

  const [editProduct, setEditProduct] = useState(null); // null when no dialog is open

  const [newProduct, setNewProduct] = useState({
    title: "",
    price: "",
    category: "",
    image: "",
  });

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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({ ...newProduct, [name]: value });
  };

  const handleAddProduct = (e) => {
    e.preventDefault();

    fetch("https://fakestoreapi.com/products", {
      method: "POST",
      body: JSON.stringify(newProduct),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        // Show it in the table (even if the API doesn't save it)
        setProducts([data, ...products]);

        // Clear the form
        setNewProduct({
          title: "",
          price: "",
          category: "",
          image: "",
        });
      });
  };

  const handleEditSave = () => {
    fetch(`https://fakestoreapi.com/products/${editProduct.id}`, {
      method: "PUT",
      body: JSON.stringify(editProduct),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((updatedProduct) => {
        setProducts(
          products.map((p) => (p.id === updatedProduct.id ? updatedProduct : p))
        );
        setEditProduct(null); // close dialog
      });
  };

  return (
    <>
      {/* Title above the table */}
      <Typography variant="h4" gutterBottom>
        Product List
      </Typography>

      {/* Material UI Table with Paper background */}
      <form onSubmit={handleAddProduct} style={{ marginBottom: "2rem" }}>
        <Typography variant="h6" gutterBottom>
          Add New Product
        </Typography>
        <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={newProduct.title}
            onChange={handleInputChange}
            required
          />
          <input
            type="number"
            name="price"
            placeholder="Price"
            value={newProduct.price}
            onChange={handleInputChange}
            required
          />
          <input
            type="text"
            name="category"
            placeholder="Category"
            value={newProduct.category}
            onChange={handleInputChange}
            required
          />
          <input
            type="text"
            name="image"
            placeholder="Image URL"
            value={newProduct.image}
            onChange={handleInputChange}
          />
          <button type="submit">Add Product</button>
        </div>
      </form>

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
                  <IconButton
                    color="primary"
                    onClick={() => setEditProduct(product)}
                  >
                    <EditIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Dialog open={!!editProduct} onClose={() => setEditProduct(null)}>
        <DialogTitle>Edit Product</DialogTitle>
        <DialogContent
          sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}
        >
          <TextField
            label="Title"
            value={editProduct?.title || ""}
            onChange={(e) =>
              setEditProduct({ ...editProduct, title: e.target.value })
            }
          />
          <TextField
            label="Price"
            type="number"
            value={editProduct?.price || ""}
            onChange={(e) =>
              setEditProduct({ ...editProduct, price: e.target.value })
            }
          />
          <TextField
            label="Category"
            value={editProduct?.category || ""}
            onChange={(e) =>
              setEditProduct({ ...editProduct, category: e.target.value })
            }
          />
          <TextField
            label="Image URL"
            value={editProduct?.image || ""}
            onChange={(e) =>
              setEditProduct({ ...editProduct, image: e.target.value })
            }
          />
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setEditProduct(null)}>Cancel</Button>
          <Button
            onClick={() => handleEditSave()}
            variant="contained"
            color="primary"
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ProductsTable;
