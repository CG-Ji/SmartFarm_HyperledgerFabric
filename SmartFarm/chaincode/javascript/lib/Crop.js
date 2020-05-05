/*
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

const { Contract } = require('fabric-contract-api');

class Crop extends Contract {

    async initLedger(ctx) {
        console.info('============= START : Initialize Ledger ===========');
		
        console.info('============= END : Initialize Ledger ===========');
    }


    async queryAllCrop(ctx) {
        const startKey = 'CROP0';
        const endKey = 'CROP999';
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
	
    async queryCrop(ctx, cropNumber) {
        const cropAsBytes = await ctx.stub.getState(cropNumber); // get the crop from chaincode state
        if (!cropAsBytes || cropAsBytes.length === 0) {
            throw new Error(`${cropNumber} does not exist`);
        }
        console.log(cropAsBytes.toString());
        return cropAsBytes.toString();
    }
	
	 

    async createCrop(ctx, cropNumber, typeofplant,Yieldunit,Yield,Harvestdate,Dateofplant,size) {
        console.info('============= START : Create Crop ===========');
		const crop = 
            {
				typeofplant : typeofplant,
                Yieldunit: Yieldunit,
                Yield: Yield,
                Harvestdate: Harvestdate,
                Dateofplant: Dateofplant,
                size: size,
            }
        await ctx.stub.putState(cropNumber, Buffer.from(JSON.stringify(crop)));
        console.info('============= END : Create Crop ===========');
    }

    async changeCrop(ctx, cropNumber, nameObject , newValue) {
        console.info('============= START : changeCropOwner ===========');

        const cropAsBytes = await ctx.stub.getState(cropNumber); // get the crop from chaincode state
        if (!cropAsBytes || cropAsBytes.length === 0) {
            throw new Error(`${cropNumber} does not exist`);
        }
        const crop = JSON.parse(cropAsBytes.toString());
        crop[nameObject] = newValue;

        await ctx.stub.putState(cropNumber, Buffer.from(JSON.stringify(crop)));
        console.info('============= END : changeCropOwner ===========');
    }

}

module.exports = Crop;
