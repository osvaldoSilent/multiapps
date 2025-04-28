import { createConfig, http } from 'wagmi'
import { sepolia, mainnet, polygonMumbai } from 'wagmi/chains'
import { injected } from 'wagmi/connectors'

export const config = createConfig({
chains: [mainnet, sepolia, polygonMumbai],
connectors: [
injected(), // Esto conecta Metamask, Brave, etc.
],
transports: {
[mainnet.id]: http(),
[sepolia.id]: http(),
[polygonMumbai.id]: http(),
},
ssr: true, // habilitado si usas Server Side Rendering en Next.js
})
