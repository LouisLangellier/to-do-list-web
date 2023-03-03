module.exports = mongoose => {
    const Category = mongoose.model(
        "category",
        mongoose.Schema(
            {
                uid: String,
                title: String,
            }
        )
    );
    return Category
}