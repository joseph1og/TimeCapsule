import { describe, it, expect, beforeEach, vi } from 'vitest';
import { Client, Provider, ProviderRegistry, Result } from '@blockstack/clarity';

describe('blockchain time capsule contract test suite', () => {
  let client: Client;
  let provider: Provider;
  
  beforeEach(async () => {
    provider = await ProviderRegistry.createProvider();
    client = new Client('SP3GWX3NE58KXHESRYE4DYQ1S31PQJTCRXB3PE9SB.blockchain-time-capsule', 'blockchain-time-capsule', provider);
    await client.deployContract();
  });
  
  it('should submit a new capsule', async () => {
    const tx = client.createTransaction({
      method: { name: 'submit-capsule', args: ['utf8:Hello, Future!', 'u100000', 'false', 'none'] }
    });
    await tx.sign('SP2J6ZY48GV1EZ5V2V5RB9MP66SW86PYKKNRV9EJ7');
    const receipt = await client.submitTransaction(tx);
    expect(receipt.success).toBe(true);
    const result = Result.unwrapUInt(receipt.result);
    expect(result).toBe(1);
  });
  
  it('should not allow viewing an unopened capsule', async () => {
    const query = client.createQuery({
      method: { name: 'view-capsule', args: ['u1'] }
    });
    const receipt = await client.submitQuery(query);
    expect(receipt.success).toBe(false);
    expect(receipt.error).toContain('ERR_NOT_UNLOCKED');
  });
  
  it('should allow viewing an opened capsule', async () => {
    // First, submit a capsule
    const submitTx = client.createTransaction({
      method: { name: 'submit-capsule', args: ['utf8:Hello, Present!', 'u1', 'false', 'none'] }
    });
    await submitTx.sign('SP2J6ZY48GV1EZ5V2V5RB9MP66SW86PYKKNRV9EJ7');
    await client.submitTransaction(submitTx);
    
    // Then view it
    const query = client.createQuery({
      method: { name: 'view-capsule', args: ['u1'] }
    });
    const receipt = await client.submitQuery(query);
    expect(receipt.success).toBe(true);
    const result = Result.unwrapString(receipt.result);
    expect(result).toBe('Hello, Present!');
  });
  
  it('should allow updating a capsule by its owner', async () => {
    // First, submit a capsule
    const submitTx = client.createTransaction({
      method: { name: 'submit-capsule', args: ['utf8:Original Content', 'u100000', 'false', 'none'] }
    });
    await submitTx.sign('SP2J6ZY48GV1EZ5V2V5RB9MP66SW86PYKKNRV9EJ7');
    await client.submitTransaction(submitTx);
    
    // Then update it
    const updateTx = client.createTransaction({
      method: { name: 'update-capsule', args: ['u1', 'utf8:Updated Content'] }
    });
    await updateTx.sign('SP2J6ZY48GV1EZ5V2V5RB9MP66SW86PYKKNRV9EJ7');
    const receipt = await client.submitTransaction(updateTx);
    expect(receipt.success).toBe(true);
    const result = Result.unwrapBool(receipt.result);
    expect(result).toBe(true);
  });
  
  it('should not allow updating a capsule by a non-owner', async () => {
    // First, submit a capsule
    const submitTx = client.createTransaction({
      method: { name: 'submit-capsule', args: ['utf8:Original Content', 'u100000', 'false', 'none'] }
    });
    await submitTx.sign('SP2J6ZY48GV1EZ5V2V5RB9MP66SW86PYKKNRV9EJ7');
    await client.submitTransaction(submitTx);
    
    // Then try to update it with a different account
    const updateTx = client.createTransaction({
      method: { name: 'update-capsule', args: ['u1', 'utf8:Hacked Content'] }
    });
    await updateTx.sign('SP2J6ZY48GV1EZ5V2V5RB9MP66SW86PYKKNRV9EJ8'); // Different account
    const receipt = await client.submitTransaction(updateTx);
    expect(receipt.success).toBe(false);
    expect(receipt.error).toContain('ERR_NOT_AUTHORIZED');
  });
  
  afterEach(async () => {
    await provider.close();
  });
});
