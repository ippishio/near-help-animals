use near_sdk::borsh::{self, BorshDeserialize, BorshSerialize};
use near_sdk::{env, near_bindgen};

near_sdk::setup_alloc!();
#[near_bindgen]
#[derive(Default, BorshDeserialize, BorshSerialize)]
pub struct Counter {
    
    val: u128,
}
#[near_bindgen]
impl Counter {
    pub fn get_total(&self) -> u128{
        return self.val;
    }
    #[payable]
    pub fn new_payment(&mut self) -> u128 {
        self.val += env::attached_deposit();
        let log_message = format!("Sent {} yoctoNEAR", self.val);
        env::log(log_message.as_bytes());
        return env::attached_deposit();
    }
    pub fn reset_counter(&mut self) {
        if env::signer_account_id() == "ippishio.testnet" {
            self.val = 0;
            env::log("Set counter to 0".as_bytes());
        } else {
            env::log("Not an ippishio.testnet".as_bytes());
        }

    }
}
