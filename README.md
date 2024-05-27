# github-actions-vercel
> A simple PoC demonstrating Trunk Based CI/CD workflow, using GitHub actions and Vercel.

## Status

[![🧪 Tests](https://github.com/surfe/github-actions-vercel/actions/workflows/open_pr.yml/badge.svg)](https://github.com/surfe/github-actions-vercel/actions/workflows/open_pr.yml)
[![🔵 Deploy to Staging](https://github.com/surfe/github-actions-vercel/actions/workflows/merge_pr.yml/badge.svg)](https://github.com/surfe/github-actions-vercel/actions/workflows/merge_pr.yml)
[![🏄 Production](https://github.com/surfe/github-actions-vercel/actions/workflows/create_tag.yml/badge.svg?branch=main)](https://github.com/surfe/github-actions-vercel/actions/workflows/create_tag.yml)

## Environments

[![Production - trunkbased-cicd-workflow.vercel.app](https://img.shields.io/badge/Production-trunkbased--cicd--workflow.vercel.app-2ea44f)](https://trunkbased-cicd-workflow.vercel.app/)

[![Staging - trunkbased-cicd-workflow-staging.vercel.app](https://img.shields.io/static/v1?label=Staging&message=trunkbased-cicd-workflow-staging.vercel.app&color=orange)](https://trunkbased-cicd-workflow-staging.vercel.app/)


## Workflow
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

    loop Deploy to Preview
        D->>B: Commit XYZ
        Note over B: Run job on *Push*:<br>1.Lint<br>2.Built<br>3.Trigger Vercel Deploy
        B->>V: Deploy <Preview>
        Note over V: lighthouse-foobar123barfoo321-surfe.vercel.app
    end

    alt Deploy to Staging
        B->>M: Open new PR
        Note over M: Run job on *Opened PR*:<br>1.Build<br>2.1.Run Tests (Unit)<br>2.2.Run Tests (E2E)
        M->>B: Accept PR
        B->>M: Merge new PR
        Note over M: Run job on *Merged PR*:<br>1.Build<br>2.Trigger Vercel Deploy
        M->>V: Deploy <Staging>
        Note over V: staging.app.surfe.com
    end

    loop Deploy to Prod

        Note over M: Run job tag creation *Push*:<br>1.Build<br>2.Trigger Vercel Deploy (manual step)
        M->>V: Deploy <Prod>
        Note over V: app.surfe.com
    end
```