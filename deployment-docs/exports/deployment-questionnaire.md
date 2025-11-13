# Galileo Deployment Questionnaire

**Purpose:** This questionnaire gathers essential information needed to plan and execute a successful Galileo deployment in your environment.

**Instructions:** Please complete all sections that apply to your deployment. Mark sections as "N/A" if not applicable. Detailed answers help ensure proper configuration and sizing.

**Date:** ________________________

**Completed by:** ________________________

**Company:** ________________________

---

## 1. Organization Information

### 1.1 What is the primary use case for Galileo?

- [ ] Evaluating and monitoring LLM applications
- [ ] Prompt engineering and optimization
- [ ] Model evaluation and experimentation
- [ ] Production monitoring and observability
- [ ] Team collaboration on AI projects
- [ ] Other: ____________________

### 1.2 How many users will actively use Galileo?

- [ ] 1-10 users
- [ ] 10-50 users
- [ ] 50-200 users
- [ ] 200+ users

### 1.3 What teams or departments will use Galileo?

____________________________________________________________________________________

### 1.4 What is your expected go-live date?

____________________________________________________________________________________

---

## 2. Infrastructure & Environment

### 2.1 Which cloud provider will you use?

- [ ] Amazon Web Services (AWS)
- [ ] Google Cloud Platform (GCP)
- [ ] Microsoft Azure
- [ ] Exoscale
- [ ] On-premises Kubernetes
- [ ] Other: ____________________

### 2.2 Do you have an existing Kubernetes cluster?

- [ ] Yes, we will deploy to an existing cluster
- [ ] No, we need to create a new cluster
- [ ] Unsure

### 2.3 If yes, what Kubernetes version is running?

____________________________________________________________________________________

### 2.4 Which deployment tier best fits your needs?

- [ ] **Starter** - 10-50 concurrent users, development/staging
- [ ] **Standard** - 50-200 concurrent users, production
- [ ] **Enterprise** - 200+ concurrent users, mission-critical
- [ ] Need guidance on tier selection

### 2.5 Which region(s) will host the deployment?

____________________________________________________________________________________

### 2.6 Do you require multi-region deployment?

- [ ] Yes
- [ ] No
- [ ] Future requirement

---

## 3. Storage Requirements

### 3.1 What is your expected data volume?

| Metric | Estimated Volume |
|--------|-----------------|
| Number of traces per day | |
| Average trace size (KB) | |
| Number of experiments per month | |
| Data retention period (days) | |

### 3.2 What block storage options are available?

____________________________________________________________________________________

____________________________________________________________________________________

### 3.3 What object storage options are available?

____________________________________________________________________________________

____________________________________________________________________________________

### 3.4 Do you have existing backup infrastructure?

- [ ] Yes: ____________________
- [ ] No, need to implement

---

## 4. Network & Security

### 4.1 Do you have a domain name for the Galileo deployment?

- [ ] Yes: ____________________
- [ ] No, need to register

### 4.2 Which ingress controller will you use?

- [ ] NGINX Ingress Controller
- [ ] Traefik
- [ ] Cloud provider load balancer (ALB, GCE, Azure App Gateway)
- [ ] Other: ____________________
- [ ] Need to install

### 4.3 How will SSL/TLS certificates be managed?

- [ ] Let's Encrypt (cert-manager)
- [ ] Cloud provider certificate service
- [ ] Internal certificate authority
- [ ] Bring your own certificates

### 4.4 Are there network restrictions or firewall rules?

- [ ] Yes, provide details:

____________________________________________________________________________________

____________________________________________________________________________________

- [ ] No restrictions

### 4.5 Is the environment air-gapped?

- [ ] Yes, completely air-gapped
- [ ] Partially restricted with proxy
- [ ] No, full internet access

### 4.6 Which network security measures are required?

- [ ] Network policies
- [ ] Pod security standards
- [ ] Security groups/firewalls
- [ ] VPN access required
- [ ] Other: ____________________

---

## 5. Authentication & Authorization

### 5.1 Will you integrate with an existing SSO provider?

- [ ] Yes, SAML 2.0
- [ ] Yes, OAuth 2.0 / OIDC
- [ ] Yes, LDAP / Active Directory
- [ ] No, use Galileo's built-in authentication

### 5.2 If yes, what is your SSO provider?

____________________________________________________________________________________

### 5.3 What are your RBAC requirements?

____________________________________________________________________________________

____________________________________________________________________________________

### 5.4 How will secrets be managed?

- [ ] Kubernetes Secrets
- [ ] HashiCorp Vault
- [ ] AWS Secrets Manager
- [ ] Azure Key Vault
- [ ] GCP Secret Manager
- [ ] Other: ____________________

---

## 6. LLM Integrations

### 6.1 Which LLM providers will you use with Galileo?

- [ ] OpenAI
- [ ] Anthropic Claude
- [ ] AWS Bedrock
- [ ] Azure OpenAI
- [ ] Google Vertex AI
- [ ] Self-hosted models (vLLM, Ollama, etc.)
- [ ] Other: ____________________

