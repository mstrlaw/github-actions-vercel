# github-actions-vercel
> A simple PoC demonstrating Trunk Based CI/CD workflow, using GitHub actions and Vercel.

### Status

[![🧪 Tests](https://github.com/surfe/github-actions-vercel/actions/workflows/open_pr.yml/badge.svg)](https://github.com/surfe/github-actions-vercel/actions/workflows/open_pr.yml)
[![🔵 Deploy to Staging](https://github.com/surfe/github-actions-vercel/actions/workflows/merge_pr.yml/badge.svg)](https://github.com/surfe/github-actions-vercel/actions/workflows/merge_pr.yml)
[![🏄 Production](https://github.com/surfe/github-actions-vercel/actions/workflows/create_tag.yml/badge.svg?branch=main)](https://github.com/surfe/github-actions-vercel/actions/workflows/create_tag.yml)

### Environments

[![Production - trunkbased-cicd-workflow.vercel.app](https://img.shields.io/badge/Production-trunkbased--cicd--workflow.vercel.app-2ea44f)](https://trunkbased-cicd-workflow.vercel.app/)

[![Staging - trunkbased-cicd-workflow-staging.vercel.app](https://img.shields.io/static/v1?label=Staging&message=trunkbased-cicd-workflow-staging.vercel.app&color=orange)](https://trunkbased-cicd-workflow-staging.vercel.app/)

## Overview

### Trunk Based Workflow for Fast CI/CD

Refreshed on Trunk Based workflow ([read more here](https://trunkbaseddevelopment.com/)).

![Trunk based workflow](static/trunk.png)


### Workflow Concepts

1. A Workflow is what GitHub calls Action(s)
2. Actions can have one or more Jobs, with one or more Steps
3. Workflows are created under `.github/workflows` (GitHub treats any yml file under `workflows` as an Action to be executed)
4. File name follows a pattern to loosely indicate the trigger method `on_<trigger-method>.yml`

### How it works

1. Dev _commits code_ to any branch (no open PR yet) -> Execute Linting job and deploys a preview URL to Vercel
2. PR is _opened_ into `main` branch -> Execute Test jobs
3. PR is _merged_ into `main` branch -> Project deployed to Staging env
4. Tag is _created_ from `main` branch -> Project deployed to Production env

```mermaid
sequenceDiagram
    actor D as Dev
    participant B as Branch
    participant M as Main
    participant V as Vercel

    box GitHub
        participant B
        participant M
    end

    loop Push Code
        D->>B: Commit XYZ
        Note over B: 1.Lint<br>2.Built<br>3.Trigger Vercel Deploy
        B->>V: Deploy <Preview>
        Note over V: github-actions-vercel-8ga3p0aks-surfe.vercel.app
    end

    alt Open PR
        B->>M: New PR
        Note over M: 1.Build<br>2.1.Run Tests (Unit)<br>2.2.Run Tests (E2E)
    end
    
    alt Merge PR
        B->>M: Merge PR
        Note over M: 1.Build<br>2.Trigger Vercel Deploy
        M->>V: Deploy <Staging>
        Note over V: trunkbased-cicd-workflow-staging.vercel.app
    end

    loop Create Tag

        Note over M: 1.Build<br>2.Trigger Vercel Deploy
        M->>V: Deploy <Prod>
        Note over V: trunkbased-cicd-workflow.vercel.app
    end
```