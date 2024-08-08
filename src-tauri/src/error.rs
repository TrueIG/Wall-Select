use thiserror::Error;

#[derive(Error, Debug)]
pub enum FsError {
    #[error("Failed failed to bootstrap program, error details: {0}")]
    BootstrapFailed(String),
}