### 6.2 Are API keys already available for these providers?

- [ ] Yes, all keys available
- [ ] Some keys available
- [ ] No, need to obtain

### 6.3 What frameworks are you using?

- [ ] LangChain
- [ ] LangGraph
- [ ] CrewAI
- [ ] OpenAI SDK
- [ ] Custom implementation
- [ ] Other: ____________________

---

## 7. Monitoring & Observability

### 7.1 What monitoring tools are currently in use?

- [ ] Prometheus + Grafana
- [ ] DataDog
- [ ] New Relic
- [ ] Cloud provider monitoring (CloudWatch, Cloud Monitoring, Azure Monitor)
- [ ] None currently
- [ ] Other: ____________________

### 7.2 What logging solution will be used?

- [ ] ELK Stack (Elasticsearch, Logstash, Kibana)
- [ ] Splunk
- [ ] Cloud provider logging (CloudWatch Logs, Cloud Logging, Azure Logs)
- [ ] None currently
- [ ] Other: ____________________

### 7.3 How should alerts be delivered?

- [ ] Slack
- [ ] PagerDuty
- [ ] Email
- [ ] Webhooks
- [ ] Other: ____________________

---

## 8. High Availability & Disaster Recovery

### 8.1 What is your required uptime SLA?

- [ ] 99.9% (43.8 minutes downtime/month)
- [ ] 99.95% (21.9 minutes downtime/month)
- [ ] 99.99% (4.38 minutes downtime/month)
- [ ] No specific SLA requirement

### 8.2 What is your Recovery Time Objective (RTO)?

____________________________________________________________________________________

### 8.3 What is your Recovery Point Objective (RPO)?

____________________________________________________________________________________

### 8.4 Do you require multi-AZ deployment?

- [ ] Yes, required
- [ ] Preferred but not required
- [ ] Not needed

### 8.5 What backup frequency is required?

- [ ] Real-time replication
- [ ] Hourly
- [ ] Daily
- [ ] Weekly

---

## 9. Compliance & Data Privacy

### 9.1 Which compliance frameworks apply?

- [ ] SOC 2
- [ ] HIPAA
- [ ] GDPR
- [ ] ISO 27001
- [ ] FedRAMP
- [ ] None
- [ ] Other: ____________________

### 9.2 Are there data residency requirements?

- [ ] Yes, specify region(s): ____________________
- [ ] No

### 9.3 What is your required data retention period?

____________________________________________________________________________________

### 9.4 Are there specific data handling requirements?

____________________________________________________________________________________

____________________________________________________________________________________

---

## 10. CI/CD & DevOps

### 10.1 What CI/CD platform do you use?

- [ ] GitHub Actions
- [ ] GitLab CI
- [ ] Jenkins
- [ ] CircleCI
- [ ] Azure DevOps
- [ ] ArgoCD / Flux
- [ ] Other: ____________________

### 10.2 Will Galileo integrate with your CI/CD pipeline?

- [ ] Yes, for automated testing
- [ ] Yes, for deployment validation
- [ ] No integration needed
- [ ] Unsure

### 10.3 What is your deployment methodology?

- [ ] GitOps
- [ ] Helm-based
- [ ] Kustomize
- [ ] Manual kubectl
- [ ] Other: ____________________

---

## 11. Support & Training

### 11.1 What support level is required?

- [ ] Standard (business hours, email)
- [ ] Premium (24/7, faster response)
- [ ] Enterprise (dedicated support, custom SLA)

### 11.2 How many team members need training?

____________________________________________________________________________________

### 11.3 What training format is preferred?

- [ ] Self-paced online
- [ ] Live virtual sessions
- [ ] On-site training
- [ ] Documentation only

---

## 12. Budget & Timeline

### 12.1 What is your deployment timeline?

| Milestone | Target Date |
|-----------|-------------|
| Infrastructure ready | |
| Deployment complete | |
| User training complete | |
| Production go-live | |

### 12.2 Are there budget constraints?

____________________________________________________________________________________

____________________________________________________________________________________

---

## 13. Additional Requirements

### 13.1 Are there any specific regulatory requirements?

____________________________________________________________________________________

____________________________________________________________________________________

### 13.2 Do you have custom integration needs?

____________________________________________________________________________________

____________________________________________________________________________________

### 13.3 Are there any other special requirements or concerns?

____________________________________________________________________________________

____________________________________________________________________________________

---

## Next Steps

After completing this questionnaire:

1. Share with your Galileo representative for review
2. Schedule a technical planning session
3. Receive customized deployment recommendations
4. Begin infrastructure preparation

---

## Contact Information

| Role | Name | Email | Phone |
|------|------|-------|-------|
| Project Lead | | | |
| Technical Lead | | | |
| Infrastructure Owner | | | |
| Security Lead | | | |

---

**Galileo Deployment Questionnaire** | Version 1.0 | © 2025 Galileo

For assistance, contact: **support@galileo.ai**
