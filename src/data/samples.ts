const samples: {
  id: string; // "aliquot ID"
  sv: string; // URL of bedpe
  cnv: string; // URL of txt
  bam: string; // URL of bam
  bai: string; // URL of bai
}[] = [
  {
    id: "84ca6ab0-9edc-4636-9d27-55cdba334d7d",
    sv: "https://s3.amazonaws.com/gosling-lang.org/data/SV/84ca6ab0-9edc-4636-9d27-55cdba334d7d.pcawg_consensus_1.6.161022.somatic.sv.bedpe",
    cnv: "https://s3.amazonaws.com/gosling-lang.org/data/SV/84ca6ab0-9edc-4636-9d27-55cdba334d7d.consensus.20170119.somatic.cna.annotated.txt",
    bam: "https://s3.amazonaws.com/gosling-lang.org/data/PCAWG.00e7f3bd-5c87-40c2-aeb6-4e4ca4a8e720.bam",
    bai: "https://s3.amazonaws.com/gosling-lang.org/data/PCAWG.00e7f3bd-5c87-40c2-aeb6-4e4ca4a8e720.bam.bai",
  },
  {
    id: "7a921087-8e62-4a93-a757-fd8cdbe1eb8f",
    sv: "https://s3.amazonaws.com/gosling-lang.org/data/SV/7a921087-8e62-4a93-a757-fd8cdbe1eb8f.pcawg_consensus_1.6.161022.somatic.sv.bedpe",
    cnv: "https://s3.amazonaws.com/gosling-lang.org/data/SV/7a921087-8e62-4a93-a757-fd8cdbe1eb8f.consensus.20170119.somatic.cna.annotated.txt",
    bam: "https://s3.amazonaws.com/gosling-lang.org/data/PCAWG.00e7f3bd-5c87-40c2-aeb6-4e4ca4a8e720.bam",
    bai: "https://s3.amazonaws.com/gosling-lang.org/data/PCAWG.00e7f3bd-5c87-40c2-aeb6-4e4ca4a8e720.bam.bai",
  },
  {
    id: "7d332cb1-ba25-47e4-8bf8-d25e14f40d59",
    sv: "https://s3.amazonaws.com/gosling-lang.org/data/SV/7d332cb1-ba25-47e4-8bf8-d25e14f40d59.pcawg_consensus_1.6.161022.somatic.sv.bedpe",
    cnv: "https://s3.amazonaws.com/gosling-lang.org/data/SV/7d332cb1-ba25-47e4-8bf8-d25e14f40d59.consensus.20170119.somatic.cna.annotated.txt",
    bam: "https://s3.amazonaws.com/gosling-lang.org/data/SV/PCAWG.27a255b4-0479-4aff-95ae-9d23c6975739.bam",
    bai: "https://s3.amazonaws.com/gosling-lang.org/data/SV/PCAWG.27a255b4-0479-4aff-95ae-9d23c6975739.bam.bai",
  },
  {
    id: "9ae0744a-9bc1-4cd7-b7cf-c6569ed9e4aa",
    sv: "https://s3.amazonaws.com/gosling-lang.org/data/SV/9ae0744a-9bc1-4cd7-b7cf-c6569ed9e4aa.pcawg_consensus_1.6.161022.somatic.sv.bedpe",
    cnv: "https://s3.amazonaws.com/gosling-lang.org/data/SV/9ae0744a-9bc1-4cd7-b7cf-c6569ed9e4aa.consensus.20170119.somatic.cna.annotated.txt",
    bam: "https://s3.amazonaws.com/gosling-lang.org/data/PCAWG.00e7f3bd-5c87-40c2-aeb6-4e4ca4a8e720.bam",
    bai: "https://s3.amazonaws.com/gosling-lang.org/data/PCAWG.00e7f3bd-5c87-40c2-aeb6-4e4ca4a8e720.bam.bai",
  },
  {
    id: "b27d75ba-5989-4200-bfe9-f1b7d7cf8008",
    sv: "https://s3.amazonaws.com/gosling-lang.org/data/SV/b27d75ba-5989-4200-bfe9-f1b7d7cf8008.pcawg_consensus_1.6.161022.somatic.sv.bedpe",
    cnv: "https://s3.amazonaws.com/gosling-lang.org/data/SV/b27d75ba-5989-4200-bfe9-f1b7d7cf8008.consensus.20170119.somatic.cna.annotated.txt",
    bam: "https://s3.amazonaws.com/gosling-lang.org/data/PCAWG.00e7f3bd-5c87-40c2-aeb6-4e4ca4a8e720.bam",
    bai: "https://s3.amazonaws.com/gosling-lang.org/data/PCAWG.00e7f3bd-5c87-40c2-aeb6-4e4ca4a8e720.bam.bai",
  },
  {
    id: "fc8edf46-2005-1af4-e040-11ac0d481414",
    sv: "https://s3.amazonaws.com/gosling-lang.org/data/SV/fc8edf46-2005-1af4-e040-11ac0d481414.pcawg_consensus_1.6.161022.somatic.sv.bedpe",
    cnv: "https://s3.amazonaws.com/gosling-lang.org/data/SV/fc8edf46-2005-1af4-e040-11ac0d481414.consensus.20170119.somatic.cna.annotated.txt",
    bam: "https://s3.amazonaws.com/gosling-lang.org/data/PCAWG.00e7f3bd-5c87-40c2-aeb6-4e4ca4a8e720.bam",
    bai: "https://s3.amazonaws.com/gosling-lang.org/data/PCAWG.00e7f3bd-5c87-40c2-aeb6-4e4ca4a8e720.bam.bai",
  },
];

export default samples;
