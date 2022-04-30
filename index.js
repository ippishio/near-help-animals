const { utils } = nearApi;
const near = new nearApi.Near({
    keyStore: new nearApi.keyStores.BrowserLocalStorageKeyStore(),
    networkId: 'testnet',
    nodeUrl: 'https://rpc.testnet.near.org',
    walletUrl: 'https://wallet.testnet.near.org'
  });

  // connect to the NEAR Wallet
  const wallet = new nearApi.WalletConnection(near, 'my-app');

  // connect to a NEAR smart contract
  const contract = new nearApi.Contract(wallet.account(), 'homelessanimals.ippishio.testnet', {
    viewMethods: ['get_total'],
    changeMethods: ['new_payment']
  });
  const button = document.getElementById('pay');
 const logoutbut = document.getElementById('logout');
 const login = document.getElementById('login');
 const inputbox = document.getElementById('amount');
 const progress = document.getElementById('progress');
 const amount = await contract.get_total();
 console.log(amount);
 progress.value = utils.format.formatNearAmount(amount.toLocaleString('fullwide', {useGrouping:false}) );
 document.getElementById('total').textContent = utils.format.formatNearAmount(amount.toLocaleString('fullwide', {useGrouping:false}) ) +'/300 Ⓝ';
 if (!wallet.isSignedIn()) {
    button.style.visibility = "hidden";
    inputbox.style.visibility = "hidden";
    logoutbut.style.visibility = "hidden";
    login.style.visibility = "visible";
  } else {
    logoutbut.style.visibility = "visible";
    login.style.visibility = "hidden";
    button.style.visibility = "visible";
    inputbox.style.visibility = "visible";
  } 
  logoutbut.addEventListener('click', () => {
    wallet.signOut();
    location.href = 'https://'+window.location.hostname;
    window.location.reload();
    console.log("logged out");
   })
login.addEventListener('click', () => {
    wallet.requestSignIn({
        contractId: 'homelessanimals.ippishio.testnet',
        methodNames: ['get_total','new_payment']
      });
})
button.addEventListener('click', () => {
    if(wallet.isSignedIn()) {
        contract.new_payment({},"300000000000000",utils.format.parseNearAmount(inputbox.value));
        console.log("called contracgt with attached "+inputbox.value+" NEAR");
    }
});