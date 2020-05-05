/*
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

const { Contract } = require('fabric-contract-api');

class Farmer extends Contract {

    async initLedger(ctx) {
        console.info('============= START : Initialize Ledger ===========');
		
        console.info('============= END : Initialize Ledger ===========');
    }


    async queryAllFarmer(ctx) {
        const startKey = 'FARMER0';
        const endKey = 'FARMER999';
        const allResults = [];
        for await (const {key, value} of ctx.stub.getStateByRange(startKey, endKey)) {
            const strValue = Buffer.from(value).toString('utf8');
            let record;
            try {
                record = JSON.parse(strValue);
            } catch (err) {
                console.log(err);
                record = strValue;
            }
            allResults.push({ Key: key, Record: record });
        }
        console.info(allResults);
        return JSON.stringify(allResults);
    }
	
    async queryFarmer(ctx, farmerNumber) {
        const farmerAsBytes = await ctx.stub.getState(farmerNumber); // get the farmer from chaincode state
        if (!farmerAsBytes || farmerAsBytes.length === 0) {
            throw new Error(`${farmerNumber} does not exist`);
        }
        console.log(farmerAsBytes.toString());
        return farmerAsBytes.toString();
    }
	
	 

    async createFarmer(ctx, farmerNumber, name) {
        console.info('============= START : Create Farmer ===========');
        const farmer = {
            name:name,
            tokens : "Unknown",
        };
		await ctx.stub.putState(farmerNumber, Buffer.from(JSON.stringify(farmer)));
        console.info('============= END : Create Farmer ===========');
    }

	async changeFarm(ctx, farmNumber, nameObject , newValue) {
        console.info('============= START : changeFarmOwner ===========');
        const farmAsBytes = await ctx.stub.getState(farmNumber); // get the farm from chaincode state
        if (!farmAsBytes || farmAsBytes.length === 0) {
            throw new Error(`${farmNumber} does not exist`);
        }
        const farm = JSON.parse(farmAsBytes.toString());
        farm[nameObject] = newValue;

        await ctx.stub.putState(farmNumber, Buffer.from(JSON.stringify(farm)));
        console.info('============= END : changeFarmOwner ===========');
    }

}

module.exports = Farmer;
