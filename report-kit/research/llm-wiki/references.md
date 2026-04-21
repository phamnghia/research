---
title: LLM Wiki — references
created: 2026-04-20
updated: 2026-04-20
topic: llm-wiki
---

# References

## Nguồn chính — Karpathy LLM Wiki

### GitHub Repos
- [karpathy/LLM101n](https://github.com/karpathy/LLM101n) — "Let's build a Storyteller" course
- [karpathy/llm.c](https://github.com/karpathy/llm.c) — LLM training in C/CUDA
- [karpathy/nanoGPT](https://github.com/karpathy/nanoGPT) — Simplest, fastest GPT training
- [karpathy/minbpe](https://github.com/karpathy/minbpe) — Minimal BPE tokenizer
- [karpathy/micrograd](https://github.com/karpathy/micrograd) — Tiny autograd engine

### Blog Posts
- [The Unreasonable Effectiveness of RNNs](http://karpathy.github.io/2015/05/21/rnn-effectiveness/) — karpathy.github.io
- [A Recipe for Training Neural Networks](http://karpathy.github.io/2019/04/25/recipe/) — practical training tips
- [State of GPT (2023)](https://build.microsoft.com/en-US/sessions/db3f4859-cd30-4445-a0cd-553c3304f822) — Microsoft Build talk
- [Intro to LLMs (2023)](https://www.youtube.com/watch?v=zjkBMFhNj_g) — 1hr intro talk
- [Software 2.0](https://karpathy.medium.com/software-2-0-a64152b37c35) — vision of neural networks as new programming

### YouTube — Zero to Hero Series
- [Neural Networks: Zero to Hero playlist](https://www.youtube.com/playlist?list=PLAqhIrjkxbuWI23v9cThsA9GvCAUhRvKZ)
- [The spelled-out intro to neural networks (micrograd)](https://www.youtube.com/watch?v=VMj-3S1tku0)
- [Making more efficient use of GPT tokenizer (minbpe)](https://www.youtube.com/watch?v=zduSFxRajkE)
- [Let's build GPT from scratch](https://www.youtube.com/watch?v=kCc8FmEb1nY)
- [Let's build the GPT Tokenizer](https://www.youtube.com/watch?v=zduSFxRajkE)
- [Let's reproduce GPT-2 (124M)](https://www.youtube.com/watch?v=l8pRSuU81PU)
- [Deep dive into LLM inference](https://www.youtube.com/watch?v=YEfIoh9LM0Y) — inference talk

## Tokenization
- [minbpe README](https://github.com/karpathy/minbpe/blob/master/README.md)
- [Tiktokenizer](https://tiktokenizer.vercel.app/) — interactive tokenizer
- [OpenAI tiktoken](https://github.com/openai/tiktoken)

## Transformer Architecture
- [Attention Is All You Need (2017)](https://arxiv.org/abs/1706.03762)
- [FlashAttention paper](https://arxiv.org/abs/2205.14135)
- [FlashAttention-2](https://arxiv.org/abs/2307.08691)
- [GQA: Training Generalized Multi-Query Transformer](https://arxiv.org/abs/2305.13245)
- [RoPE: Rotary Position Embedding](https://arxiv.org/abs/2104.09864)

## Training & Optimization
- [Scaling Laws for Neural Language Models](https://arxiv.org/abs/2001.08361)
- [Chinchilla scaling laws](https://arxiv.org/abs/2203.15556)
- [Adam optimizer paper](https://arxiv.org/abs/1412.6980)
- [GPT-3 paper](https://arxiv.org/abs/2005.14165)
- [GPT-2 paper (Language Models are Unsupervised Multitask Learners)](https://cdn.openai.com/better-language-models/language_models_are_unsupervised_multitask_learners.pdf)

## Fine-tuning & Alignment
- [InstructGPT / RLHF paper](https://arxiv.org/abs/2203.02155)
- [DPO: Direct Preference Optimization](https://arxiv.org/abs/2305.18290)
- [Constitutional AI](https://arxiv.org/abs/2212.08073)
- [GRPO paper](https://arxiv.org/abs/2402.03300)
- [LoRA: Low-Rank Adaptation](https://arxiv.org/abs/2106.09685)

## Inference & Deployment
- [Speculative Decoding paper](https://arxiv.org/abs/2211.17192)
- [GPTQ quantization](https://arxiv.org/abs/2210.17323)
- [LLM.int8() quantization](https://arxiv.org/abs/2208.07339)
- [Continuous Batching (vLLM)](https://www.usenix.org/conference/osdi23/presentation/kwon)
- [PagedAttention / vLLM paper](https://arxiv.org/abs/2309.06180)
