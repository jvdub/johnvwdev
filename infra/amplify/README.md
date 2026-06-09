# Amplify redirect configuration

Redirects are declared in post and project frontmatter using `redirectFrom`.
Running `npm run generate:redirects` generates:

- `infra/amplify/custom-rules.json`, the desired Amplify app redirect state.
- `public/redirects-map.json`, the redirect map published with the site.

The `Apply Amplify redirects` GitHub Actions workflow verifies that generated
files are committed, then applies the rules to the existing Amplify app.

Configure these GitHub repository settings:

- Variable `AWS_REGION`: the Amplify app's AWS region.
- Variable `AMPLIFY_APP_ID`: the Amplify app ID.
- Secret `AWS_AMPLIFY_REDIRECTS_ROLE_ARN`: an IAM role trusted by GitHub OIDC.

Deploy `redirects-role.yml` to create the narrowly scoped workflow role:

```bash
aws cloudformation deploy \
  --stack-name johnvwdev-amplify-redirects \
  --template-file infra/amplify/redirects-role.yml \
  --capabilities CAPABILITY_IAM \
  --parameter-overrides \
    AmplifyAppId=APP_ID \
    GitHubOidcProviderArn=arn:aws:iam::ACCOUNT_ID:oidc-provider/token.actions.githubusercontent.com
```

The template intentionally references an existing GitHub Actions OIDC provider
because each AWS account can have only one provider for that URL.
