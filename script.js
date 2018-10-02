/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';
/**
 * Write your transaction processor functions here
 */

/**
 * Sample transaction
 * @param {org.example.empty.processClaims} processClaims
 * @transaction
 */

async function processClaims(tx) {  // eslint-disable-line no-unused-vars

    // Save the old value of the asset.
    const oldAmount = tx.claim.amount;

    // Update the asset with the new value.
    tx.claim.amount = tx.newAmount;
    //tx.claim.approvalStatus = false;

    // Get the asset registry for the asset.
    const assetRegistry = await getAssetRegistry('org.example.empty.claimContract');
    // Update the asset in the asset registry.
    await assetRegistry.update(tx.claim);

    // Emit an event for the modified asset.
    let event = getFactory().newEvent('org.example.empty', 'SampleEvent');
    event.claim = tx.claim;
    event.oldAmount = oldAmount;
    event.newAmount = tx.newAmount;
    if (tx.claim.approvalStatus == true) {
      emit(event);
    } else {
      throw new Error('transaction unsuccessful'); 
    }
}
