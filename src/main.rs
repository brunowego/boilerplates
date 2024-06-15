use axum::{extract::Path, routing::post, Json, Router};
use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize)]
struct MyMessage {
    inner: String,
}

async fn hello_world(Path(_id): Path<String>, Json(json): Json<MyMessage>) -> Json<MyMessage> {
    Json(json)
}

#[shuttle_runtime::main]
async fn main() -> shuttle_axum::ShuttleAxum {
    let router = Router::new().route("/:id", post(hello_world));

    Ok(router.into())
}
