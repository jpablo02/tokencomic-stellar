use crate::{SorobanNFT, SorobanNFTClient};
use soroban_sdk::{Env, String, Address};
use soroban_sdk::testutils::{Address as _};

#[test]
fn test_name() {
    let env = Env::default();
    let contract_id = env.register_contract(None, SorobanNFT);
    let client = SorobanNFTClient::new(&env, &contract_id);
    assert_eq!(client.name(), String::from_str(&env, "SorobanNFT"));
}

#[test]
fn test_symbol() {
    let env = Env::default();
    let contract_id = env.register_contract(None, SorobanNFT);
    let client = SorobanNFTClient::new(&env, &contract_id);
    assert_eq!(client.symbol(), String::from_str(&env, "SBN"));
}

#[test]
fn test_token_uri() {
    let env = Env::default();
    let contract_id = env.register_contract(None, SorobanNFT);
    let client = SorobanNFTClient::new(&env, &contract_id);
    assert_eq!(
        client.token_uri(),
        String::from_str(
            &env,
            "https://ipfs.io/ipfs/QmegWR31kiQcD9S2katTXKxracbAgLs2QLBRGruFW3NhXC"
        )
    );
}

#[test]
fn test_token_image() {
    let env = Env::default();
    let contract_id = env.register_contract(None, SorobanNFT);
    let client = SorobanNFTClient::new(&env, &contract_id);
    assert_eq!(
        client.token_image(),
        String::from_str(
            &env,
            "https://ipfs.io/ipfs/QmeRHSYkR4aGRLQXaLmZiccwHw7cvctrB211DzxzuRiqW6"
        )
    );
}

#[test]
fn test_mint() {
    let env = Env::default();
    let contract_id = env.register_contract(None, SorobanNFT);
    let client = SorobanNFTClient::new(&env, &contract_id);
    let to = Address::generate(&env);
    client.mint(&to);
    let token_id: i128 = 1; // Since it's the first token minted
    assert_eq!(client.owner_of(&token_id), to);
}

#[test]
fn test_owner_of() {
    let env = Env::default();
    let contract_id = env.register_contract(None, SorobanNFT);
    let client = SorobanNFTClient::new(&env, &contract_id);
    let owner = Address::generate(&env);
    client.mint(&owner);
    let token_id: i128 = 1;
    assert_eq!(client.owner_of(&token_id), owner);
}
