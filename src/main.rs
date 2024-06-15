use axum::{extract::Path, routing::get, Router};

async fn hello_world(Path(id): Path<String>) -> String {
    format!("Hello, {id}!")
}

#[shuttle_runtime::main]
async fn main() -> shuttle_axum::ShuttleAxum {
    let router = Router::new().route("/:id", get(hello_world));

    Ok(router.into())
}
