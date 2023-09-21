import React, { Component } from "react";

const products = [
  { id: "PEP110", name: "Pepsi", category: "Food", stock: "yes" },
  { id: "CLO876", name: "CloseUp", category: "Toothpaste", stock: "no" },
  { id: "PEA531", name: "Pears", category: "Soap", stock: "arriving" },
  { id: "LU7264", name: "Lux", category: "Soap", stock: "yes" },
  { id: "COL112", name: "Colgate", category: "Toothpaste", stock: "no" },
  { id: "DM881", name: "Dairy Milk", category: "Food", stock: "arriving" },
  { id: "LI130", name: "Liril", category: "Soap", stock: "yes" },
  { id: "PPS613", name: "Pepsodent", category: "Toothpaste", stock: "no" },
  { id: "MAG441", name: "Maggi", category: "Food", stock: "arriving" },
  { id: "PNT560", name: "Pantene", category: "Shampoo", stock: "no" },
  { id: "KK219", name: "KitKat", category: "Food", stock: "arriving" },
  { id: "DOV044", name: "Dove", category: "Soap", stock: "yes" },
];

class ProductList extends Component {
  state = {
    selectedCategories: [],
    selectedStockStatus: "",
  };

  handleCheckbox = (category) => {
    const { selectedCategories } = this.state;
    const updatedCategories = selectedCategories.includes(category)
      ? selectedCategories.filter((cat) => cat !== category)
      : [...selectedCategories, category];

    this.setState({
      selectedCategories: updatedCategories,
    });
  };

  handleStockStatusChange = (status) => {
    this.setState({
      selectedStockStatus: status,
    });
  };



render() {
    const { selectedCategories, selectedStockStatus } = this.state;

    const categories = [
      ...new Set(products.map((product) => product.category)),
    ];
    const stockStatusOptions = ["yes", "no", "arriving"];

    let filteredProducts = products.filter((product) => {
      const categoryFilter =
        selectedCategories.length === 0 ||
        selectedCategories.includes(product.category);

      const stockFilter =
        selectedStockStatus === "" || product.stock === selectedStockStatus;

      return categoryFilter && stockFilter;
    });

    const selectedDetails = filteredProducts.map((product) => (
      <div className="row bg-light" key={product.id}>
        <div className="col">{product.name}</div>
        <div className="col">{product.category}</div>
        <div className="col">{product.id}</div>
        <div className="col">{product.stock}</div>
      </div>
    ));

    const isTableVisible = selectedCategories.length > 0;
    let stockStatusText = "All";
    if (selectedStockStatus !== "") {
      stockStatusText = selectedStockStatus;
    }

    let selectedCategoryNames = selectedCategories.length > 0
    ? selectedCategories.join(', ')
    : "";
    return (
      <div className="container">
        <div className="row border">
          <div className="col-3 border bg-light">
            <h3>Category</h3>
            {categories.map((category) => (
              <div key={category}>
                <input
                  type="checkbox"
                  checked={selectedCategories.includes(category)}
                  onChange={() => this.handleCheckbox(category)}
                />
                {category}
              </div>
            ))}

            <h3>Stock Status</h3>
            {stockStatusOptions.map((status) => (
              <div key={status}>
                <input
                  type="radio"
                  checked={selectedStockStatus === status}
                  onChange={() => this.handleStockStatusChange(status)}
                />
                {status}
              </div>
            ))}
          </div>

          <div className="col-9">
            <h3>Category : {selectedCategoryNames}</h3>
            <h5>Stock Status : {stockStatusText}</h5>
            {isTableVisible && (
              <div>
                <div className="container">{selectedDetails}</div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default ProductList;
