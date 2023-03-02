module.exports = mongoose => {
    const Task = mongoose.model(
        "task",
        mongoose.Schema(
            {
                uid: String,
                title: String,
                description: String,
                category: String,
                status: String,
                date: Number,
                done: Boolean
            }
        )
    );
    return Task
}