// src/components/WalletGenerator.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { Lucid, Blockfrost, getAddressDetails } from 'lucid-cardano';

const WalletGenerator: React.FC = () => {
  const [seed, setSeed] = useState<string>('');
  const [address, setAddress] = useState<string>('');
  const [paymentCred, setPaymentCred] = useState<string>('');
  const [stakeCred, setStakeCred] = useState<string>('');

  useEffect(() => {
    (async () => {
      try {
        const lucid = await Lucid.new(
          new Blockfrost(
            "https://cardano-preprod.blockfrost.io/api/v0",
            "preprod6wXd6BCaQtjei74tHGPYmgLKd3DQdQSY"
          ),
          "Preprod"
        );

        const seedPhrase = lucid.utils.generateSeedPhrase();
        setSeed(seedPhrase);

        await lucid.selectWalletFromSeed(seedPhrase);
        const walletAddress = await lucid.wallet.address();
        setAddress(walletAddress);

        const { paymentCredential, stakeCredential } = getAddressDetails(walletAddress);
        setPaymentCred(paymentCredential?.hash || '');
        setStakeCred(stakeCredential?.hash || '');
      } catch (err) {
        console.error("Wallet generation error:", err);
      }
    })();
  }, []);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.label}>🔐 Seed Phrase:</Text>
      <Text selectable>{seed}</Text>

      <Text style={styles.label}>📬 Wallet Address:</Text>
      <Text selectable>{address}</Text>

      <Text style={styles.label}>🔑 Payment Credential:</Text>
      <Text selectable>{paymentCred}</Text>

      <Text style={styles.label}>🧾 Stake Credential:</Text>
      <Text selectable>{stakeCred}</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { padding: 16 },
  label: { marginTop: 16, fontWeight: 'bold', fontSize: 16 },
});

export default WalletGenerator;
