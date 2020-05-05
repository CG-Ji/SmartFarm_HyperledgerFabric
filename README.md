# SmartFarm (Hyperledgegr Fabric)

Blockchain system to buy, sell produce from farmers to consumers,Record agricultural activities on the website to record on the Hyperledger Fabric blockchain
### Requirement
Before we begin, you may wish to check that you have the  [prerequisites](https://hyperledger-fabric.readthedocs.io/en/release-2.0/prereqs.html#) installed on the platform(s) 
  - latest version of [git](https://git-scm.com/downloads)
  - latest version of the [cURL](https://curl.haxx.se/download.html)
  - [Go](https://golang.org/dl/) version 1.14.x is required.
  - the Hyperledger Fabric SDK for Node.js, version 8 is supported from 8.9.4 and higher. Node.js version 10 is supported from 10.15.3 and higher.
```
npm install npm@5.6.0 -g
```
- The Fabric Node.js SDK requires an iteration of Python 2.7
```
sudo apt-get install python
```
-  Fabric v2.1.0 and Fabric CA v1.4.6
```
curl -sSL https://bit.ly/2ysbOFE | bash -s -- 2.1.0 1.4.6 0.4.18
```
### Installtion
- Download/Clone the repository
- Put all files into your fabric-sample directory respectively.
- Run command hyperledger fabric to create cheanl and install chaincode 
```sh
cd SmartFarm
./startFabric.sh
```
- Run Cilent Api for service hyperledger fabric

```
cd SmartFarm/javascript
npm install
node ServerApi.js
```