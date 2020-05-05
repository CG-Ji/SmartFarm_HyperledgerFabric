/*
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

const { Contract } = require('fabric-contract-api');

class Farm extends Contract {

    async initLedger(ctx) {
        console.info('============= START : Initialize Ledger ===========');
		
        console.info('============= END : Initialize Ledger ===========');
    }


    async queryAllFarm(ctx) {
        const startKey = 'FARM0';
        const endKey = 'FARM999';
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
	
    async queryFarm(ctx, farmNumber) {
        const farmAsBytes = await ctx.stub.getState(farmNumber); // get the farm from chaincode state
        if (!farmAsBytes || farmAsBytes.length === 0) {
            throw new Error(`${farmNumber} does not exist`);
        }
        console.log(farmAsBytes.toString());
        return farmAsBytes.toString();
    }
	
	 

    async createFarm(ctx, farmNumber, LandId,Lat,Long,Province,Amphur,Owner,Size) {
        console.info('============= START : Create Farm ===========');
		const farm = 
            {
				LandId : LandId,
                GPS: {
					Lat:Lat,
					Long: Long
				},
                Province: Province,
                Amphur: Amphur,
                Owner: Owner,
                Size: Size,
            }
        await ctx.stub.putState(farmNumber, Buffer.from(JSON.stringify(farm)));
        console.info('============= END : Create Farm ===========');
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

module.exports = Farm;
