#![no_std]

/*
  ___              _               _  _ ___ _____ 
 / __| ___ _ _ ___| |__  __ _ _ _ | \| | __|_   _|
 \__ \/ _ \ '_/ _ \ '_ \/ _` | ' \| .` | _|  | |  
 |___/\___/_| \___/_.__/\__,_|_||_|_|\_|_|   |_|    
     - Released under 3N consideration -
            - Not Tested
            - Not Audited
            - Not Safe For Production
*/

use soroban_sdk::{ contract, contractimpl, contracttype, symbol_short, vec, Address, Bytes, Env, Vec };

#[contract]
pub struct SorobanNFT;

#[contracttype]

pub enum DataKey {
    Name,
    Symbol,
    Owner(i128),
    Balance(Address),
    Approvals(i128),
    TokenURI,
    TokenCount,
    Minted(Address),
    OperatorApproval(Address, Address),
}

#[contractimpl]
impl SorobanNFT {
    const MAX_SUPPLY: i128 = 1000;

    pub fn initialize(env: Env, name: Bytes, symbol: Bytes, uri: Bytes) {
        env.storage().persistent().set(&DataKey::Name, &name);
        env.storage().persistent().set(&DataKey::Symbol, &symbol);
        env.storage().persistent().set(&DataKey::TokenURI, &uri);
        env.storage().persistent().set(&DataKey::TokenCount, &0i128);
    }

    pub fn balance_of(env: Env, owner: Address) -> u32 {
        env.storage().persistent().get(&DataKey::Balance(owner)).unwrap_or(0)
    }

    pub fn owner_of(env: Env, token_id: i128) -> Address {
        env.storage().persistent().get(&DataKey::Owner(token_id)).expect("Token does not exist")
    }

    pub fn name(env: Env) -> Bytes {
        env.storage().persistent().get(&DataKey::Name).unwrap_or_else(|| Bytes::from_slice(&env, b""))
    }

    pub fn symbol(env: Env) -> Bytes {
        env.storage().persistent().get(&DataKey::Symbol).unwrap_or_else(|| Bytes::from_slice(&env, b""))
    }

    pub fn token_uri(env: Env, _token_id: i128) -> Bytes {
        env.storage().persistent().get(&DataKey::TokenURI).unwrap_or_else(|| Bytes::from_slice(&env, b""))
    }

    pub fn get_approved(env: Env, token_id: i128) -> Vec<Address> {
        env.storage().persistent().get(&DataKey::Approvals(token_id)).unwrap_or_else(|| vec![&env])
    }

    pub fn is_approved_for_all(env: Env, owner: Address, operator: Address) -> bool {
        env.storage().persistent().get::<_, bool>(&DataKey::OperatorApproval(owner, operator)).unwrap_or(false)
    }

    pub fn approve(env: Env, owner: Address, to: Address, token_id: i128) {
        owner.require_auth();
        let actual_owner = Self::owner_of(env.clone(), token_id);
        assert_eq!(owner, actual_owner, "Not the token owner");
        let mut approvals: Vec<Address> = env.storage().persistent().get(&DataKey::Approvals(token_id)).unwrap_or_else(|| vec![&env]);
        if !approvals.contains(&to) {
            approvals.push_back(to.clone());
            env.storage().persistent().set(&DataKey::Approvals(token_id), &approvals);
        }
        env.events().publish((symbol_short!("Approval"),), (owner, to, token_id));
    }

    pub fn set_approval_for_all(env: Env, owner: Address, operator: Address, approved: bool) {
        owner.require_auth();
        env.storage().persistent().set(
                &DataKey::OperatorApproval(owner.clone(), operator.clone()),
                &approved,
            );
        env.events().publish((symbol_short!("ApproAll"),), (owner, operator, approved));
    }

    pub fn transfer(env: Env, owner: Address, to: Address, token_id: i128) {
        owner.require_auth();
        let actual_owner = Self::owner_of(env.clone(), token_id);
        assert_eq!(owner, actual_owner, "Not the token owner");
        Self::transfer_from(env, owner.clone(), owner, to, token_id);
    }

    pub fn transfer_from(
        env: Env,
        spender: Address,
        from: Address,
        to: Address,
        token_id: i128,
    ) {
        spender.require_auth();
        let owner = Self::owner_of(env.clone(), token_id);
        let approvals: Vec<Address> = env
            .storage()
            .persistent()
            .get(&DataKey::Approvals(token_id))
            .unwrap_or_else(|| vec![&env]);
        assert!(
            spender == owner
                || approvals.contains(&spender)
                || Self::is_approved_for_all(env.clone(), owner.clone(), spender.clone()),
            "Not authorized"
        );
        assert_eq!(from, owner, "From address is not the owner");
        env.storage().persistent().remove(&DataKey::Approvals(token_id));
        let from_balance = Self::balance_of(env.clone(), from.clone());
        let to_balance = Self::balance_of(env.clone(), to.clone());
        env.storage().persistent().set(&DataKey::Balance(from.clone()), &(from_balance - 1));
        env.storage().persistent().set(&DataKey::Balance(to.clone()), &(to_balance + 1));
        env.storage().persistent().set(&DataKey::Owner(token_id), &to);
        env.events().publish((symbol_short!("Transfer"),), (from, to, token_id));
    }

    pub fn mint(env: Env, to: Address) {
        let mut token_count: i128 = env.storage().persistent().get(&DataKey::TokenCount).unwrap_or(0);
        assert!(
            token_count < Self::MAX_SUPPLY,
            "Maximum token supply reached"
        );
        let already_minted: bool = env.storage().persistent().get(&DataKey::Minted(to.clone())).unwrap_or(false);
        assert!(!already_minted, "Address has already minted a token");
        env.storage().persistent().set(&DataKey::Minted(to.clone()), &true);
        token_count += 1;
        env.storage().persistent().set(&DataKey::TokenCount, &token_count);
        let to_balance = Self::balance_of(env.clone(), to.clone());
        env.storage().persistent().set(&DataKey::Balance(to.clone()), &(to_balance + 1));
        env.storage().persistent().set(&DataKey::Owner(token_count), &to);
        env.events().publish((symbol_short!("Mint"),), (to, token_count));
    }
}
