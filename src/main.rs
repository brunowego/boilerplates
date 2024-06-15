use axum::{extract::State, http::StatusCode, response::IntoResponse, routing::get, Json, Router};
use serde::{Deserialize, Serialize};
use sqlx::PgPool;

#[derive(Serialize, Deserialize, sqlx::FromRow)]
struct MyMessage {
    message: String,
}

#[derive(Clone)]
struct AppState {
    db: PgPool,
}

async fn get_message(State(state): State<AppState>) -> impl IntoResponse {
    let res: Vec<MyMessage> = sqlx::query_as("SELECT * FROM messages")
        .fetch_all(&state.db)
        .await
        .unwrap();

    Json(res)
}

async fn create_message(
    State(state): State<AppState>,
    Json(json): Json<MyMessage>,
) -> impl IntoResponse {
    sqlx::query("INSERT INTO messages (message) VALUES ($1)")
        .bind(json.message)
        .execute(&state.db)
        .await
        .unwrap();

    (StatusCode::OK, "Ok!".to_string())
}

#[shuttle_runtime::main]
async fn main(#[shuttle_shared_db::Postgres] db: PgPool) -> shuttle_axum::ShuttleAxum {
    sqlx::migrate!().run(&db).await.unwrap();

    let state = AppState { db };
    let router = Router::new()
        .route("/messages", get(get_message).post(create_message))
        .with_state(state);

    Ok(router.into())
}
