"use client";

import { useEffect, useMemo, useState } from "react";

type Sector = "Tecnologia" | "Alimentação" | "Varejo" | "Agência";
type View =
  | "escritorio"
  | "pessoas"
  | "projetos"
  | "cidade"
  | "noticias"
  | "jornada"
  | "portfolio";
type PageGuideDefinition = { eyebrow: string; title: string; summary: string; actions: string[]; watch: string; firstStep: string };
type CharacterMemory = {
  id: string;
  week: number;
  kind: "contratacao" | "salario" | "cuidado" | "conflito" | "reconhecimento" | "poder" | "familia" | "resultado" | "produto" | "sucessao";
  text: string;
  feeling: "grato" | "confiante" | "cauteloso" | "magoado" | "ressentido" | "orgulhoso";
  value: number;
  strength: number;
};
type IdentityDimension = "pessoas" | "agressividade" | "visao" | "prudencia" | "integridade" | "negociacao";
type LeadershipIdentity = Record<IdentityDimension, number>;
type IdentityMoment = { week: number; reason: string; changes: Partial<Record<IdentityDimension, number>> };
type BusinessPartner = {
  id: string;
  name: string;
  representative: string;
  kind: "cliente" | "fornecedor";
  personality: "leal" | "exigente" | "oportunista" | "conservador" | "inovador";
  weeklyValue: number;
  trust: number;
  dependency: number;
  weeksLeft: number;
  status: "ativo" | "negociacao" | "proposta" | "disputa" | "encerrado";
  lastEvent?: string;
  proposalType?: "novo" | "renovacao" | "exclusividade" | "concorrente";
  proposedValue?: number;
  proposedWeeks?: number;
  proposalExpiresWeek?: number;
  disputeReason?: string;
  disputeLevel?: number;
  lastNegotiatedBy?: string;
  signedWeek?: number;
  lastNegotiationWeek?: number;
  relationshipCooldownUntil?: number;
  failedRenegotiations?: number;
};
type MarketingPulse = {
  week: number;
  outcome: "organico" | "forte" | "positivo" | "fraco" | "negativo";
  multiplier: number;
  customerDelta: number;
  efficiency: number;
  detail: string;
  reputationDelta?: number;
};
type MarketingAudience = "massa" | "nicho" | "premium" | "clientes";
type MarketingObjective = "aquisicao" | "lancamento" | "marca" | "retencao";
type MarketingCampaignOutcome = "forte" | "moderado" | "ignorado" | "negativo";
type MarketingCampaign = {
  id: string;
  name: string;
  audience: MarketingAudience;
  objective: MarketingObjective;
  productId?: number;
  productName?: string;
  totalBudget: number;
  duration: number;
  weeksLeft: number;
  startedWeek: number;
  outcome: MarketingCampaignOutcome;
  probabilities: Record<MarketingCampaignOutcome, number>;
  totalCustomerImpact: number;
  revenueMultiplier: number;
  totalReputationImpact: number;
  revealed?: boolean;
};
type FinancialEntry = {
  id: string;
  week: number;
  companyId: number;
  companyName: string;
  category: "receita" | "equipe" | "marketing" | "estrutura" | "contratos" | "juros" | "tributos" | "eventos" | "transferencia";
  label: string;
  amount: number;
  detail: string;
};
type StaffAlert = { id: string; companyId: number; companyName: string; employeeName: string; role: string; reason: "demissao" | "desligamento"; week: number; responsible: string; headcountAfter: number; resolved?: boolean };
type FactionAgenda = "crescimento" | "seguranca" | "inovacao" | "pessoas" | "familia" | "retorno";
type HoldingFaction = {
  id: string;
  name: string;
  agenda: FactionAgenda;
  members: string[];
  leader: string;
  power: number;
  support: number;
  pressure: number;
  agendaWeeks?: number;
  lastMove: string;
};
type AnnualPriority = "crescimento" | "rentabilidade" | "pessoas" | "inovacao" | "consolidacao";
type AnnualSnapshot = { revenue: number; profit: number; cash: number; customers: number; morale: number; stress: number; debt: number; products: number; reputation: number; board: number };
type AnnualPlan = { year: number; startWeek: number; endWeek: number; priority: AnnualPriority; title: string; promises: string[]; baseline: AnnualSnapshot };
type AnnualReview = { year: number; priority: AnnualPriority; score: number; verdict: string; results: { label: string; achieved: boolean; detail: string }[]; bestDecision: string; worstDecision: string };
type FounderPersonal = { health: number; family: number; satisfaction: number; ego: number; regrets: number };
type CareerMoment = { week: number; title: string; detail: string; tone: "positivo" | "negativo" | "neutro" };
type FounderEnding = "querido" | "bilionario" | "visionario" | "negociador" | "sobrevivente" | "deposto" | "dinastia" | "controverso";
type FounderLegacyPath = "duradouro" | "ambivalente" | "ruptura";
type FounderLegacyOutcome = {
  path: FounderLegacyPath;
  probability: number;
  title: string;
  generation: number;
  financialValue: number;
  peopleImpacted: number;
  impactScore: number;
  impactTone: "positivo" | "negativo";
  narrative: string;
  drivers: string[];
};

const founderPersonalLabels: Record<keyof FounderPersonal, string> = {
  health: "saúde",
  family: "família",
  satisfaction: "realização",
  ego: "ego",
  regrets: "arrependimentos",
};
type Employee = {
  id: number;
  name: string;
  initials: string;
  role: string;
  salary: number;
  market: number;
  skill: number;
  morale: number;
  loyalty: number;
  trait: string;
  ambition: string;
  color: string;
  relation: number;
  stress?: number;
  weeks?: number;
  warnings?: number;
  leaveWeeks?: number;
  memories?: CharacterMemory[];
  department?: DirectorArea;
  talentTier?: TalentTier;
  requiredEmployerScore?: number;
  signingBonus?: number;
};
type TalentTier = "iniciante" | "junior" | "pleno" | "senior" | "elite";
type DirectorArea = "pessoas" | "operacoes" | "produto" | "comercial";
type CompanyDirector = {
  id: string;
  employeeId: number;
  name: string;
  area: DirectorArea;
  style: "colaborativo" | "agressivo" | "analitico" | "especialista";
  competence: number;
  trust: number;
  authority: number;
  weeks: number;
  lastAction: string;
  origin: "promovido" | "contratado";
};
type FacilityKey = "escritorio" | "equipamentos" | "lazer" | "beneficios" | "treinamento" | "seguranca" | "infraestrutura";
type FacilityLevel = 0 | 1 | 2 | 3 | 4 | 5;
type FacilityState = {
  level: FacilityLevel;
  condition: number;
  lastUpgradeWeek: number;
  incidents: number;
};
type FacilityMaintenanceMode = "economico" | "adequado" | "premium";
type Project = {
  id: number;
  name: string;
  progress: number;
  quality: number;
  budget: number;
  reward: number;
  risk: number;
  status: "ativo" | "concluido";
  kind?: "produto" | "contrato" | "campanha" | "melhoria";
  recurring?: number;
  lifecycle?:
    "desenvolvimento" | "mercado" | "fora_de_linha" | "direitos_vendidos";
  marketStage?: "lancamento" | "crescimento" | "maturidade" | "declinio";
  marketWeeks?: number;
  productPrice?: number;
  productMarketing?: number;
  version?: number;
  patented?: boolean;
  rightsOwned?: number;
  licensee?: string;
  royaltyRevenue?: number;
  lawsuitWeeks?: number;
  legalOpponent?: string;
  proposedByEmployeeId?: number;
  proposedByEmployeeName?: string;
  estimatedSuccess?: number;
  complexity?: 1 | 2 | 3 | 4 | 5;
  requiredTeam?: number;
  requiredRoles?: string[];
  developmentCost?: number;
  maintenanceCost?: number;
  preparation?: Partial<Record<ProductPreparation, number>>;
  delayWeeks?: number;
  bugLevel?: number;
  customerSatisfaction?: number;
  updateNeed?: number;
  supportLevel?: number;
  feedback?: ProductFeedback[];
  launchOutcome?: "sucesso" | "morno" | "falha" | "desastre";
  lastVersionOutcome?: "melhoria" | "ignorada" | "bugs" | "rejeitada" | "canibalizacao";
  emergencyWeeks?: number;
};
type ProductPreparation = "pesquisa" | "prototipo" | "testes" | "seguranca" | "qualidade" | "piloto" | "suporte";
type ProductFeedback = { id: string; week: number; rating: number; text: string; tone: "positivo" | "neutro" | "negativo" };
type OngoingEffect = {
  id: string;
  name: string;
  source: string;
  weeksLeft: number;
  tone: "positivo" | "negativo" | "misto";
  revenueMultiplier?: number;
  costMultiplier?: number;
  customerDelta?: number;
  reputationDelta?: number;
  moraleDelta?: number;
  stressDelta?: number;
  boardDelta?: number;
  productQualityDelta?: number;
};
type CEOStyle = "crescimento" | "eficiencia" | "inovacao" | "pessoas";
type CEOGoal = "receita" | "lucro" | "valor" | "cultura";
type Company = {
  id: number;
  name: string;
  sector: Sector;
  cash: number;
  debt: number;
  customers: number;
  reputation: number;
  culture: string;
  price: number;
  marketing: number;
  employees: Employee[];
  projects: Project[];
  history: number[];
  founded: number;
  sold?: boolean;
  bankrupt?: boolean;
  buyer?: string;
  founderEquity?: number;
  ceo?: string;
  boardSupport?: number;
  investors?: InvestorStake[];
  productRevenue?: number;
  efficiency?: number;
  campaignWeeks?: number;
  marketingMultiplier?: number;
  marketingPulse?: MarketingPulse;
  marketingCampaigns?: MarketingCampaign[];
  directors?: CompanyDirector[];
  facilities?: Partial<Record<FacilityKey, FacilityState>>;
  facilityMaintenanceMode?: FacilityMaintenanceMode;
  employerBrand?: number;
  rejectedCandidates?: { name: string; untilWeek: number }[];
  parentCompanyId?: number;
  acquisitionPrice?: number;
  origin?: "fundada" | "adquirida";
  autonomy?: "centralizada" | "supervisionada" | "independente";
  dividendRate?: number;
  sharedServices?: boolean;
  closed?: boolean;
  mergedInto?: string;
  effects?: OngoingEffect[];
  ceoStyle?: CEOStyle;
  ceoGoal?: CEOGoal;
  ceoBudget?: number;
  ceoTrust?: number;
  ceoInfluence?: number;
  ceoTenure?: number;
  ceoLastDecision?: string;
  ceoHiddenIssue?: string;
  ceoHiddenWeeks?: number;
  ceoHistory?: string[];
  ceoMemories?: CharacterMemory[];
  ceoLoyalty?: number;
  ceoAmbition?: number;
  ceoReputation?: number;
  ceoEquity?: number;
  ceoAllianceCompanyId?: number;
  ceoRivalCompanyId?: number;
  ceoDemandCooldown?: number;
  ceoProductCooldown?: number;
  ceoHireCooldown?: number;
  workforceTarget?: number;
  partners?: BusinessPartner[];
};
type CapitalProvider = {
  id: string;
  name: string;
  representative: string;
  kind: "banco" | "fundo" | "anjo";
  profile: string;
  color: string;
  patience: number;
  control: number;
};
type InvestorStake = {
  providerId: string;
  name: string;
  representative: string;
  equity: number;
  boardSeats: number;
  support: number;
  invested: number;
  deadline: number;
  target: "receita" | "valor" | "lucro";
  targetValue: number;
  lastReview: number;
};
type Competitor = {
  id: number;
  name: string;
  founder: string;
  sector: Sector;
  score: number;
  reputation: number;
  strategy: string;
  status: "crescendo" | "estavel" | "crise" | "vendida" | "fechada";
  crisisWeeks?: number;
  age?: number;
  cash?: number;
  personality?:
    "visionário" | "agressivo" | "conservador" | "diplomático" | "oportunista";
  relation?: number;
  relationship?: "rival" | "neutro" | "parceiro";
  products?: {
    id: number;
    name: string;
    quality: number;
    stage: "lançamento" | "crescimento" | "maduro" | "declínio";
  }[];
  history?: string[];
  lastDecision?: string;
  acquiredBy?: string;
  mergedInto?: string;
};
type NewsItem = {
  id: number;
  week: number;
  category: "economia" | "mercado" | "pessoas" | "negocios";
  headline: string;
  body: string;
  impact: "positivo" | "neutro" | "negativo";
  topic?: string;
  source?: string;
  scope?: "local" | "setorial" | "nacional" | "internacional" | "interno";
  region?: string;
  sectors?: Sector[];
  tags?: string[];
};
type Economy = {
  cycle: "expansao" | "estavel" | "inflacao" | "recessao" | "credito";
  demand: number;
  costs: number;
  interest: number;
  confidence: number;
  weeksLeft: number;
  nextCycle?: Economy["cycle"];
};
type IndicatorReason = {
  title: string;
  detail: string;
  direction: "positivo" | "negativo" | "neutro";
};
type IndicatorChange = {
  key: "cash" | "revenue" | "profit" | "customers" | "reputation" | "morale" | "stress" | "valuation" | "board";
  label: string;
  before: number;
  after: number;
  delta: number;
  format: "money" | "number" | "percent";
  reasons: IndicatorReason[];
};
type DecisionImpact = {
  label: string;
  tone: "positivo" | "negativo" | "neutro";
};
type DecisionObservation = {
  week: number;
  companyId: number;
  indicator: IndicatorChange["key"];
  label: string;
  delta: number;
  format: IndicatorChange["format"];
  tone: "positivo" | "negativo" | "neutro";
};
type DecisionTrace = {
  id: string;
  week: number;
  actor: string;
  title: string;
  decision: string;
  result: string;
  companyId?: number;
  companyName?: string;
  expiresWeek: number;
  impactKeys: IndicatorChange["key"][];
  impacts: DecisionImpact[];
  affectedCharacters: string[];
  derivedNewsIds: number[];
  observations: DecisionObservation[];
};
type CompanyWeeklyReport = {
  companyId: number;
  companyName: string;
  summary: string;
  severity: "normal" | "atencao" | "critico";
  indicators: IndicatorChange[];
};
type WeeklyReport = {
  week: number;
  economyBefore: Economy["cycle"];
  economyAfter: Economy["cycle"];
  confidenceBefore: number;
  confidenceAfter: number;
  headline: string;
  companies: CompanyWeeklyReport[];
};
type WeeklyAdvice = {
  tone: "positivo" | "atencao" | "urgente";
  title: string;
  detail: string;
  action: "estrategia" | "pessoas" | "projetos" | "mercado" | "nenhuma";
  actionLabel: string;
};
type WeeklyDigestCard = WeeklyAdvice & { companyId: number; companyName: string; kind: "urgente" | "oportunidade" | "assessor" };
type GameDifficulty = "relaxado" | "executivo" | "implacavel";
type GenerationMissionKind = "resultado" | "reputacao" | "familia";
type GenerationMission = {
  id: string;
  generation: number;
  kind: GenerationMissionKind;
  title: string;
  description: string;
  target: number;
  progress: number;
  rewardCash: number;
  rewardLegacy: number;
  rewardTitle: string;
  completed: boolean;
  completedWeek?: number;
};
type AchievementUnlock = { id: string; week: number; generation: number; title: string };
type NarrativeDirectorMode = "calma" | "equilibrio" | "escalada" | "recuperacao" | "foco";
type NarrativeDirectorState = {
  mode: NarrativeDirectorMode;
  tension: number;
  crisisStreak: number;
  quietStreak: number;
  lastInterventionWeek: number;
  lastReason: string;
};
type MessageChoice = {
  label: string;
  tone?: "good" | "risk";
  hint?: string;
  result: string;
  effect: (state: GameState) => GameState;
};
type StoryMessage = {
  id: string;
  from: string;
  role: string;
  initials: string;
  color: string;
  subject: string;
  body: string;
  choices: MessageChoice[];
};
type AuditCase = {
  id: string;
  companyId: number;
  openedWeek: number;
  title: string;
  category:
    | "financeiro"
    | "contratos"
    | "pessoas"
    | "dados"
    | "fiscal"
    | "governanca";
  suspect: string;
  description: string;
  severity: "baixa" | "media" | "alta" | "critica";
  status: "suspeita" | "investigando" | "comprovada" | "encerrada" | "acobertada";
  evidence: number;
  weeksLeft: number;
  exposureRisk: number;
  potentialLoss: number;
  outcome?: string;
};
type LifeGoalId = "fortuna" | "dinastia" | "impacto" | "liberdade";
type DynastyGoal = "expandir" | "preservar" | "inovar" | "unir";
type WillPolicy = "igualitario" | "controle" | "fundacao";
type FormerPresident = {
  name: string;
  generation: number;
  startWeek: number;
  endWeek: number;
  style: CEOStyle;
  influence: number;
  relationship: number;
  ambition: number;
  reputation: number;
  status: "aliado" | "neutro" | "oposicao";
  legacy: string;
  lastMove?: string;
  age: number;
  health: number;
  alive: boolean;
  memoir?: string;
  secret?: string;
  secretRevealed?: boolean;
  memoirPublished?: boolean;
};
type PoliticalArc = {
  id: string;
  challenger: string;
  incumbent: string;
  startedWeek: number;
  weeksLeft: number;
  support: number;
  stage: "rumores" | "campanha" | "votacao";
};
type GenerationArcKind = "guerra-familiar" | "aquisicao-hostil" | "fraude-ceo" | "produto-declinio" | "pressao-venda" | "escandalo-fundador";
type GenerationNarrativeArc = {
  id: string;
  generation: number;
  kind: GenerationArcKind;
  title: string;
  antagonist: string;
  companyId?: number;
  summary: string;
  chapter: number;
  status: "ativo" | "resolvido";
  power: number;
  trust: number;
  risk: number;
  startedWeek: number;
  lastChapterWeek: number;
  decisions: string[];
  outcome?: string;
  outcomeTone?: "vitoria" | "acordo" | "derrota";
};
type GenerationArcRecord = {
  id: string;
  generation: number;
  title: string;
  antagonist: string;
  outcome: string;
  tone: "vitoria" | "acordo" | "derrota";
  endedWeek: number;
  decisions: string[];
};
type GenerationProfile = {
  leader: string;
  generation: number;
  style: CEOStyle;
  title: string;
  doctrine: string;
  promise: string;
  riskTolerance: number;
  startWeek: number;
  age: number;
  health: number;
};
type MandateReview = { generation: number; leader: string; week: number; score: number; verdict: string; profitCompanies: number; legitimacy: number; familyUnity: number };
type DynastyEnding = {
  type: "centenario" | "imperio" | "fragmentacao" | "queda";
  title: string;
  narrative: string;
  generation: number;
  value: number;
  companies: number;
  people: number;
  founderLegacyEndsGeneration: number;
  futureYears: number;
  futureValue: number;
  futureCompanies: number;
  futurePeople: number;
  futureNarrative: string;
  secretEndingTitle?: string;
  secretEndingNarrative?: string;
};
type DynastyTransition = {
  week: number;
  outgoing: string;
  incoming: string;
  generation: number;
  tenure: number;
  empireValue: number;
  activeCompanies: number;
  employees: number;
  reputation: number;
  verdict: string;
};
type Heir = {
  id: number;
  name: string;
  relationship: string;
  startAge: number;
  competence: number;
  readiness: number;
  bond: number;
  ambition: number;
  style: CEOStyle;
  role: "familia" | "formacao" | "conselho" | "sucessor" | "ceo";
  history: string[];
  generation?: number;
  parent?: string;
  equity?: number;
  support?: number;
  resentment?: number;
  status?: "familia" | "afastado" | "rompido";
  memories?: CharacterMemory[];
};
type GameState = {
  started: boolean;
  founder: string;
  week: number;
  chapter: number;
  personalCash: number;
  companies: Company[];
  activeCompanyId: number;
  unread: StoryMessage[];
  log: string[];
  rivalScore: number;
  reputation: number;
  legacy: number;
  lastOffer: number;
  competitors: Competitor[];
  news: NewsItem[];
  economy: Economy;
  providers: CapitalProvider[];
  balanceVersion?: number;
  difficulty?: GameDifficulty;
  difficultyApplied?: GameDifficulty;
  holdingName?: string;
  lastNarrativeWeek?: number;
  narrativeHistory?: string[];
  completedMissions?: string[];
  survivedRecessions?: number;
  ceoComebacks?: number;
  auditCases?: AuditCase[];
  founderStartAge?: number;
  lifeGoal?: LifeGoalId;
  lifeGoalCompleted?: boolean;
  heirs?: Heir[];
  chosenSuccessorId?: number;
  founderRetired?: boolean;
  retiredWeek?: number;
  successionHistory?: string[];
  lastFamilyEventWeek?: number;
  playerExecutive?: string;
  dynastyMode?: boolean;
  generation?: number;
  dynastyStartedWeek?: number;
  dynastyLegitimacy?: number;
  dynastyGoal?: DynastyGoal;
  familyUnity?: number;
  founderHealth?: number;
  founderDeceased?: boolean;
  willPolicy?: WillPolicy;
  founderHoldingEquity?: number;
  familyFoundationEquity?: number;
  outsideFamilyEquity?: number;
  dynastyHistory?: string[];
  formerPresidents?: FormerPresident[];
  lastDynastyTransition?: DynastyTransition;
  politicalArc?: PoliticalArc;
  generationArc?: GenerationNarrativeArc;
  generationArcHistory?: GenerationArcRecord[];
  generationMissions?: GenerationMission[];
  achievements?: AchievementUnlock[];
  narrativeDirector?: NarrativeDirectorState;
  tutorialSeenWeeks?: number[];
  tutorialCompleted?: boolean;
  seenPageGuides?: View[];
  generationProfile?: GenerationProfile;
  mandateReviews?: MandateReview[];
  lastMandateReviewWeek?: number;
  dynastyEndingReady?: boolean;
  dynastyConcluded?: boolean;
  dynastyEnding?: DynastyEnding;
  staffAlerts?: StaffAlert[];
  lastDynastyEventWeek?: number;
  completedDynastyGoals?: string[];
  recentNewsTopics?: string[];
  weeklyReports?: WeeklyReport[];
  decisionTraces?: DecisionTrace[];
  financialLedger?: FinancialEntry[];
  leadershipIdentity?: LeadershipIdentity;
  identityHistory?: IdentityMoment[];
  factions?: HoldingFaction[];
  factionHistory?: string[];
  annualPlan?: AnnualPlan;
  annualReviews?: AnnualReview[];
  founderPersonal?: FounderPersonal;
  careerMoments?: CareerMoment[];
  nemesisId?: number;
  lastPersonalEventWeek?: number;
  founderJourneyReady?: boolean;
  founderJourneyComplete?: boolean;
  founderEnding?: FounderEnding;
  founderEndingWeek?: number;
  founderLegacyOutcome?: FounderLegacyOutcome;
};
type Mission = {
  id: string;
  chapter: number;
  title: string;
  story: string;
  objective: string;
  target: number;
  rewardCash: number;
  rewardLegacy: number;
  progress: (state: GameState) => number;
  unlockWeek?: number;
};

const money = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
  maximumFractionDigits: 0,
});
const compact = new Intl.NumberFormat("pt-BR", {
  notation: "compact",
  style: "currency",
  currency: "BRL",
  maximumFractionDigits: 1,
});
const clamp = (n: number, min = 0, max = 100) =>
  Math.min(max, Math.max(min, n));

const difficultyProfiles: Record<GameDifficulty, { title: string; description: string; stress: number; economyDemand: number; economyCosts: number; departure: number; rival: number; reward: number }> = {
  relaxado: { title: "Relaxado", description: "Mais tempo para aprender, equipes resistentes e economia menos punitiva.", stress: .72, economyDemand: 1.035, economyCosts: .975, departure: .55, rival: -.7, reward: .85 },
  executivo: { title: "Executivo", description: "A experiência equilibrada: decisões difíceis sem punições artificiais.", stress: 1, economyDemand: 1, economyCosts: 1, departure: 1, rival: 0, reward: 1 },
  implacavel: { title: "Implacável", description: "Crises pressionam margens, concorrentes reagem e pessoas toleram menos erros.", stress: 1.28, economyDemand: .965, economyCosts: 1.035, departure: 1.55, rival: .9, reward: 1.3 },
};
const narrativeModeLabels: Record<NarrativeDirectorMode, string> = { calma: "Execução tranquila", equilibrio: "Tensão equilibrada", escalada: "Algo está se formando", recuperacao: "Tempo de recuperação", foco: "Conflito em foco" };
const pageGuides: Record<View, PageGuideDefinition> = {
  escritorio: { eyebrow: "CENTRO DA OPERAÇÃO", title: "Escritório", summary: "Aqui você acompanha a empresa ativa e toma as decisões que mexem diretamente no caixa e no crescimento.", actions: ["Ajustar preço, marketing e estratégia", "Abrir negociações, buscar capital e responder ao conselho", "Avançar as semanas e observar a operação reagir"], watch: "Lucro e faturamento não são a mesma coisa. Crescer clientes sem margem pode acelerar um prejuízo.", firstStep: "Confira o lucro semanal e mantenha reserva antes de aumentar marketing ou iniciar projetos caros." },
  pessoas: { eyebrow: "EQUIPE E MEMÓRIA", title: "Pessoas", summary: "Esta página reúne funcionários, salários, estresse, lealdade e tudo que eles lembram sobre sua liderança.", actions: ["Contratar e substituir funcionários", "Negociar salários e conceder descanso", "Entender humor, relações e risco de demissão"], watch: "Funcionários raramente saem por uma única semana ruim. Salário defasado, estresse e promessas quebradas se acumulam.", firstStep: "Procure primeiro quem está mais estressado ou recebe muito abaixo do mercado." },
  projetos: { eyebrow: "PRODUTOS E APOSTAS", title: "Projetos", summary: "Aqui nascem produtos, melhorias e campanhas. Cada projeto consome capacidade da equipe e carrega qualidade e risco.", actions: ["Criar e acompanhar projetos", "Definir preço, marketing e atualizações de produtos", "Licenciar, vender direitos ou retirar produtos de linha"], watch: "Produtos faturam quando chegam ao mercado. Durante o desenvolvimento, eles consomem caixa e aumentam a carga da equipe.", firstStep: "Evite muitos projetos simultâneos; escolha uma prioridade e acompanhe risco e qualidade." },
  cidade: { eyebrow: "MERCADO E CONCORRÊNCIA", title: "Mercado", summary: "Esta é a visão externa do jogo: concorrentes, clientes, oportunidades de aquisição e movimentos do setor.", actions: ["Investigar e enfrentar concorrentes", "Comprar empresas ou observar possíveis falências", "Comparar força, produtos e reputação no setor"], watch: "Concorrentes administram caixa e produtos próprios. Um rival em crise pode se recuperar, ser vendido ou virar oportunidade de compra.", firstStep: "Identifique o concorrente mais forte do seu setor antes de alterar preço ou lançar um produto." },
  noticias: { eyebrow: "O MUNDO REAGE", title: "Noticiário", summary: "As notícias mostram como mercado, clientes, funcionários e rivais interpretam os acontecimentos da sua história.", actions: ["Ler repercussões e comentários do mercado", "Entender quais setores e empresas foram afetados", "Antecipar mudanças de confiança e demanda"], watch: "Uma manchete não é apenas decoração: notícias alteram confiança econômica e podem influenciar as semanas seguintes.", firstStep: "Abra notícias negativas ligadas ao seu setor e leia especialmente o trecho ‘O que observar agora’." },
  jornada: { eyebrow: "VIDA DO FUNDADOR", title: "Jornada", summary: "Aqui você acompanha a história pessoal do fundador, missões, escolhas de vida e os caminhos possíveis para seu legado.", actions: ["Acompanhar capítulos e missões da carreira", "Equilibrar saúde, família, satisfação e ambição", "Preparar aposentadoria e observar futuros possíveis"], watch: "Construir o maior patrimônio nem sempre produz o melhor final. Família, integridade e sucessão também entram no desfecho.", firstStep: "Veja qual é a próxima missão da jornada e quais aspectos da vida do fundador estão mais baixos." },
  portfolio: { eyebrow: "SUA HOLDING", title: "Meu grupo", summary: "Esta é a visão do império: empresas fundadas ou adquiridas, CEOs, patrimônio, controle familiar e modo Dinastia.", actions: ["Alternar e administrar empresas da holding", "Definir autonomia, metas e orçamento dos CEOs", "Abrir, vender, fundir empresas e conduzir sucessões"], watch: "Uma empresa delegada continua tomando decisões. Autonomia reduz seu trabalho, mas aumenta o poder político do CEO.", firstStep: "Confira quais empresas estão no lucro e quais CEOs precisam de orientação antes de avançar várias semanas." },
};

const characterMemory = (
  week: number,
  kind: CharacterMemory["kind"],
  text: string,
  feeling: CharacterMemory["feeling"],
  value: number,
  strength = 70,
): CharacterMemory => ({
  id: `${week}-${kind}-${Math.abs(text.split("").reduce((sum, char) => sum + char.charCodeAt(0), 0))}`,
  week,
  kind,
  text,
  feeling,
  value,
  strength,
});

const addCharacterMemory = (
  memories: CharacterMemory[] | undefined,
  memory: CharacterMemory,
) => [memory, ...(memories ?? []).filter((item) => item.id !== memory.id)].slice(0, 12);

const characterMemoryScore = (memories: CharacterMemory[] | undefined, week: number) =>
  clamp(
    (memories ?? []).reduce((score, memory) => {
      const ageFactor = Math.max(0.28, 1 - Math.max(0, week - memory.week) / 120);
      return score + memory.value * (memory.strength / 100) * ageFactor;
    }, 0),
    -30,
    30,
  );

const characterOpinion = (memories: CharacterMemory[] | undefined, week: number) => {
  const score = characterMemoryScore(memories, week);
  if (score >= 16) return { label: "Confia profundamente em você", tone: "positivo" };
  if (score >= 6) return { label: "Guarda boas lembranças", tone: "positivo" };
  if (score <= -16) return { label: "Não esqueceu o que aconteceu", tone: "negativo" };
  if (score <= -6) return { label: "Ainda guarda ressentimento", tone: "negativo" };
  return { label: "Observa suas próximas decisões", tone: "neutro" };
};

const initialLeadershipIdentity: LeadershipIdentity = {
  pessoas: 50,
  agressividade: 50,
  visao: 50,
  prudencia: 50,
  integridade: 50,
  negociacao: 50,
};

const evolveIdentity = (
  state: GameState,
  changes: Partial<Record<IdentityDimension, number>>,
  reason: string,
): GameState => ({
  ...state,
  leadershipIdentity: Object.entries(changes).reduce(
    (identity, [key, delta]) => ({ ...identity, [key]: clamp(identity[key as IdentityDimension] + (delta ?? 0)) }),
    { ...(state.leadershipIdentity ?? initialLeadershipIdentity) },
  ),
  identityHistory: [{ week: state.week, reason, changes }, ...(state.identityHistory ?? [])].slice(0, 18),
});

const leadershipArchetype = (identity: LeadershipIdentity | undefined) => {
  const value = identity ?? initialLeadershipIdentity;
  const strongest = (Object.entries(value) as [IdentityDimension, number][]).sort((a, b) => b[1] - a[1])[0][0];
  return ({
    pessoas: ["Líder humano", "O mercado vê alguém que protege equipes e relações."],
    agressividade: ["Fundador agressivo", "Você avança rápido, pressiona negociações e aceita confronto."],
    visao: ["Visionário", "Produtos, inovação e apostas de longo prazo definem sua imagem."],
    prudencia: ["Gestor conservador", "Caixa, previsibilidade e sobrevivência vêm antes da velocidade."],
    integridade: ["Líder confiável", "Transparência e responsabilidade aumentam sua credibilidade."],
    negociacao: ["Negociador implacável", "Parceiros esperam acordos duros e preparação em cada conversa."],
  } as Record<IdentityDimension, [string, string]>)[strongest];
};

const partnerNames: Record<Sector, [string, string][]> = {
  Tecnologia: [["Banco Horizonte", "Carla Mello"], ["Rede Clínica Vitta", "João Peixoto"], ["Nuvem Base", "Mirela Torres"], ["DataShield", "Rui Amaral"]],
  Alimentação: [["Mercados Boa Praça", "Sônia Matos"], ["Rede Sabor & Cia.", "Caio Lacerda"], ["AgroVale Insumos", "Nádia Freitas"], ["LogFrio", "Paulo Seixas"]],
  Varejo: [["Galeria Central", "Amanda Luz"], ["Clube Mais", "Diego Fontes"], ["Distribuidora Ponte", "Lara Vilela"], ["Rota Express", "César Porto"]],
  Agência: [["Grupo Aurora", "Teresa Vidal"], ["Instituto Veredas", "Fábio Lins"], ["Estúdio Frame", "Bia Salgado"], ["Mídia Sul", "André Neves"]],
};

function createBusinessPartners(sector: Sector, seed = 1): BusinessPartner[] {
  return partnerNames[sector].map(([name, representative], index) => ({
    id: `${sector}-${seed}-${index}`,
    name,
    representative,
    kind: index < 2 ? "cliente" : "fornecedor",
    personality: (["leal", "exigente", "conservador", "oportunista"] as BusinessPartner["personality"][])[(seed + index) % 4],
    weeklyValue: index < 2 ? 9000 + ((seed + index * 3) % 7) * 2200 : 3500 + ((seed + index) % 5) * 1300,
    trust: 52 + ((seed * 7 + index * 11) % 28),
    dependency: 30 + ((seed * 13 + index * 9) % 50),
    weeksLeft: 10 + ((seed + index * 4) % 14),
    status: "ativo",
    signedWeek: 1,
    lastNegotiationWeek: 0,
    relationshipCooldownUntil: 0,
    failedRenegotiations: 0,
    lastEvent: "Contrato em andamento dentro das condições negociadas.",
  }));
}

const proposalPartnerNames: Record<Sector, { clients: [string, string][]; suppliers: [string, string][] }> = {
  Tecnologia: { clients: [["Grupo MedNova", "Helena Sá"], ["Finaxis", "Otávio Reis"], ["Rede Prisma", "Laura Couto"], ["Instituto Atlas", "Marcos Neri"]], suppliers: [["CloudForge", "Rafael Simões"], ["SecureLayer", "Tânia Braga"], ["DataCore", "Ivo Mendes"], ["LinkWave", "Paula Rios"]] },
  Alimentação: { clients: [["Rede Mesa Brasil", "Lúcia Teles"], ["Hotéis Estação", "Renato Paz"], ["Empório Nacional", "Alice Nunes"], ["Clube Gourmet", "Vitor Diniz"]], suppliers: [["Campo Nobre", "Sérgio Vale"], ["Embalapack", "Marta Cruz"], ["FrioCerto", "Denis Luz"], ["Safra Sul", "Carla Pires"]] },
  Varejo: { clients: [["Shopping Aurora", "Marina Leal"], ["Clube Urbano", "Heitor Lima"], ["Marketplace Uno", "Bianca Faria"], ["Rede Ponto", "Caio Luz"]], suppliers: [["Importadora Arco", "Joana Prado"], ["CentroLog", "Hugo Sales"], ["Fábrica Norte", "Nina Vaz"], ["ExpressHub", "Pedro Paiva"]] },
  Agência: { clients: [["Banco Vereda", "Lara Moura"], ["Grupo Horizonte", "Danilo Serra"], ["Fundação Viva", "Cecília Ramos"], ["Marca Lume", "Arthur Reis"]], suppliers: [["Estúdio Sonora", "Ravi Campos"], ["Mídia Flow", "Olívia Cruz"], ["Produtora Cena", "Tiago Neves"], ["Banco de Imagens Uno", "Sofia Melo"]] },
};

function createPartnerProposal(company: Company, week: number, kind: BusinessPartner["kind"]): BusinessPartner {
  const pool = kind === "cliente" ? proposalPartnerNames[company.sector].clients : proposalPartnerNames[company.sector].suppliers;
  const available = pool.filter(([name]) => !(company.partners ?? []).some((partner) => partner.name === name));
  const chosen = (available.length ? available : pool)[(week + company.id * 3) % (available.length || pool.length)];
  const seed = week * 11 + company.id * 17 + (kind === "cliente" ? 3 : 7);
  const weeklyValue = kind === "cliente" ? 11000 + seed % 17000 : 3200 + seed % 7200;
  return {
    id: `proposal-${company.id}-${week}-${kind}`,
    name: chosen[0], representative: chosen[1], kind,
    personality: (["leal", "exigente", "oportunista", "conservador", "inovador"] as BusinessPartner["personality"][])[seed % 5],
    weeklyValue, proposedValue: weeklyValue, proposedWeeks: 12 + seed % 14,
    trust: 48 + seed % 30, dependency: 22 + seed % 48, weeksLeft: 0,
    status: "proposta", proposalType: seed % 4 === 0 ? "exclusividade" : seed % 3 === 0 ? "concorrente" : "novo",
    proposalExpiresWeek: week + 4,
    signedWeek: 0, lastNegotiationWeek: 0, relationshipCooldownUntil: 0, failedRenegotiations: 0,
    lastEvent: `${chosen[1]} apresentou uma proposta válida por quatro semanas.`,
  };
}

function syncHoldingFactions(state: GameState, sourceCompanies = state.companies): HoldingFaction[] {
  const companies = sourceCompanies.filter((company) => !company.sold && !company.bankrupt && !company.closed);
  const old = new Map((state.factions ?? []).map((faction) => [faction.id, faction]));
  const unique = (names: (string | undefined)[]) => [...new Set(names.filter((name): name is string => Boolean(name)))];
  const employees = companies.flatMap((company) => company.employees);
  const investors = companies.flatMap((company) => company.investors ?? []);
  const definitions: { id: string; name: string; agenda: FactionAgenda; members: string[] }[] = [
    { id: "expansionistas", name: "Bloco Expansionista", agenda: "crescimento", members: unique([...companies.filter((company) => company.ceoStyle === "crescimento").map((company) => company.ceo), ...employees.filter((employee) => employee.trait === "Competitivo").map((employee) => employee.name)]) },
    { id: "guardioes", name: "Guardiões do Caixa", agenda: "seguranca", members: unique([...companies.filter((company) => company.ceoStyle === "eficiencia").map((company) => company.ceo), ...investors.filter((investor) => investor.name.toLowerCase().includes("banco")).map((investor) => investor.representative)]) },
    { id: "inovadores", name: "Liga da Inovação", agenda: "inovacao", members: unique([...companies.filter((company) => company.ceoStyle === "inovacao").map((company) => company.ceo), ...employees.filter((employee) => employee.trait === "Brilhante").map((employee) => employee.name)]) },
    { id: "coalizao-pessoas", name: "Coalizão de Pessoas", agenda: "pessoas", members: unique([...companies.filter((company) => company.ceoStyle === "pessoas").map((company) => company.ceo), ...employees.filter((employee) => ["Diplomático", "Leal"].includes(employee.trait)).map((employee) => employee.name)]) },
    { id: "familia", name: "Núcleo Familiar", agenda: "familia", members: unique((state.heirs ?? []).filter((heir) => heir.status !== "rompido").map((heir) => heir.name)) },
    { id: "acionistas", name: "Frente dos Acionistas", agenda: "retorno", members: unique(investors.map((investor) => investor.representative)) },
  ];
  return definitions.filter((definition) => definition.members.length).map((definition) => {
    const previous = old.get(definition.id);
    const politicalBonus = definition.members.reduce((sum, member) => {
      const company = companies.find((item) => item.ceo === member);
      const heir = (state.heirs ?? []).find((item) => item.name === member);
      return sum + (company?.ceoInfluence ?? 0) / 12 + (heir?.equity ?? 0) / 4;
    }, 0);
    return {
      id: definition.id,
      name: definition.name,
      agenda: definition.agenda,
      members: definition.members.slice(0, 8),
      leader: definition.members.sort((a, b) => a.localeCompare(b))[0],
      power: clamp(18 + definition.members.length * 9 + politicalBonus),
      support: previous?.support ?? 52,
      pressure: previous?.pressure ?? 20,
      agendaWeeks: Math.max(0, (previous?.agendaWeeks ?? 0) - 1),
      lastMove: previous?.lastMove ?? "A facção está organizando membros e observando sua liderança.",
    };
  });
}

function annualSnapshot(state: GameState, companies = state.companies): AnnualSnapshot {
  const operating = companies.filter((company) => !company.sold && !company.bankrupt && !company.closed);
  const metrics = operating.map((company) => companyMetrics(company, state.economy));
  const people = operating.flatMap((company) => company.employees);
  return {
    revenue: metrics.reduce((sum, item) => sum + item.revenue, 0),
    profit: metrics.reduce((sum, item) => sum + item.profit, 0),
    cash: operating.reduce((sum, company) => sum + company.cash, 0),
    customers: operating.reduce((sum, company) => sum + company.customers, 0),
    morale: people.length ? people.reduce((sum, person) => sum + person.morale, 0) / people.length : 0,
    stress: people.length ? people.reduce((sum, person) => sum + (person.stress ?? 0), 0) / people.length : 0,
    debt: operating.reduce((sum, company) => sum + company.debt, 0),
    products: operating.reduce((sum, company) => sum + company.projects.filter((project) => project.kind === "produto" && project.lifecycle === "mercado").length, 0),
    reputation: operating.length ? operating.reduce((sum, company) => sum + company.reputation, 0) / operating.length : 0,
    board: operating.length ? operating.reduce((sum, company) => sum + (company.boardSupport ?? 50), 0) / operating.length : 0,
  };
}

const annualPlanDetails: Record<AnnualPriority, { title: string; promises: string[] }> = {
  crescimento: { title: "Ano da Expansão", promises: ["Aumentar faturamento em 25%", "Ampliar clientes em 20%", "Ganhar 5 pontos de reputação"] },
  rentabilidade: { title: "Ano do Lucro", promises: ["Encerrar o ano com lucro semanal", "Aumentar caixa em 20%", "Alcançar margem operacional de 15%"] },
  pessoas: { title: "Ano das Pessoas", promises: ["Moral média acima de 75%", "Estresse médio abaixo de 55%", "Ganhar 5 pontos de reputação"] },
  inovacao: { title: "Ano da Reinvenção", promises: ["Colocar 2 novos produtos no mercado", "Ganhar 8 pontos de reputação", "Aumentar faturamento em 10%"] },
  consolidacao: { title: "Ano da Solidez", promises: ["Reduzir dívida em 25%", "Aumentar caixa em 15%", "Manter apoio médio do conselho acima de 60%"] },
};

function evaluateAnnualPlan(plan: AnnualPlan, state: GameState): AnnualReview {
  const now = annualSnapshot(state);
  const base = plan.baseline;
  const pct = (current: number, initial: number) => initial === 0 ? (current > 0 ? 100 : 0) : ((current - initial) / Math.abs(initial)) * 100;
  const resultMap: Record<AnnualPriority, { label: string; achieved: boolean; detail: string }[]> = {
    crescimento: [
      { label: "Faturamento +25%", achieved: pct(now.revenue, base.revenue) >= 25, detail: `${pct(now.revenue, base.revenue).toFixed(1)}% no ano` },
      { label: "Clientes +20%", achieved: pct(now.customers, base.customers) >= 20, detail: `${base.customers} → ${now.customers}` },
      { label: "Reputação +5", achieved: now.reputation - base.reputation >= 5, detail: `${(now.reputation - base.reputation).toFixed(1)} pontos` },
    ],
    rentabilidade: [
      { label: "Lucro semanal", achieved: now.profit > 0, detail: money.format(now.profit) },
      { label: "Caixa +20%", achieved: pct(now.cash, base.cash) >= 20, detail: `${pct(now.cash, base.cash).toFixed(1)}% no ano` },
      { label: "Margem de 15%", achieved: now.revenue > 0 && now.profit / now.revenue >= .15, detail: `${now.revenue ? ((now.profit / now.revenue) * 100).toFixed(1) : 0}%` },
    ],
    pessoas: [
      { label: "Moral acima de 75%", achieved: now.morale >= 75, detail: `${now.morale.toFixed(1)}%` },
      { label: "Estresse abaixo de 55%", achieved: now.stress <= 55, detail: `${now.stress.toFixed(1)}%` },
      { label: "Reputação +5", achieved: now.reputation - base.reputation >= 5, detail: `${(now.reputation - base.reputation).toFixed(1)} pontos` },
    ],
    inovacao: [
      { label: "2 novos produtos", achieved: now.products - base.products >= 2, detail: `${now.products - base.products} lançados` },
      { label: "Reputação +8", achieved: now.reputation - base.reputation >= 8, detail: `${(now.reputation - base.reputation).toFixed(1)} pontos` },
      { label: "Faturamento +10%", achieved: pct(now.revenue, base.revenue) >= 10, detail: `${pct(now.revenue, base.revenue).toFixed(1)}% no ano` },
    ],
    consolidacao: [
      { label: "Dívida −25%", achieved: base.debt === 0 ? now.debt === 0 : pct(now.debt, base.debt) <= -25, detail: money.format(now.debt) },
      { label: "Caixa +15%", achieved: pct(now.cash, base.cash) >= 15, detail: `${pct(now.cash, base.cash).toFixed(1)}% no ano` },
      { label: "Conselho acima de 60%", achieved: now.board >= 60, detail: `${now.board.toFixed(1)}%` },
    ],
  };
  const results = resultMap[plan.priority];
  const score = Math.round(results.filter((result) => result.achieved).length / results.length * 100);
  const moments = (state.identityHistory ?? []).filter((moment) => moment.week >= plan.startWeek && moment.week <= plan.endWeek);
  const momentValue = (moment: IdentityMoment) => Object.values(moment.changes).reduce((sum, value) => sum + (value ?? 0), 0);
  const ordered = [...moments].sort((a, b) => momentValue(b) - momentValue(a));
  return { year: plan.year, priority: plan.priority, score, verdict: score === 100 ? "Promessas cumpridas" : score >= 67 ? "Ano aprovado com ressalvas" : score >= 34 ? "Resultados abaixo do discurso" : "Promessas quebradas", results, bestDecision: ordered[0]?.reason ?? "Nenhuma decisão se destacou", worstDecision: ordered.at(-1)?.reason ?? "Nenhuma crise marcou o período" };
}

const founderActs = [
  { id: 1, start: 1, end: 12, title: "A primeira aposta", description: "Sobreviver, formar a equipe e provar que a ideia funciona." },
  { id: 2, start: 13, end: 30, title: "Agora dependem de você", description: "Pessoas, salários, clientes e rivalidade deixam tudo pessoal." },
  { id: 3, start: 31, end: 52, title: "O preço do crescimento", description: "Capital, promessas e decisões começam a cobrar juros." },
  { id: 4, start: 53, end: 80, title: "Construindo um império", description: "Holding, CEOs, aquisições e poder político entram em cena." },
  { id: 5, start: 81, end: 110, title: "Tudo cobra seu preço", description: "Crises, lealdades e arrependimentos testam o que foi construído." },
  { id: 6, start: 111, end: 130, title: "Como será lembrado?", description: "O fundador prepara sua última grande decisão e encara o legado." },
];

const founderAct = (week: number) => founderActs.find((act) => week >= act.start && week <= act.end) ?? founderActs[founderActs.length - 1];

const endingDetails: Record<FounderEnding, { title: string; description: string }> = {
  querido: { title: "O Fundador Querido", description: "Você construiu resultados sem transformar pessoas em peças descartáveis." },
  bilionario: { title: "O Bilionário Solitário", description: "O patrimônio venceu todas as metas — e cobrou relações que dinheiro não recompra." },
  visionario: { title: "O Visionário", description: "Produtos e apostas improváveis mudaram a forma como o mercado enxerga seu setor." },
  negociador: { title: "O Grande Negociador", description: "Você fez do outro lado da mesa o lugar mais perigoso do jogo." },
  sobrevivente: { title: "O Sobrevivente", description: "Falências, crises e erros não foram suficientes para encerrar sua história." },
  deposto: { title: "O CEO Deposto", description: "Você criou um império poderoso o bastante para decidir que não precisava mais de você." },
  dinastia: { title: "A Dinastia", description: "O maior produto da sua carreira foi uma organização capaz de continuar sem seu fundador." },
  controverso: { title: "A Lenda Controversa", description: "Os resultados são incontestáveis. A forma como você chegou até eles continuará dividindo opiniões." },
};

const legacyPathDetails: Record<FounderLegacyPath, { title: string; description: string }> = {
  duradouro: { title: "Uma dinastia duradoura", description: "A holding atravessa gerações, preserva relevância e amplia seu impacto." },
  ambivalente: { title: "Um império ambivalente", description: "O patrimônio continua, mas mercado e família discordam sobre o preço desse legado." },
  ruptura: { title: "A ruptura do legado", description: "Conflitos, decisões frágeis ou falta de sucessão encurtam a história do grupo." },
};

function determineFounderEnding(state: GameState): FounderEnding {
  const identity = state.leadershipIdentity ?? initialLeadershipIdentity;
  const personal = state.founderPersonal ?? { health: 80, family: 70, satisfaction: 60, ego: 40, regrets: 10 };
  const operating = state.companies.filter((company) => !company.sold && !company.bankrupt && !company.closed);
  const empire = state.personalCash + operating.reduce((sum, company) => sum + companyMetrics(company, state.economy).valuation, 0);
  const readyHeir = (state.heirs ?? []).some((heir) => heir.id === state.chosenSuccessorId && heir.readiness >= 60);
  if (readyHeir && operating.length >= 2) return "dinastia";
  if (operating.some((company) => company.ceo !== (state.playerExecutive ?? state.founder) && (company.boardSupport ?? 50) < 35)) return "deposto";
  if (state.companies.filter((company) => company.bankrupt).length >= 1 && operating.length) return "sobrevivente";
  if (empire >= 15000000 && personal.family < 45) return "bilionario";
  if (identity.integridade < 38 || (identity.agressividade > 75 && personal.regrets > 45)) return "controverso";
  if (identity.visao >= 68) return "visionario";
  if (identity.negociacao >= 68 || state.companies.filter((company) => company.sold || company.origin === "adquirida").length >= 3) return "negociador";
  return "querido";
}

function founderLegacyChances(state: GameState): Record<FounderLegacyPath, number> {
  const identity = state.leadershipIdentity ?? initialLeadershipIdentity;
  const personal = state.founderPersonal ?? { health: 80, family: 70, satisfaction: 60, ego: 40, regrets: 10 };
  const heirs = state.heirs ?? [];
  const operating = state.companies.filter((company) => !company.sold && !company.bankrupt && !company.closed);
  const heirReadiness = heirs.length ? heirs.reduce((sum, heir) => sum + heir.readiness, 0) / heirs.length : 25;
  const boardSupport = operating.length ? operating.reduce((sum, company) => sum + (company.boardSupport ?? 50), 0) / operating.length : 30;
  const profitable = operating.filter((company) => companyMetrics(company, state.economy).profit >= 0).length;
  const bankruptcies = state.companies.filter((company) => company.bankrupt).length;
  const successionBonus = heirs.some((heir) => heir.id === state.chosenSuccessorId && heir.readiness >= 60) ? 18 : 0;
  const durableRaw = Math.max(8, 18 + personal.family * .24 + (state.familyUnity ?? 70) * .18 + identity.integridade * .15 + heirReadiness * .16 + boardSupport * .09 + profitable * 5 + successionBonus - bankruptcies * 9 - personal.regrets * .1);
  const ambivalentRaw = Math.max(8, 30 + identity.visao * .08 + identity.negociacao * .1 + identity.agressividade * .12 + Math.abs(55 - personal.family) * .12 + state.companies.filter((company) => company.sold).length * 3);
  const ruptureRaw = Math.max(8, 14 + (100 - personal.family) * .23 + (100 - (state.familyUnity ?? 70)) * .18 + (100 - identity.integridade) * .12 + (100 - heirReadiness) * .13 + (100 - boardSupport) * .1 + bankruptcies * 11 + personal.regrets * .14 - successionBonus * .45);
  const total = durableRaw + ambivalentRaw + ruptureRaw;
  const duradouro = Math.floor(durableRaw / total * 100);
  const ruptura = Math.floor(ruptureRaw / total * 100);
  return { duradouro, ambivalente: 100 - duradouro - ruptura, ruptura };
}

function createFounderLegacyOutcome(state: GameState): FounderLegacyOutcome {
  const chances = founderLegacyChances(state);
  const roll = Math.random() * 100;
  const path: FounderLegacyPath = roll < chances.duradouro
    ? "duradouro"
    : roll < chances.duradouro + chances.ambivalente
      ? "ambivalente"
      : "ruptura";
  const identity = state.leadershipIdentity ?? initialLeadershipIdentity;
  const personal = state.founderPersonal ?? { health: 80, family: 70, satisfaction: 60, ego: 40, regrets: 10 };
  const operating = state.companies.filter((company) => !company.sold && !company.bankrupt && !company.closed);
  const currentGeneration = state.generation ?? 1;
  const readyHeirs = (state.heirs ?? []).filter((heir) => heir.readiness >= 55).length;
  const bankruptcies = state.companies.filter((company) => company.bankrupt).length;
  const baseValue = Math.max(100000, state.personalCash + operating.reduce((sum, company) => sum + companyMetrics(company, state.economy).valuation, 0));
  const generation = path === "duradouro"
    ? currentGeneration + 2 + Math.floor(Math.random() * 3) + Math.min(1, readyHeirs)
    : path === "ambivalente"
      ? currentGeneration + 1 + Math.floor(Math.random() * 3)
      : currentGeneration + (Math.random() < .38 ? 1 : 0);
  const multiplier = path === "duradouro"
    ? 2.2 + Math.random() * 3.8 + readyHeirs * .35
    : path === "ambivalente"
      ? .9 + Math.random() * 2.1
      : .18 + Math.random() * .72;
  const financialValue = Math.round(baseValue * multiplier / 10000) * 10000;
  const currentReach = state.companies.reduce((sum, company) => sum + company.customers + company.employees.length * 25, 0);
  const peopleImpacted = Math.round(Math.max(250, currentReach * (generation + 1) * (path === "duradouro" ? 5 + Math.random() * 6 : path === "ambivalente" ? 2 + Math.random() * 4 : .7 + Math.random() * 1.5)) / 100) * 100;
  const mixedImpact = (state.reputation + identity.visao + identity.integridade) / 3 - personal.regrets * .55 - (100 - personal.family) * .24 + Math.random() * 16 - 8;
  const impactScore = path === "duradouro"
    ? Math.round(clamp((state.reputation + identity.integridade + identity.pessoas + personal.family) / 4 + Math.random() * 14, 20, 95))
    : path === "ambivalente"
      ? Math.round(clamp(mixedImpact, -55, 70))
      : -Math.round(clamp((100 - personal.family) * .38 + (100 - identity.integridade) * .3 + bankruptcies * 13 + Math.random() * 20, 25, 95));
  const impactTone: FounderLegacyOutcome["impactTone"] = impactScore >= 8 ? "positivo" : "negativo";
  const drivers = [
    personal.family >= 62 ? `família próxima (${Math.round(personal.family)}%)` : `família fragilizada (${Math.round(personal.family)}%)`,
    readyHeirs ? `${readyHeirs} herdeiro${readyHeirs > 1 ? "s" : ""} preparado${readyHeirs > 1 ? "s" : ""}` : "nenhum herdeiro plenamente preparado",
    identity.integridade >= 60 ? `integridade reconhecida (${Math.round(identity.integridade)}%)` : `integridade questionada (${Math.round(identity.integridade)}%)`,
    bankruptcies ? `${bankruptcies} falência${bankruptcies > 1 ? "s" : ""} no histórico` : `${operating.length} empresa${operating.length !== 1 ? "s" : ""} em operação`,
  ];
  const consequence = path === "duradouro"
    ? personal.family >= 62
      ? "A família transformou o sobrenome em responsabilidade compartilhada, e não apenas em direito ao poder."
      : "A governança sobreviveu mesmo às relações pessoais imperfeitas e impediu que o grupo dependesse de uma única pessoa."
    : path === "ambivalente"
      ? personal.family < 50
        ? "O patrimônio cresceu por mais tempo que a proximidade entre os herdeiros; cada geração contou uma versão diferente sobre o fundador."
        : "Produtos e aquisições mantiveram o nome vivo, mas as escolhas agressivas dividiram funcionários, clientes e a própria família."
      : readyHeirs === 0
        ? "Sem uma sucessão preparada, o poder virou disputa e partes importantes da holding foram vendidas ou perderam relevância."
        : "Conflitos internos e decisões acumuladas consumiram a confiança necessária para manter o grupo unido.";
  const toneSentence = impactTone === "positivo"
    ? `Seu impacto foi lembrado de forma positiva, com índice histórico de +${Math.abs(impactScore)}.`
    : `Seu impacto foi lembrado de forma negativa, com índice histórico de -${Math.abs(impactScore)}.`;
  return {
    path,
    probability: chances[path],
    title: legacyPathDetails[path].title,
    generation,
    financialValue,
    peopleImpacted,
    impactScore,
    impactTone,
    narrative: `O legado de ${state.founder}, que iniciou a holding ${state.holdingName ?? "Grupo Horizonte"}, chegou até a geração ${generation}, movimentou mais de ${compact.format(financialValue)} e impactou aproximadamente ${peopleImpacted.toLocaleString("pt-BR")} pessoas. ${toneSentence} ${consequence}`,
    drivers,
  };
}

const mentorComment = (state: GameState) => {
  const personal = state.founderPersonal ?? { health: 80, family: 70, satisfaction: 60, ego: 40, regrets: 10 };
  const cash = state.companies.find((company) => company.id === state.activeCompanyId)?.cash ?? 0;
  if (cash < 0) return "Helena: ‘Seu caixa está negativo. No LinkedIn isso provavelmente se chama fase de investimento.’";
  if (personal.health < 40) return "Helena: ‘Você não pode delegar o próprio sistema cardiovascular. Eu já consultei o jurídico.’";
  if (personal.family < 40) return "Helena: ‘A holding sabe sua agenda de cor. Sua família ainda está esperando uma cópia.’";
  if ((state.factions ?? []).some((faction) => faction.support < 25)) return "Helena: ‘Parabéns: você uniu a empresa. Infelizmente, foi contra você.’";
  if (state.week >= 111) return "Helena: ‘Construir foi difícil. Agora tente sair sem transformar a aposentadoria em uma reunião de seis horas.’";
  return "Helena: ‘A boa notícia é que todos têm um plano. A má notícia é que nenhum deles é o mesmo.’";
};

const updateFounderPersonal = (state: GameState, changes: Partial<FounderPersonal>, moment: CareerMoment): GameState => ({
  ...state,
  founderPersonal: Object.entries(changes).reduce((personal, [key, delta]) => ({ ...personal, [key]: clamp(personal[key as keyof FounderPersonal] + (delta ?? 0)) }), { ...(state.founderPersonal ?? { health: 82, family: 72, satisfaction: 60, ego: 38, regrets: 8 }) }),
  careerMoments: [moment, ...(state.careerMoments ?? [])].slice(0, 30),
  lastPersonalEventWeek: state.week,
});

function founderPersonalMessage(state: GameState): StoryMessage {
  const variant = Math.floor(state.week / 13) % 6;
  const data = [
    { subject: "Você prometeu que estaria lá", body: "Um compromisso familiar importante caiu no mesmo horário da maior reunião comercial do trimestre.", choices: [
      ["Ir ao compromisso familiar", "Você perdeu a reunião, mas apareceu quando sua família precisava.", { family: 14, satisfaction: 5, ego: -2 }, "Família antes da reunião"],
      ["Ficar na negociação", "O contrato avançou. Em casa, ninguém quis saber do valuation.", { family: -13, ego: 5, regrets: 8 }, "Negócios antes da família"],
      ["Mandar o CEO e chegar atrasado", "Nada ficou perfeito, mas você evitou escolher apenas um lado.", { family: 4, satisfaction: 3 }, "Tentativa de conciliar tudo"],
    ] },
    { subject: "Seu médico usou a palavra ‘imediatamente’", body: "O corpo começou a enviar relatórios que não aceitam maquiagem contábil.", choices: [
      ["Tirar uma semana de descanso", "A empresa sobreviveu sem você. Seu ego recebeu a notícia com dificuldade.", { health: 15, satisfaction: 5, ego: -4 }, "Primeira pausa de verdade"],
      ["Reduzir reuniões e delegar", "A agenda melhorou e um CEO descobriu que autonomia também inclui problemas.", { health: 8, satisfaction: 3 }, "Delegação por recomendação médica"],
      ["Ignorar e continuar", "Você ganhou tempo na empresa e perdeu saúde fora dela.", { health: -14, ego: 5, regrets: 5 }, "Aviso de saúde ignorado"],
    ] },
    { subject: "Querem entregar a você o prêmio ‘Líder do Amanhã’", body: "Helena observou que o amanhã já foi remarcado três vezes por conflito de agenda.", choices: [
      ["Aceitar e agradecer à equipe", "O discurso dividiu o mérito e fortaleceu a relação com as pessoas.", { satisfaction: 7, ego: 3 }, "Prêmio compartilhado com a equipe"],
      ["Transformar o palco em propaganda", "A marca ganhou atenção. A modéstia pediu demissão.", { ego: 12, satisfaction: 3 }, "Premiação transformada em campanha"],
      ["Recusar a cerimônia", "O mercado chamou de sobriedade. Helena chamou de medo de discurso.", { ego: -3, satisfaction: 2 }, "Prêmio empresarial recusado"],
    ] },
    { subject: "A empresa precisa de garantia pessoal", body: "O banco aceita liberar recursos se você colocar seu patrimônio pessoal na mesa.", choices: [
      ["Assinar a garantia", "Você protegeu a operação e levou o risco para casa.", { family: -7, health: -4, ego: 4 }, "Patrimônio pessoal colocado em risco"],
      ["Recusar e cortar o plano", "A empresa cresceu menos, mas a madrugada ficou um pouco mais silenciosa.", { family: 5, satisfaction: -2 }, "Limite entre empresa e patrimônio"],
      ["Negociar uma garantia menor", "O banco cedeu o suficiente para todos fingirem que venceram.", { satisfaction: 4, ego: 2 }, "Garantia pessoal renegociada"],
    ] },
    { subject: "Um ex-funcionário escreveu sobre você", body: "O texto viralizou. Algumas lembranças são generosas; outras parecem ter sido revisadas por advogados.", choices: [
      ["Procurar a pessoa em particular", "A conversa não apagou o passado, mas corrigiu parte dele.", { regrets: -8, satisfaction: 5, ego: -3 }, "Reconciliação com antigo funcionário"],
      ["Responder publicamente", "Você venceu alguns comentários e perdeu o resto da tarde.", { ego: 8, regrets: 4 }, "Discussão pública com ex-funcionário"],
      ["Não responder", "O ciclo de notícias passou. A lembrança ficou.", { regrets: 2, ego: -1 }, "Silêncio diante de crítica pública"],
    ] },
    { subject: "Helena marcou uma reunião sobre o excesso de reuniões", body: "A pauta tem 47 slides e um intervalo estratégico para discutir por que ninguém consegue trabalhar.", choices: [
      ["Cancelar metade das reuniões", "A produtividade subiu e três gerentes precisaram descobrir um novo hobby.", { health: 5, satisfaction: 8 }, "Guerra contra reuniões inúteis"],
      ["Criar um comitê de eficiência", "O comitê agendou uma reunião semanal para acompanhar a redução de reuniões.", { ego: 3, regrets: 2 }, "Comitê para reduzir comitês"],
      ["Manter tudo como está", "A agenda permaneceu cheia e a empresa continuou confundindo movimento com progresso.", { health: -4, satisfaction: -5 }, "Calendário corporativo venceu"],
    ] },
  ][variant];
  return { id: `founder-personal-${state.week}`, from: "Helena Duarte", role: "Mentora e consciência não solicitada", initials: "HD", color: "#efad55", subject: data.subject, body: data.body, choices: data.choices.map(([label, result, changes, title]) => ({ label: label as string, result: result as string, effect: (game: GameState) => updateFounderPersonal(game, changes as Partial<FounderPersonal>, { week: game.week, title: title as string, detail: result as string, tone: Object.values(changes as Record<string, number>).reduce((sum, value) => sum + value, 0) >= 0 ? "positivo" : "negativo" }) })) };
}

function nemesisStoryMessage(rival: Competitor, state: GameState): StoryMessage {
  const variant = Math.floor(state.week / 22) % 3;
  const subjects = ["Seu rival comprou um anúncio só para provocar você", "Uma parceria que ninguém esperava", "Ele quer contratar alguém da sua equipe"];
  const bodies = [
    `${rival.founder}, da ${rival.name}, publicou: “Alguns constroem empresas. Outros constroem telas para explicar por que o caixa caiu.” Helena quer saber se deve responder ou emoldurar.`,
    `${rival.founder} propõe uma parceria temporária. Segundo ele, “não é amizade; é uma pausa comercialmente eficiente na hostilidade”.`,
    `${rival.name} abordou um dos seus melhores profissionais. ${rival.founder} garante que foi coincidência — aparentemente usando uma apresentação com seu logotipo riscado.`,
  ];
  const changeRival = (game: GameState, relation: number, relationship: Competitor["relationship"], note: string) => ({
    ...game,
    competitors: game.competitors.map((item) => item.id === rival.id ? { ...item, relation: clamp((item.relation ?? 0) + relation, -100, 100), relationship, lastDecision: note, history: [`Semana ${game.week}: ${note}.`, ...(item.history ?? [])].slice(0, 8) } : item),
    careerMoments: [{ week: game.week, title: `Novo capítulo com ${rival.name}`, detail: note, tone: relation >= 0 ? "positivo" as const : "negativo" as const }, ...(game.careerMoments ?? [])].slice(0, 30),
  });
  return {
    id: `nemesis-${rival.id}-${state.week}`,
    from: rival.founder,
    role: `Fundador da ${rival.name} · rival principal`,
    initials: rival.founder.split(" ").map((part) => part[0]).join("").slice(0, 2),
    color: "#ca7b83",
    subject: subjects[variant],
    body: bodies[variant],
    choices: [
      { label: "Responder publicamente", result: "A rivalidade voltou às manchetes e os dois fundadores ganharam atenção.", effect: (game) => evolveIdentity(changeRival(game, -12, "rival", "A troca de provocações virou campanha pública"), { agressividade: 3 }, `resposta a ${rival.founder}`) },
      { label: "Propor uma conversa reservada", result: "A hostilidade diminuiu. Nenhum dos dois admitirá isso em público.", effect: (game) => evolveIdentity(changeRival(game, 15, "parceiro", "Os fundadores negociaram uma trégua"), { negociacao: 3, prudencia: 1 }, `trégua com ${rival.founder}`) },
      { label: "Ignorar e entregar resultado", result: "Sem resposta, a provocação envelheceu pior que a campanha do rival.", effect: (game) => evolveIdentity(changeRival(game, -3, rival.relationship ?? "neutro", "A provocação foi ignorada"), { prudencia: 2, agressividade: -1 }, `silêncio diante de ${rival.founder}`) },
    ],
  };
}

type NewsRepercussion = {
  score: number;
  intensity: "baixa" | "moderada" | "forte" | "extrema";
  marketReaction: string;
  outlook: string;
  comments: { name: string; role: string; initials: string; text: string; tone: "positivo" | "neutro" | "negativo" }[];
};

function newsRepercussion(item: NewsItem): NewsRepercussion {
  const seed = Math.abs(
    item.headline.split("").reduce((sum, char) => sum + char.charCodeAt(0), item.id + item.week),
  );
  const direction = item.impact === "positivo" ? 1 : item.impact === "negativo" ? -1 : 0;
  const magnitude = direction === 0 ? 1 + (seed % 4) : 5 + (seed % 16);
  const score = direction * magnitude;
  const intensity = magnitude >= 18 ? "extrema" : magnitude >= 12 ? "forte" : magnitude >= 6 ? "moderada" : "baixa";
  const lower = `${item.headline} ${item.body}`.toLowerCase();
  const isIntegrity = /fraude|auditor|denúncia|escândalo|irregular|vazamento/.test(lower);
  const isPeople = item.category === "pessoas" || /funcion|equipe|ceo|fundador/.test(lower);
  const isDeal = /compra|vende|aquisi|fusão|incorpora|parceria/.test(lower);
  const pick = <T,>(items: T[], offset = 0) => items[(seed + offset) % items.length];
  const marketReaction = isIntegrity
    ? direction < 0
      ? "Investidores elevaram a percepção de risco, clientes pediram explicações e executivos do setor passaram a discutir controles internos."
      : "A resposta transparente reduziu rumores, embora investidores ainda aguardem provas de que os controles foram corrigidos."
    : isDeal
      ? direction < 0
        ? "O mercado interpretou a operação como defensiva. Analistas questionam preço, integração e capacidade de execução."
        : "A operação foi vista como sinal de força. Concorrentes revisaram estratégias e investidores passaram a comparar valuations."
      : isPeople
        ? direction < 0
          ? "A notícia circulou entre profissionais e recrutadores. O risco de perda de talentos aumentou e a liderança ficou sob pressão."
          : "A reação interna foi favorável e a empresa ganhou visibilidade entre profissionais que consideram mudar de emprego."
        : item.impact === "positivo"
          ? "Clientes demonstraram mais confiança, enquanto concorrentes tentam entender se o movimento representa uma mudança duradoura."
          : item.impact === "negativo"
            ? "Empresas do setor adotaram cautela, clientes postergaram decisões e analistas reduziram as expectativas de curto prazo."
            : "O mercado recebeu a notícia com cautela. Ainda não existe consenso sobre quem será beneficiado ou prejudicado.";
  const outlook = pick(item.impact === "positivo"
    ? [
        "Se o resultado se sustentar, a reputação pode se converter em clientes, talentos e melhores condições de capital.",
        "A próxima prova será operacional: transformar a atenção recebida em margem e recorrência sem perder qualidade.",
        "Concorrentes devem responder nas próximas semanas; preservar a vantagem exigirá investimento e boa execução.",
      ]
    : item.impact === "negativo"
      ? [
          "Sem uma resposta clara, o assunto pode voltar ao noticiário e ampliar perdas comerciais, políticas e reputacionais.",
          "Clientes e investidores observarão os próximos dois ciclos antes de decidir se o episódio foi isolado.",
          "A velocidade da correção será mais importante que a promessa: o mercado agora procura evidências concretas.",
        ]
      : [
          "A próxima decisão das empresas envolvidas definirá se o episódio será esquecido ou ganhará importância.",
          "Indicadores de demanda, crédito e emprego dirão se essa cautela é passageira ou o começo de uma tendência.",
          "O mercado permanece dividido; quem agir cedo pode capturar a oportunidade, mas também assumir o maior risco.",
        ], 3);
  const analystText = pick(item.impact === "positivo"
    ? [
        "O movimento melhora a narrativa, mas agora os números precisam confirmar a expectativa criada.",
        "Existe valor real aqui, desde que a companhia não confunda entusiasmo do mercado com lucro recorrente.",
        "A percepção virou a favor da empresa; a próxima divulgação precisa mostrar execução no mesmo nível.",
        "É um sinal construtivo, embora preço, margem e capacidade de entrega ainda precisem ser observados.",
      ]
    : item.impact === "negativo"
      ? [
          "O impacto não está apenas no caixa. O mercado passou a cobrar um prêmio maior pelo risco.",
          "A incerteza pesa mais que a perda imediata; investidores querem prazo, responsável e plano de correção.",
          "O problema pode ser administrável, mas o silêncio aumentaria muito o custo de recuperar confiança.",
          "A tese de crescimento ficou mais frágil e agora cada indicador será analisado com menos tolerância.",
        ]
      : [
          "Ainda faltam dados para separar uma mudança estrutural de um ruído passageiro.",
          "Há argumentos nos dois lados; a confirmação deve vir de demanda, margens e acesso a crédito.",
          "Não é hora de mudar projeções, mas seria imprudente ignorar o sinal.",
          "O cenário abriu possibilidades, sem oferecer ainda convicção suficiente para uma aposta maior.",
        ], 7);
  const publicText = pick(isPeople
    ? item.impact === "negativo"
      ? [
          "Aqui dentro todos querem saber o que a liderança fará, não apenas o que será dito à imprensa.",
          "A equipe aguenta pressão, mas precisa de prioridades claras e decisões que não mudem toda semana.",
          "O rumor correu antes do comunicado. A confiança depende de transparência daqui para frente.",
        ]
      : [
          "Pela primeira vez em semanas, a equipe sentiu que o mercado reconheceu nosso trabalho.",
          "O clima melhorou, mas as pessoas esperam que o reconhecimento também apareça nas condições de trabalho.",
          "A notícia trouxe orgulho para a equipe e aumentou a procura pelas vagas abertas.",
        ]
    : item.impact === "negativo"
      ? [
          "Como cliente, eu esperaria uma explicação antes de renovar qualquer contrato.",
          "Não quero promessa genérica; preciso saber como isso afeta prazo, preço e suporte.",
          "Já pedi uma reunião com o fornecedor. Se não houver segurança, vamos avaliar alternativas.",
        ]
      : [
          "A notícia chamou atenção, mas a experiência real com o produto ainda será o teste decisivo.",
          "Se a entrega acompanhar o anúncio, existe espaço para ampliar nosso contrato.",
          "É positivo, embora clientes empresariais valorizem consistência mais do que manchetes.",
        ], 13);
  const rivalText = pick(item.impact === "positivo"
    ? [
        "Eles ganharam espaço, mas crescimento rápido também cria pontos fracos que pretendemos explorar.",
        "O movimento exige resposta. Estamos revendo preço, produto e abordagem comercial.",
        "Reconhecemos o avanço, mas ainda temos escala e relacionamento para defender nossa posição.",
      ]
    : item.impact === "negativo"
      ? [
          "Toda crise de um concorrente abre espaço para conquistar clientes e talentos.",
          "Nossas equipes comerciais já receberam orientação para abordar contas expostas ao problema.",
          "Não subestimamos o rival, mas este episódio muda o equilíbrio das próximas negociações.",
        ]
      : [
          "Estamos acompanhando. Por enquanto, não existe motivo para alterar nossa estratégia.",
          "O setor inteiro está recalculando riscos; preferimos esperar dados antes de reagir.",
          "Pode ser oportunidade ou distração. Nossa prioridade continua sendo execução.",
        ], 19);
  const analysts = [
    ["Fernanda Reis", "Analista da Orbe Capital", "FR"],
    ["Caio Brandão", "Economista da Prisma Research", "CB"],
    ["Helena Motta", "Gestora da Aurora Investimentos", "HM"],
    ["Rafael Siqueira", "Analista da Ponte Mercados", "RS"],
    ["Lívia Andrade", "Estrategista da Norte Capital", "LA"],
    ["Otávio Leme", "Consultor de risco empresarial", "OL"],
  ];
  const publicVoices = isPeople
    ? [
        ["Relato interno", "Funcionário sob anonimato", "RI"],
        ["Aline Castro", "Líder de equipe", "AC"],
        ["Bruno Tavares", "Profissional do setor", "BT"],
        ["Coletivo de funcionários", "Nota enviada à redação", "CF"],
      ]
    : [
        ["Marcos Nunes", "Cliente empresarial", "MN"],
        ["Júlia Freire", "Empreendedora e cliente", "JF"],
        ["Renato Diniz", "Diretor de compras", "RD"],
        ["Patrícia Lima", "Representante de consumidores", "PL"],
      ];
  const rivalVoices = [
    ["Direção concorrente", "Executivo do mesmo setor", "DC"],
    ["Executivo sob reserva", "Liderança de uma rival", "ER"],
    ["Câmara setorial", "Representação da indústria", "CS"],
    ["Mesa de estratégia", "Consultoria de concorrência", "ME"],
    ["Fornecedor do setor", "Parceiro de diversas empresas", "FS"],
  ];
  const analyst = pick(analysts, 23);
  const publicVoice = pick(publicVoices, 29);
  const rival = pick(rivalVoices, 31);
  return {
    score,
    intensity,
    marketReaction,
    outlook,
    comments: [
      { name: analyst[0], role: analyst[1], initials: analyst[2], text: analystText, tone: item.impact },
      { name: publicVoice[0], role: publicVoice[1], initials: publicVoice[2], text: publicText, tone: item.impact },
      { name: rival[0], role: rival[1], initials: rival[2], text: rivalText, tone: item.impact === "positivo" ? "negativo" : item.impact === "negativo" ? "positivo" : "neutro" },
    ],
  };
}

type WorldNewsDefinition = {
  topic: string;
  category: NewsItem["category"];
  impact: NewsItem["impact"];
  scope: NonNullable<NewsItem["scope"]>;
  cycles?: Economy["cycle"][];
  sectors?: Sector[];
  sources: string[];
  headlines: string[];
  bodies: string[];
  tags: string[];
};

const worldNewsCatalog: WorldNewsDefinition[] = [
  { topic: "inflacao-insumos", category: "economia", impact: "negativo", scope: "nacional", cycles: ["inflacao", "credito"], sources: ["Instituto Nacional de Custos", "Boletim Macro Prisma", "Observatório de Preços"], headlines: ["Insumos empresariais acumulam nova alta e pressionam margens", "Custos avançam antes dos preços ao consumidor", "Empresas renegociam contratos após salto nos insumos"], bodies: ["Materiais, serviços terceirizados e energia ficaram mais caros. Pequenas empresas têm menos espaço para absorver o aumento.", "Fornecedores reduziram prazos de validade das propostas e passaram a exigir reajustes mais frequentes.", "Analistas esperam repasses graduais, mas alertam que clientes já demonstram resistência a novos aumentos."], tags: ["custos", "margem", "preços"] },
  { topic: "credito-restrito", category: "economia", impact: "negativo", scope: "nacional", cycles: ["credito", "recessao"], sources: ["Banco Central Empresarial", "Associação de Crédito Produtivo", "Relatório Ponte Financeira"], headlines: ["Bancos endurecem análise para capital de giro", "Crédito empresarial fica mais caro e seletivo", "Empresas adiam expansão após restrição bancária"], bodies: ["Instituições passaram a exigir garantias maiores e histórico mais longo de geração de caixa.", "Negócios endividados enfrentam renovação mais cara, enquanto empresas líquidas ganham poder de negociação.", "Fundos privados enxergam oportunidade para exigir participação em companhias sem acesso aos bancos."], tags: ["crédito", "juros", "caixa"] },
  { topic: "credito-competitivo", category: "economia", impact: "positivo", scope: "nacional", cycles: ["expansao", "estavel"], sources: ["Federação dos Bancos", "Painel de Crédito Aurora", "Agência Mercado & Capital"], headlines: ["Bancos disputam empresas com bom histórico de caixa", "Linhas de expansão voltam a ganhar prazo", "Crédito produtivo melhora para negócios bem avaliados"], bodies: ["Instituições reduziram spreads para empresas com baixa inadimplência e governança consistente.", "O mercado voltou a oferecer financiamento de longo prazo, embora mantenha cláusulas de desempenho.", "Analistas recomendam comparar custo financeiro e perda de autonomia antes de aceitar recursos."], tags: ["crédito", "expansão", "bancos"] },
  { topic: "consumo-preco", category: "mercado", impact: "negativo", scope: "nacional", cycles: ["inflacao", "recessao"], sources: ["Instituto Voz do Consumidor", "Pesquisa Varejo Real", "DataMercado Brasil"], headlines: ["Consumidor compara mais e abandona marcas sem desconto", "Sensibilidade a preço atinge maior nível do ano", "Famílias cortam assinaturas e compras por impulso"], bodies: ["Clientes estão trocando marcas conhecidas por alternativas mais baratas e adiando decisões não essenciais.", "Programas de fidelidade perderam força quando não oferecem economia imediatamente percebida.", "Empresas com preços transparentes e versões de entrada retiveram mais clientes que concorrentes premium."], tags: ["consumo", "preço", "demanda"] },
  { topic: "consumo-premium", category: "mercado", impact: "positivo", scope: "setorial", cycles: ["expansao", "estavel"], sources: ["Painel de Tendências Íris", "Revista Consumo", "Observatório de Marcas"], headlines: ["Clientes voltam a pagar mais por experiência confiável", "Qualidade e atendimento superam desconto na decisão de compra", "Marcas bem avaliadas ampliam vantagem sobre ofertas genéricas"], bodies: ["Pesquisa mostra que consumidores aceitam preços maiores quando percebem suporte, durabilidade e reputação.", "Avaliações públicas passaram a influenciar mais que campanhas de desconto na escolha final.", "Empresas com atendimento consistente registraram mais indicações e menor abandono."], tags: ["consumo", "marca", "qualidade"] },
  { topic: "ia-produtividade", category: "mercado", impact: "positivo", scope: "setorial", sectors: ["Tecnologia", "Agência", "Varejo"], sources: ["Fórum Brasileiro de Tecnologia", "Radar Digital", "Centro de Produtividade Aplicada"], headlines: ["Automação reduz tarefas repetitivas em empresas de {sector}", "Ferramentas de inteligência artificial chegam à operação diária", "Setor de {sector} acelera adoção de assistentes digitais"], bodies: ["Empresas relatam ganhos de velocidade, mas ainda discutem qualidade, treinamento e segurança das informações.", "A vantagem inicial apareceu em equipes que redesenharam processos, não apenas compraram ferramentas.", "Profissionais temem substituição enquanto gestores procuram habilidades para supervisionar sistemas automáticos."], tags: ["tecnologia", "automação", "produtividade"] },
  { topic: "ciberataques", category: "mercado", impact: "negativo", scope: "nacional", sources: ["Centro Nacional de Resposta Digital", "Aliança de Segurança Empresarial", "Boletim Rede Segura"], headlines: ["Nova onda de ataques mira empresas médias", "Criminosos digitais exploram fornecedores menos protegidos", "Vazamentos aumentam pressão sobre cadeias empresariais"], bodies: ["Especialistas alertam que acessos de terceiros se tornaram a principal porta de entrada para incidentes.", "Seguradoras elevaram exigências de proteção antes de renovar apólices cibernéticas.", "Clientes corporativos começaram a pedir provas de segurança antes de assinar contratos."], tags: ["segurança", "dados", "risco"] },
  { topic: "talentos-escassos", category: "pessoas", impact: "negativo", scope: "setorial", sources: ["Observatório do Trabalho", "Guia Carreiras", "Associação de Recrutadores"], headlines: ["Falta de profissionais experientes pressiona o setor de {sector}", "Disputa por talentos aumenta propostas e contrapropostas", "Empresas de {sector} perdem profissionais para setores vizinhos"], bodies: ["Especialistas valorizados passaram a receber múltiplas abordagens no mesmo mês.", "Salário deixou de ser o único fator: autonomia, liderança e ritmo de trabalho pesam na decisão.", "Empresas sem plano de carreira enfrentam substituições mais caras e demoradas."], tags: ["talentos", "salários", "retenção"] },
  { topic: "trabalho-flexivel", category: "pessoas", impact: "neutro", scope: "nacional", sectors: ["Tecnologia", "Agência"], sources: ["Instituto Futuro do Trabalho", "Pesquisa Pessoas & Gestão", "Rede de RH Brasil"], headlines: ["Modelo flexível volta ao centro das negociações", "Profissionais trocam salário por autonomia de horário", "Empresas divergem sobre retorno integral ao escritório"], bodies: ["Levantamento encontrou ganhos de retenção, mas também dificuldades de coordenação em equipes mal estruturadas.", "Gestores buscam regras mais claras para avaliar desempenho sem depender de presença física.", "Candidatos passaram a perguntar sobre flexibilidade antes mesmo da faixa salarial."], tags: ["trabalho", "cultura", "retenção"] },
  { topic: "saude-mental", category: "pessoas", impact: "negativo", scope: "nacional", sources: ["Instituto Trabalho Saudável", "Conselho de Gestão Humana", "Pesquisa Bem-Estar"], headlines: ["Afastamentos por esgotamento crescem entre lideranças", "Pressão por metas aumenta pedidos de licença", "Empresas reveem jornadas após avanço do estresse"], bodies: ["Casos se concentram em equipes com mudanças constantes de prioridade e baixa autonomia.", "Especialistas alertam que bônus pontuais não compensam ambientes de cobrança imprevisível.", "Negócios com gestores treinados identificaram sinais mais cedo e reduziram afastamentos longos."], tags: ["estresse", "saúde", "liderança"] },
  { topic: "fornecedor-concentracao", category: "mercado", impact: "negativo", scope: "setorial", sources: ["Confederação de Fornecedores", "Índice de Cadeias Produtivas", "Agência Setorial"], headlines: ["Concentração de fornecedores reduz poder de negociação", "Empresas de {sector} buscam alternativas para insumo essencial", "Dependência de poucos parceiros ameaça continuidade operacional"], bodies: ["Os maiores fornecedores reduziram descontos e passaram a priorizar contratos de longo prazo.", "Empresas menores formam grupos de compra para tentar recuperar escala nas negociações.", "Consultores recomendam testar fornecedores alternativos antes que uma ruptura aconteça."], tags: ["fornecedores", "custos", "operação"] },
  { topic: "logistica-atrasos", category: "mercado", impact: "negativo", scope: "nacional", sectors: ["Varejo", "Alimentação"], sources: ["Painel Logístico Nacional", "Associação de Transportadores", "Boletim Rotas & Cargas"], headlines: ["Atrasos logísticos afetam prazos e estoques", "Transportadoras aplicam taxa emergencial em rotas disputadas", "Empresas revisam estoque após gargalos de distribuição"], bodies: ["Centros de distribuição operam acima da capacidade e entregas urgentes ficaram mais caras.", "Varejistas aumentaram estoques de segurança, imobilizando caixa para evitar rupturas.", "Clientes demonstram menor tolerância a atrasos quando não recebem comunicação antecipada."], tags: ["logística", "estoque", "entrega"] },
  { topic: "energia-custos", category: "economia", impact: "negativo", scope: "regional", sources: ["Câmara de Energia Empresarial", "Observatório de Infraestrutura", "Boletim Energia Hoje"], headlines: ["Conta de energia sobe na região {region}", "Empresas procuram eficiência após reajuste energético", "Tarifas pressionam operações intensivas em energia"], bodies: ["O reajuste terá maior impacto em negócios com operação física e equipamentos de uso contínuo.", "Projetos de eficiência voltaram a disputar orçamento com expansão comercial.", "Contratos de fornecimento de longo prazo ganharam procura, mas exigem compromisso financeiro."], tags: ["energia", "custos", "região"] },
  { topic: "reforma-tributaria", category: "economia", impact: "neutro", scope: "nacional", sources: ["Comitê Tributário Empresarial", "Agência Fiscal Brasil", "Instituto de Estudos Tributários"], headlines: ["Novas regras tributárias exigem revisão de preços e contratos", "Empresas calculam impacto da transição fiscal", "Mudança de impostos cria vencedores e perdedores entre setores"], bodies: ["Contadores alertam que a transição terá fases diferentes e pode alterar créditos, margens e fluxo de caixa.", "Empresas começaram a incluir cláusulas tributárias em contratos mais longos.", "Especialistas recomendam simulações antes de mudar preços ou estrutura societária."], tags: ["tributos", "regulação", "preços"] },
  { topic: "dados-regulacao", category: "economia", impact: "neutro", scope: "nacional", sectors: ["Tecnologia", "Varejo", "Agência"], sources: ["Autoridade de Proteção de Dados", "Fórum de Privacidade", "Boletim Direito Digital"], headlines: ["Fiscalização de dados passa a mirar empresas médias", "Autoridade exige transparência no uso de informações de clientes", "Contratos digitais recebem novas exigências de privacidade"], bodies: ["Empresas terão de explicar coleta, armazenamento e compartilhamento de informações com terceiros.", "Multas não são o único risco: clientes corporativos já incluem auditorias de privacidade em contratos.", "Negócios com processos documentados terão adaptação mais barata que operações informais."], tags: ["dados", "regulação", "compliance"] },
  { topic: "fiscalizacao-trabalho", category: "pessoas", impact: "neutro", scope: "nacional", sources: ["Secretaria de Inspeção do Trabalho", "Boletim Relações Laborais", "Conselho de Empregadores"], headlines: ["Fiscalização trabalhista aumenta foco em jornadas e contratos", "Empresas revisam banco de horas após novas inspeções", "Relações de trabalho entram no radar regulatório"], bodies: ["A fiscalização prioriza jornadas excessivas, terceirização irregular e ausência de registros.", "Empresas com políticas informais correm maior risco de passivos acumulados.", "Especialistas recomendam corrigir práticas antes de uma denúncia ou inspeção."], tags: ["trabalho", "fiscalização", "risco"] },
  { topic: "sustentabilidade-clientes", category: "mercado", impact: "positivo", scope: "setorial", sources: ["Instituto Consumo Responsável", "Radar ESG", "Coalizão de Compras Sustentáveis"], headlines: ["Clientes corporativos passam a exigir metas ambientais", "Sustentabilidade deixa de ser discurso e entra nos contratos", "Empresas transparentes ganham preferência em novas compras"], bodies: ["Compradores começaram a pontuar fornecedores por origem de materiais, energia e descarte.", "Selos genéricos perderam credibilidade; dados verificáveis passaram a valer mais.", "Empresas que se adaptaram cedo relatam acesso a clientes maiores e contratos mais longos."], tags: ["sustentabilidade", "clientes", "contratos"] },
  { topic: "influenciadores-produtos", category: "mercado", impact: "neutro", scope: "nacional", sources: ["Monitor de Redes Pulsar", "Agência Creator Watch", "Relatório Conversas Digitais"], headlines: ["Influenciadores menores superam celebridades em conversão", "Vídeos espontâneos mudam procura por produtos em poucos dias", "Marcas perdem controle sobre a narrativa nas redes"], bodies: ["Conteúdos de nicho geraram menos alcance, mas mais compras e recomendações.", "Campanhas muito roteirizadas despertaram desconfiança entre consumidores mais jovens.", "Empresas rápidas em responder críticas reduziram danos e transformaram dúvidas em demonstrações públicas."], tags: ["redes sociais", "marketing", "reputação"] },
  { topic: "varejo-fluxo", category: "mercado", impact: "positivo", scope: "regional", sectors: ["Varejo", "Alimentação"], sources: ["Índice de Atividade Urbana", "Associação Comercial Regional", "Painel de Mobilidade"], headlines: ["Fluxo comercial cresce na região {region}", "Movimento em áreas comerciais supera projeções", "Eventos locais elevam procura em lojas e restaurantes"], bodies: ["A circulação aumentou principalmente à noite e nos fins de semana.", "Negócios com campanhas geolocalizadas capturaram mais demanda que marcas dependentes de fluxo espontâneo.", "Comerciantes discutem ampliar horários, mas temem custos de equipe e segurança."], tags: ["varejo", "região", "demanda"] },
  { topic: "seguranca-alimentos", category: "mercado", impact: "negativo", scope: "setorial", sectors: ["Alimentação"], sources: ["Agência de Vigilância Alimentar", "Observatório de Segurança dos Alimentos", "Rede de Restaurantes"], headlines: ["Setor de alimentação reforça rastreabilidade após alerta sanitário", "Fiscalização encontra falhas de origem em fornecedores", "Clientes cobram transparência sobre ingredientes e armazenamento"], bodies: ["O alerta não envolve todas as marcas, mas elevou a desconfiança sobre a cadeia de fornecimento.", "Empresas com registros completos conseguiram responder mais rápido às dúvidas.", "Aplicativos de entrega passaram a destacar avaliações relacionadas a higiene e embalagem."], tags: ["alimentos", "qualidade", "fiscalização"] },
  { topic: "venture-capital", category: "negocios", impact: "positivo", scope: "nacional", sectors: ["Tecnologia"], sources: ["Associação de Venture Capital", "Radar de Investimentos", "Carta Aurora Ventures"], headlines: ["Fundos voltam a procurar empresas com receita comprovada", "Capital de risco troca promessas por eficiência", "Rodadas menores ganham espaço no setor de tecnologia"], bodies: ["Investidores priorizam negócios com clientes ativos, margem conhecida e governança mínima.", "Crescimento continua valorizado, mas queima de caixa sem prazo perdeu aceitação.", "Fundadores enfrentam negociações mais longas e cláusulas de desempenho mais detalhadas."], tags: ["investimento", "tecnologia", "capital"] },
  { topic: "consolidacao-setor", category: "negocios", impact: "neutro", scope: "setorial", sources: ["Agência Fusões & Mercado", "Boletim M&A Brasil", "Observatório de Concorrência"], headlines: ["Empresas de {sector} estudam fusões para ganhar escala", "Consolidação muda equilíbrio competitivo em {sector}", "Negócios médios viram alvo de grupos compradores"], bodies: ["Compradores procuram carteira de clientes, produtos e equipes difíceis de formar organicamente.", "Empresas endividadas recebem propostas com desconto, enquanto líderes bem geridos ganham poder de negociação.", "Analistas esperam menos concorrentes, porém mais capitalizados, ao fim do ciclo."], tags: ["aquisições", "concorrência", "valuation"] },
  { topic: "entrada-estrangeira", category: "negocios", impact: "negativo", scope: "internacional", sources: ["Agência Comércio Global", "Conselho de Investimento Estrangeiro", "Boletim Fronteiras"], headlines: ["Grupo internacional prepara entrada no mercado de {sector}", "Concorrente estrangeiro testa preços agressivos no Brasil", "Empresa global contrata equipe local antes de lançamento"], bodies: ["A companhia chega com capital, tecnologia e disposição para operar com margens menores no início.", "Executivos locais foram contratados para adaptar produto e comunicação ao mercado brasileiro.", "Empresas nacionais apostam em relacionamento e conhecimento regional para defender clientes."], tags: ["concorrência", "internacional", "preços"] },
  { topic: "exportacao-oportunidade", category: "negocios", impact: "positivo", scope: "internacional", sources: ["Agência de Exportações", "Câmara de Comércio", "Radar Mercados Externos"], headlines: ["Demanda externa abre espaço para empresas brasileiras de {sector}", "Mercados vizinhos procuram novos fornecedores", "Exportação digital reduz barreiras para negócios médios"], bodies: ["Compradores estrangeiros buscam alternativas competitivas, mas exigem contratos, qualidade e suporte previsíveis.", "Empresas precisam considerar câmbio, impostos e adaptação antes de prometer preços.", "Negócios com produtos padronizados têm entrada mais rápida que operações dependentes de presença física."], tags: ["exportação", "internacional", "crescimento"] },
  { topic: "cambio-volatil", category: "economia", impact: "neutro", scope: "internacional", sources: ["Mesa de Câmbio Prisma", "Boletim Internacional", "Instituto de Comércio Exterior"], headlines: ["Câmbio oscila e dificulta planejamento de contratos", "Empresas revisam preços diante da volatilidade da moeda", "Importadores e exportadores aumentam proteção cambial"], bodies: ["A oscilação cria oportunidades para exportadores, mas encarece tecnologia, insumos e serviços contratados fora do país.", "Contratos sem cláusula cambial podem transferir todo o risco para uma das partes.", "Empresas menores procuram soluções simples para evitar que uma semana elimine a margem do mês."], tags: ["câmbio", "internacional", "custos"] },
  { topic: "confianca-empresarial", category: "economia", impact: "positivo", scope: "nacional", cycles: ["expansao", "estavel"], sources: ["Índice de Confiança Empresarial", "Instituto Horizonte", "Painel de Expectativas"], headlines: ["Confiança empresarial avança pelo terceiro levantamento", "Gestores voltam a planejar contratações e investimento", "Expectativas melhoram, mas caixa continua prioridade"], bodies: ["A maioria espera demanda maior, embora ainda mantenha reservas contra mudanças econômicas.", "Planos de contratação se concentram em funções diretamente ligadas a vendas e produtividade.", "Investimentos voltaram primeiro em empresas que reduziram dívida durante o ciclo anterior."], tags: ["confiança", "investimento", "emprego"] },
  { topic: "fechamento-pequenas", category: "economia", impact: "negativo", scope: "regional", cycles: ["recessao", "credito"], sources: ["Junta Comercial Regional", "Observatório de Pequenos Negócios", "Associação de Empreendedores"], headlines: ["Fechamento de pequenas empresas cresce em {region}", "Crédito e aluguel pressionam negócios locais", "Empreendedores encerram operações antes de renovar dívidas"], bodies: ["A maioria dos encerramentos ocorreu em empresas com pouco caixa e dependência de poucos clientes.", "Pontos comerciais ficaram disponíveis, criando oportunidades para grupos capitalizados.", "Fornecedores perderam clientes e passaram a exigir pagamento antecipado de empresas menores."], tags: ["falências", "região", "crédito"] },
  { topic: "fintech-empresas", category: "negocios", impact: "positivo", scope: "nacional", sources: ["Associação de Fintechs", "Radar Financeiro Digital", "Relatório Novos Bancos"], headlines: ["Fintechs lançam contas e crédito para empresas médias", "Concorrência digital reduz tarifas empresariais", "Novos bancos usam dados operacionais para oferecer capital"], bodies: ["As ofertas prometem velocidade, mas podem incluir juros variáveis e acesso amplo a dados financeiros.", "Bancos tradicionais responderam com pacotes mais baratos para evitar perda de clientes.", "Especialistas recomendam comparar integração, suporte e segurança, não apenas tarifa."], tags: ["fintech", "crédito", "tecnologia"] },
  { topic: "polo-regional", category: "mercado", impact: "positivo", scope: "regional", sources: ["Secretaria de Desenvolvimento Regional", "Agência Cidades & Negócios", "Observatório Urbano"], headlines: ["{region} atrai empresas e forma novo polo de {sector}", "Investimentos transformam mercado regional", "Cidade anuncia incentivos para negócios de {sector}"], bodies: ["Aluguéis ainda competitivos e oferta de profissionais atraíram operações em expansão.", "O crescimento também pressiona salários e infraestrutura, exigindo planejamento das empresas locais.", "Fornecedores acompanham a mudança e começam a abrir unidades próximas ao novo polo."], tags: ["região", "expansão", "incentivos"] },
  { topic: "patentes-setor", category: "negocios", impact: "neutro", scope: "setorial", sectors: ["Tecnologia", "Alimentação", "Varejo"], sources: ["Instituto de Propriedade Industrial", "Boletim Jurídico Empresarial", "Observatório de Patentes"], headlines: ["Disputas de marca e patente aumentam em {sector}", "Empresas correm para proteger produtos antes de expandir", "Decisões judiciais mudam valor de propriedade intelectual"], bodies: ["Registros incompletos deixaram produtos conhecidos expostos a cópias e negociações difíceis.", "Investidores passaram a revisar propriedade intelectual antes de calcular valuations.", "Acordos de licenciamento ganham espaço como alternativa a processos longos."], tags: ["patentes", "jurídico", "produtos"] },
  { topic: "clima-operacoes", category: "economia", impact: "negativo", scope: "regional", sectors: ["Alimentação", "Varejo"], sources: ["Centro de Monitoramento Climático", "Defesa Civil Empresarial", "Boletim Safra & Cidade"], headlines: ["Evento climático afeta abastecimento em {region}", "Empresas ativam planos de continuidade após alerta", "Chuvas e calor extremo alteram demanda e logística"], bodies: ["Rotas foram interrompidas e fornecedores alertaram para atrasos temporários.", "Alguns negócios registraram aumento de procura, enquanto outros perderam movimento e produtos.", "Empresas com fornecedores diversificados e estoque de segurança reagiram melhor."], tags: ["clima", "logística", "região"] },
];

const newsRegions = ["Sudeste", "Sul", "Nordeste", "Centro-Oeste", "interior paulista", "litoral", "grandes capitais"];

function fillNewsTemplate(
  template: string,
  context: { sector: Sector; company: string; rival: string; region: string },
) {
  return template
    .replaceAll("{sector}", context.sector.toLowerCase())
    .replaceAll("{company}", context.company)
    .replaceAll("{rival}", context.rival)
    .replaceAll("{region}", context.region);
}

function generateWorldNews(
  state: GameState,
  economy: Economy,
  week: number,
  blockedTopics: string[],
  count: number,
): NewsItem[] {
  const activeCompanies = state.companies.filter(
    (company) => !company.sold && !company.bankrupt && !company.closed,
  );
  const activeSectors = [...new Set(activeCompanies.map((company) => company.sector))];
  const eligible = worldNewsCatalog
    .filter((definition) => !blockedTopics.includes(definition.topic))
    .filter(
      (definition) =>
        !definition.cycles || definition.cycles.includes(economy.cycle),
    )
    .filter(
      (definition) =>
        !definition.sectors ||
        definition.sectors.some((sector) => activeSectors.includes(sector)),
    )
    .sort(() => Math.random() - 0.5)
    .slice(0, count);
  return eligible.map((definition, index) => {
    const matchingSectors = definition.sectors?.filter((sector) =>
      activeSectors.includes(sector),
    );
    const sector =
      matchingSectors?.[(week + index) % matchingSectors.length] ??
      activeSectors[(week + index) % Math.max(1, activeSectors.length)] ??
      "Tecnologia";
    const company =
      activeCompanies.find((item) => item.sector === sector)?.name ??
      state.holdingName ??
      "empresas locais";
    const rival =
      state.competitors.find(
        (item) =>
          item.sector === sector &&
          !["fechada", "vendida"].includes(item.status),
      )?.name ?? "um novo concorrente";
    const region = newsRegions[(week + definition.topic.length + index) % newsRegions.length];
    const context = { sector, company, rival, region };
    const headline = fillNewsTemplate(
      definition.headlines[(week + index) % definition.headlines.length],
      context,
    );
    const body = fillNewsTemplate(
      definition.bodies[(week * 2 + index) % definition.bodies.length],
      context,
    );
    return {
      id: Date.now() + 2000 + index,
      week,
      category: definition.category,
      headline,
      body,
      impact: definition.impact,
      topic: definition.topic,
      source:
        definition.sources[(week + definition.topic.length) % definition.sources.length],
      scope: definition.scope,
      region: definition.scope === "regional" ? region : undefined,
      sectors: definition.sectors ?? [sector],
      tags: definition.tags,
    };
  });
}

function newsSimilarity(first: string, second: string) {
  const ignored = new Set(["a", "o", "as", "os", "de", "da", "do", "das", "dos", "e", "em", "para", "com", "após", "nova", "novo"]);
  const words = (text: string) =>
    new Set(
      text
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-z0-9 ]/g, " ")
        .split(/\s+/)
        .filter((word) => word.length > 2 && !ignored.has(word)),
    );
  const a = words(first);
  const b = words(second);
  if (!a.size || !b.size) return 0;
  const intersection = [...a].filter((word) => b.has(word)).length;
  return intersection / Math.min(a.size, b.size);
}

function dedupeNewsItems(items: NewsItem[], recent: NewsItem[]) {
  const accepted: NewsItem[] = [];
  for (const item of items) {
    const comparisons = [...accepted, ...recent.slice(0, 16)];
    const repeated = comparisons.some(
      (other) =>
        (item.topic && other.topic === item.topic) ||
        newsSimilarity(item.headline, other.headline) >= 0.72,
    );
    if (!repeated) accepted.push(item);
  }
  return accepted;
}

const integrityProblems: Omit<
  AuditCase,
  "id" | "companyId" | "openedWeek" | "suspect" | "status" | "evidence" | "weeksLeft"
>[] = [
  { title: "Receita antecipada nos relatórios", category: "financeiro", description: "Contratos ainda não executados podem ter sido registrados como faturamento para cumprir a meta do conselho.", severity: "alta", exposureRisk: 58, potentialLoss: 90000 },
  { title: "Fornecedor ligado ao executivo", category: "contratos", description: "Uma empresa contratada por preço acima do mercado pertence a um familiar de alguém da direção.", severity: "critica", exposureRisk: 72, potentialLoss: 140000 },
  { title: "Comissão clandestina em contrato", category: "contratos", description: "Pagamentos fracionados sugerem que parte do valor retornou para quem aprovou a compra.", severity: "critica", exposureRisk: 78, potentialLoss: 180000 },
  { title: "Funcionários fantasmas na folha", category: "pessoas", description: "Pessoas sem atividade verificável continuam recebendo salário e benefícios da empresa.", severity: "alta", exposureRisk: 55, potentialLoss: 76000 },
  { title: "Denúncia de assédio acobertada", category: "pessoas", description: "O RH teria arquivado relatos contra uma liderança importante para evitar desgaste público.", severity: "critica", exposureRisk: 86, potentialLoss: 120000 },
  { title: "Vazamento de dados de clientes", category: "dados", description: "Credenciais corporativas foram usadas para exportar uma base comercial sem justificativa.", severity: "critica", exposureRisk: 82, potentialLoss: 210000 },
  { title: "Propriedade intelectual desviada", category: "dados", description: "Documentos de produto foram enviados a um endereço externo ligado a uma futura concorrente.", severity: "alta", exposureRisk: 64, potentialLoss: 160000 },
  { title: "Despesas pessoais reembolsadas", category: "financeiro", description: "Viagens, refeições e compras particulares parecem ter sido lançadas como custo operacional.", severity: "media", exposureRisk: 38, potentialLoss: 42000 },
  { title: "Empréstimo sem autorização", category: "governanca", description: "A subsidiária assumiu dívida e ofereceu ativos como garantia sem aprovação da holding.", severity: "alta", exposureRisk: 61, potentialLoss: 130000 },
  { title: "Uso de informação privilegiada", category: "governanca", description: "Negociações particulares ocorreram poucos dias antes de uma decisão estratégica ainda confidencial.", severity: "critica", exposureRisk: 88, potentialLoss: 240000 },
  { title: "Tributos deliberadamente omitidos", category: "fiscal", description: "Notas e obrigações foram postergadas para melhorar artificialmente o caixa apresentado.", severity: "alta", exposureRisk: 75, potentialLoss: 170000 },
  { title: "Clientes fictícios para bater a meta", category: "financeiro", description: "Cadastros sem atividade real aumentaram os indicadores comerciais usados na remuneração variável.", severity: "media", exposureRisk: 47, potentialLoss: 68000 },
];

function createAuditCase(company: Company, week: number): AuditCase {
  const index = Math.floor(Math.random() * integrityProblems.length);
  const problem = integrityProblems[index];
  return {
    ...problem,
    id: `audit-${company.id}-${week}-${index}`,
    companyId: company.id,
    openedWeek: week,
    suspect: company.ceo ?? "Direção executiva",
    status: "suspeita",
    evidence: 12 + Math.round(Math.random() * 20),
    weeksLeft: 0,
  };
}

function createHeirs(founder: string): Heir[] {
  const parts = founder.trim().split(/\s+/);
  const surname = parts.length > 1 ? parts[parts.length - 1] : "Silva";
  return [
    {
      id: 1,
      name: `Clara ${surname}`,
      relationship: "filha mais velha",
      startAge: 23,
      competence: 48,
      readiness: 28,
      bond: 72,
      ambition: 66,
      style: "inovacao",
      role: "familia",
      history: ["Ainda observa a holding de fora."],
      generation: 2,
      parent: founder,
      equity: 0,
      support: 65,
      resentment: 12,
      status: "familia",
    },
    {
      id: 2,
      name: `Lucas ${surname}`,
      relationship: "filho mais novo",
      startAge: 20,
      competence: 38,
      readiness: 20,
      bond: 78,
      ambition: 52,
      style: "pessoas",
      role: "familia",
      history: ["Ainda não decidiu se quer seguir a vida empresarial."],
      generation: 2,
      parent: founder,
      equity: 0,
      support: 72,
      resentment: 8,
      status: "familia",
    },
  ];
}

function createNextGeneration(parent: string, generation: number): Heir[] {
  const surname = parent.trim().split(/\s+/).at(-1) ?? "Silva";
  const names = generation % 2 === 1 ? ["Helena", "Rafael"] : ["Sofia", "Gabriel"];
  return names.map((firstName, index) => ({
    id: generation * 100 + index + 1,
    name: `${firstName} ${surname}`,
    relationship: index === 0 ? "descendente mais velha" : "descendente mais novo",
    startAge: index === 0 ? 22 : 20,
    competence: index === 0 ? 44 : 39,
    readiness: index === 0 ? 26 : 21,
    bond: 74 - index * 4,
    ambition: index === 0 ? 70 : 55,
    style: index === 0 ? "eficiencia" : "crescimento",
    role: "familia" as const,
    history: [`Geração ${generation}: começou a observar a holding.`],
    generation,
    parent,
    equity: 0,
    support: 66,
    resentment: 10,
    status: "familia" as const,
  }));
}

const lifeGoals: {
  id: LifeGoalId;
  title: string;
  description: string;
  target: string;
}[] = [
  { id: "fortuna", title: "Construir uma fortuna", description: "Transformar empresas em independência financeira pessoal.", target: "Patrimônio total de R$ 10 milhões" },
  { id: "dinastia", title: "Criar uma dinastia", description: "Preparar um sucessor e deixar um grupo que sobreviva ao fundador.", target: "Sucessor pronto e pelo menos 4 empresas ativas" },
  { id: "impacto", title: "Ser lembrado", description: "Construir reputação pública e um legado empresarial respeitado.", target: "Reputação 90 e legado 80" },
  { id: "liberdade", title: "Comprar sua liberdade", description: "Delegar a operação, reduzir dívidas e poder sair sem destruir o grupo.", target: "Operações delegadas e patrimônio pessoal de R$ 3 milhões" },
];

function productWeeklyRevenue(product: Project, competition = 0): number {
  if (
    product.kind !== "produto" ||
    product.status !== "concluido" ||
    product.lifecycle !== "mercado"
  )
    return product.royaltyRevenue ?? 0;
  const stageMultiplier =
    product.marketStage === "lancamento"
      ? 0.72
      : product.marketStage === "crescimento"
        ? 1.18
        : product.marketStage === "maturidade"
          ? 1
          : 0.52;
  const referencePrice = Math.max(40, (product.recurring ?? 9000) / 42);
  const price = product.productPrice ?? referencePrice;
  const priceEffect = clamp(
    1.35 - Math.max(0, price / referencePrice - 0.65) * 0.55,
    0.38,
    1.3,
  );
  const productMarketing = product.productMarketing ?? 0;
  const marketingSaturation = 1 - Math.exp(-productMarketing / 12000);
  const marketingEffect = 1 + marketingSaturation * .34 * clamp(product.quality / 75, .45, 1.15);
  const qualityEffect = 0.62 + product.quality / 155;
  const satisfactionEffect = .55 + (product.customerSatisfaction ?? 70) / 155;
  const bugEffect = clamp(1 - (product.bugLevel ?? 0) / 115, .25, 1);
  const launchEffect = product.launchOutcome === "desastre" ? .32 : product.launchOutcome === "falha" ? .58 : product.launchOutcome === "morno" ? .84 : 1;
  const competitionEffect = clamp(1 - competition / 260, 0.55, 1);
  const ownership = (product.rightsOwned ?? 100) / 100;
  return Math.max(
    0,
    Math.round(
      (product.recurring ?? 9000) *
        stageMultiplier *
        priceEffect *
        marketingEffect *
        qualityEffect *
        satisfactionEffect *
        bugEffect *
        launchEffect *
        competitionEffect *
        ownership +
        (product.royaltyRevenue ?? 0),
    ),
  );
}

const sectorData: Record<
  Sector,
  {
    icon: string;
    title: string;
    desc: string;
    company: string;
    price: number;
    customers: number;
    difficulty: string;
  }
> = {
  Tecnologia: {
    icon: "⌘",
    title: "Startup de tecnologia",
    desc: "Margens altas, talentos caros e produto em constante risco.",
    company: "Nexo Sistemas",
    price: 289,
    customers: 120,
    difficulty: "Estratégico",
  },
  Alimentação: {
    icon: "♨",
    title: "Marca de alimentação",
    desc: "Operação intensa, estoque, reputação local e expansão física.",
    company: "Brasa Urbana",
    price: 72,
    customers: 540,
    difficulty: "Operacional",
  },
  Varejo: {
    icon: "◇",
    title: "Loja e e-commerce",
    desc: "Giro de estoque, campanhas, fornecedores e guerra de preços.",
    company: "Vértice Store",
    price: 179,
    customers: 310,
    difficulty: "Dinâmico",
  },
  Agência: {
    icon: "✦",
    title: "Agência criativa",
    desc: "Projetos, clientes exigentes e uma equipe que é o produto.",
    company: "Pulso Criativo",
    price: 4200,
    customers: 12,
    difficulty: "Humano",
  },
};

const basePeople: Employee[] = [
  {
    id: 1,
    name: "Lívia Rocha",
    initials: "LR",
    role: "Produto",
    salary: 5900,
    market: 6800,
    skill: 86,
    morale: 76,
    loyalty: 67,
    trait: "Perfeccionista",
    ambition: "Quer liderar uma equipe",
    color: "#efad55",
    relation: 62,
    stress: 18,
    weeks: 0,
    warnings: 0,
    leaveWeeks: 0,
  },
  {
    id: 2,
    name: "Caio Martins",
    initials: "CM",
    role: "Comercial",
    salary: 4700,
    market: 5200,
    skill: 75,
    morale: 84,
    loyalty: 81,
    trait: "Competitivo",
    ambition: "Quer participação na empresa",
    color: "#59c9c2",
    relation: 73,
    stress: 14,
    weeks: 0,
    warnings: 0,
    leaveWeeks: 0,
  },
  {
    id: 3,
    name: "Bia Santos",
    initials: "BS",
    role: "Operações",
    salary: 3900,
    market: 4600,
    skill: 72,
    morale: 68,
    loyalty: 74,
    trait: "Leal",
    ambition: "Busca estabilidade",
    color: "#ca7b83",
    relation: 78,
    stress: 20,
    weeks: 0,
    warnings: 0,
    leaveWeeks: 0,
  },
];

const laborFirstNames = [
  "Ana", "Arthur", "Beatriz", "Bruno", "Camila", "Caio", "Cecília", "Davi",
  "Elisa", "Enzo", "Fernanda", "Gabriel", "Giovana", "Heitor", "Iara", "Ícaro",
  "Joana", "Júlio", "Karina", "Leandro", "Lívia", "Lucca", "Marina", "Mateus",
  "Nina", "Noah", "Olívia", "Pedro", "Rafaela", "Ravi", "Sofia", "Thiago",
  "Valentina", "Vinícius", "Yasmin", "Yuri",
];
const laborLastNames = [
  "Alencar", "Azevedo", "Barreto", "Campos", "Cardoso", "Cruz", "Dantas", "Duarte",
  "Farias", "Freitas", "Gomes", "Leal", "Lima", "Lopes", "Luz", "Macedo",
  "Medeiros", "Melo", "Moraes", "Neves", "Nogueira", "Paiva", "Pires", "Prado",
  "Ramos", "Reis", "Rocha", "Salles", "Serra", "Tavares", "Torres", "Valente",
];
const laborRoles: Record<Sector, string[]> = {
  Tecnologia: ["Engenharia", "Produto", "Dados", "Cibersegurança", "UX", "Web design", "Vendas B2B", "Suporte técnico", "Qualidade"],
  Alimentação: ["Cozinha", "Operações", "Qualidade", "Compras", "Logística", "Marketing local", "Expansão", "Atendimento"],
  Varejo: ["Compras", "E-commerce", "Logística", "Vendas", "Visual merchandising", "Atendimento", "CRM", "Estoque"],
  Agência: ["Criação", "Atendimento", "Mídia", "Estratégia", "Produção", "Comercial", "Redação", "Design"],
};
const directorAreaLabels: Record<DirectorArea, string> = { pessoas: "Pessoas e Cultura", operacoes: "Operações e Finanças", produto: "Produto e Inovação", comercial: "Comercial e Clientes" };

function inferDepartment(role: string): DirectorArea {
  const normalized = role.toLowerCase();
  if (["produto", "engenharia", "dados", "segurança", "ux", "design", "qualidade", "criação", "redação"].some((term) => normalized.includes(term))) return "produto";
  if (["comercial", "vendas", "marketing", "atendimento", "crm", "mídia", "expansão"].some((term) => normalized.includes(term))) return "comercial";
  if (["pessoas", "rh", "cultura", "liderança"].some((term) => normalized.includes(term))) return "pessoas";
  return "operacoes";
}

function directorStyle(employee: Employee): CompanyDirector["style"] {
  if (["Empático", "Diplomático", "Carismático"].includes(employee.trait)) return "colaborativo";
  if (["Competitivo", "Visionário"].includes(employee.trait)) return "agressivo";
  if (["Analítico", "Pragmático", "Disciplinado"].includes(employee.trait)) return "analitico";
  return "especialista";
}

function directorStrength(directors: CompanyDirector[], area: DirectorArea) {
  const director = directors.find((item) => item.area === area);
  if (!director) return 0;
  return clamp(director.competence * .5 + director.trust * .28 + director.authority * .22);
}
const facilityKeys: FacilityKey[] = ["escritorio", "equipamentos", "lazer", "beneficios", "treinamento", "seguranca", "infraestrutura"];
const facilityDefinitions: Record<FacilityKey, {
  label: string;
  short: string;
  description: string;
  upgradeCosts: number[];
  weeklyMaintenance: number[];
}> = {
  escritorio: { label: "Escritório e ambiente", short: "Ambiente", description: "Melhora imagem, moral e capacidade de receber clientes e equipe.", upgradeCosts: [0, 35000, 85000, 180000, 360000, 700000], weeklyMaintenance: [0, 900, 1900, 3600, 6800, 12500] },
  equipamentos: { label: "Equipamentos e ferramentas", short: "Ferramentas", description: "Acelera projetos, reduz retrabalho e melhora a produtividade.", upgradeCosts: [0, 28000, 70000, 150000, 310000, 620000], weeklyMaintenance: [0, 750, 1650, 3200, 6100, 11200] },
  lazer: { label: "Lazer e convivência", short: "Convivência", description: "Reduz estresse e melhora o clima, mas pode virar luxo caro sem gestão.", upgradeCosts: [0, 20000, 50000, 110000, 240000, 480000], weeklyMaintenance: [0, 650, 1350, 2700, 5200, 9800] },
  beneficios: { label: "Benefícios e bem-estar", short: "Benefícios", description: "Aumenta lealdade, retenção e recuperação da equipe.", upgradeCosts: [0, 25000, 65000, 140000, 290000, 580000], weeklyMaintenance: [0, 1200, 2600, 5100, 9400, 17000] },
  treinamento: { label: "Treinamento e academia", short: "Treinamento", description: "Desenvolve competência e qualidade ao longo do tempo.", upgradeCosts: [0, 18000, 48000, 105000, 230000, 500000], weeklyMaintenance: [0, 850, 1800, 3500, 6800, 12800] },
  seguranca: { label: "Segurança e continuidade", short: "Segurança", description: "Reduz falhas, fraudes, invasões e crises operacionais.", upgradeCosts: [0, 24000, 60000, 135000, 300000, 650000], weeklyMaintenance: [0, 700, 1550, 3300, 6900, 14000] },
  infraestrutura: { label: "Infraestrutura e capacidade", short: "Infraestrutura", description: "Sustenta mais clientes, produtos e crescimento sem sobrecarga.", upgradeCosts: [0, 40000, 100000, 220000, 480000, 950000], weeklyMaintenance: [0, 1100, 2400, 4800, 9200, 17500] },
};
const facilityModeLabels: Record<FacilityMaintenanceMode, { label: string; multiplier: number; conditionDelta: number; detail: string }> = {
  economico: { label: "Manutenção econômica", multiplier: .55, conditionDelta: -1.5, detail: "Corta despesas agora, mas desgasta a estrutura e aumenta incidentes." },
  adequado: { label: "Manutenção adequada", multiplier: 1, conditionDelta: .15, detail: "Preserva os investimentos com custo e risco equilibrados." },
  premium: { label: "Manutenção premium", multiplier: 1.55, conditionDelta: 1.8, detail: "Recupera condição e extrai mais resultado, com custo elevado." },
};

function normalizedFacilities(company: Company): Record<FacilityKey, FacilityState> {
  return Object.fromEntries(facilityKeys.map((key) => [key, {
    level: company.facilities?.[key]?.level ?? 0,
    condition: company.facilities?.[key]?.condition ?? 100,
    lastUpgradeWeek: company.facilities?.[key]?.lastUpgradeWeek ?? company.founded,
    incidents: company.facilities?.[key]?.incidents ?? 0,
  }])) as Record<FacilityKey, FacilityState>;
}

function facilitySummary(company: Company) {
  const facilities = normalizedFacilities(company);
  const mode = company.facilityMaintenanceMode ?? "adequado";
  const maintenance = facilityModeLabels[mode];
  const effective = (key: FacilityKey) => facilities[key].level * clamp(facilities[key].condition / 100, .25, 1.08);
  const office = effective("escritorio");
  const equipment = effective("equipamentos");
  const leisure = effective("lazer");
  const benefits = effective("beneficios");
  const training = effective("treinamento");
  const security = effective("seguranca");
  const infrastructure = effective("infraestrutura");
  const weeklyMaintenance = Math.round(facilityKeys.reduce((sum, key) => sum + facilityDefinitions[key].weeklyMaintenance[facilities[key].level], 0) * maintenance.multiplier);
  const averageCondition = facilityKeys.reduce((sum, key) => sum + facilities[key].condition, 0) / facilityKeys.length;
  return {
    facilities, mode, weeklyMaintenance, averageCondition,
    moraleBoost: office * .18 + leisure * .72 + benefits * .55 + training * .12,
    stressRelief: leisure * .62 + benefits * .32 + office * .1,
    loyaltyBoost: benefits * .36 + training * .16,
    progressBoost: equipment * .72 + training * .42 + infrastructure * .35,
    qualityBoost: equipment * .15 + training * .28 + security * .16,
    efficiencyGain: equipment * .006 + infrastructure * .008,
    capacityMultiplier: 1 + office * .012 + infrastructure * .045,
    reputationBoost: office * .08 + security * .05,
    securityProtection: clamp(security * 11 + infrastructure * 3),
    skillGrowth: training * .055,
  };
}
const productPreparationLabels: Record<ProductPreparation, { label: string; cost: number; detail: string }> = {
  pesquisa: { label: "Pesquisa", cost: 12000, detail: "Reduz incompatibilidade com o mercado e atrasos." },
  prototipo: { label: "Protótipo", cost: 18000, detail: "Descobre problemas antes de comprometer o lançamento." },
  testes: { label: "Testes", cost: 16000, detail: "Reduz bugs e falhas técnicas." },
  seguranca: { label: "Segurança", cost: 20000, detail: "Evita incidentes, fraudes e crises de confiança." },
  qualidade: { label: "Controle de qualidade", cost: 15000, detail: "Melhora acabamento e avaliação dos clientes." },
  piloto: { label: "Lançamento gradual", cost: 24000, detail: "Testa o produto com poucos clientes antes da escala." },
  suporte: { label: "Suporte pós-venda", cost: 12000, detail: "Amortece reclamações e acelera correções." },
};

function productBlueprint(sector: Sector, complexity: Project["complexity"] = 3) {
  const roles: Record<Sector, string[]> = {
    Tecnologia: complexity >= 4 ? ["Engenharia|Produto", "UX|Web design", "Qualidade|Cibersegurança"] : ["Engenharia|Produto", "UX|Web design"],
    Alimentação: complexity >= 4 ? ["Cozinha|Operações", "Qualidade", "Logística|Compras"] : ["Cozinha|Operações", "Qualidade"],
    Varejo: complexity >= 4 ? ["E-commerce|Vendas", "Logística|Estoque", "Compras|CRM"] : ["E-commerce|Vendas", "Logística|Estoque"],
    Agência: complexity >= 4 ? ["Criação|Design", "Atendimento|Estratégia", "Produção|Mídia"] : ["Criação|Design", "Atendimento|Estratégia"],
  };
  return { requiredTeam: Math.max(2, complexity), requiredRoles: roles[sector], maintenanceCost: 1800 + complexity * 1400, developmentCost: 16000 + complexity * 12000 };
}

function productRoleCoverage(product: Project, company: Company) {
  const requirements = product.requiredRoles ?? productBlueprint(company.sector, product.complexity ?? 3).requiredRoles;
  const covered = requirements.filter((requirement) => requirement.split("|").some((role) => company.employees.some((employee) => employee.role.toLowerCase().includes(role.toLowerCase()))));
  return { requirements, covered: covered.length, missing: requirements.filter((requirement) => !covered.includes(requirement)), ratio: requirements.length ? covered.length / requirements.length : 1 };
}

function productRiskProfile(product: Project, company: Company) {
  const complexity = product.complexity ?? 3;
  const preparation = product.preparation ?? {};
  const coverage = productRoleCoverage(product, company);
  const teamShortage = Math.max(0, (product.requiredTeam ?? complexity) - company.employees.filter((employee) => (employee.leaveWeeks ?? 0) <= 0).length);
  const prep = (key: ProductPreparation) => preparation[key] ?? 0;
  const delayChance = clamp(12 + complexity * 7 + teamShortage * 9 + (1 - coverage.ratio) * 28 + product.risk * .18 - prep("pesquisa") * 5 - prep("prototipo") * 4, 4, 78);
  const failureChance = clamp(10 + complexity * 8 + (1 - coverage.ratio) * 32 + product.risk * .22 + Math.max(0, 60 - product.quality) * .25 - prep("testes") * 6 - prep("seguranca") * 4 - prep("qualidade") * 5 - prep("piloto") * 7, 3, 82);
  return { complexity, coverage, teamShortage, delayChance: Math.round(delayChance), failureChance: Math.round(failureChance) };
}

function productVersionRisk(product: Project, strategy: "economica" | "equilibrada" | "robusta") {
  const prep = product.preparation ?? {};
  const protection = (prep.testes ?? 0) * 5 + (prep.seguranca ?? 0) * 3 + (prep.qualidade ?? 0) * 4 + (product.supportLevel ?? 0) * 3 + (strategy === "robusta" ? 22 : strategy === "equilibrada" ? 10 : 0);
  return clamp(48 + (product.complexity ?? 3) * 5 + (product.bugLevel ?? 0) * .25 + (product.updateNeed ?? 0) * .18 - product.quality * .28 - protection, 12, 72);
}
const laborTraits = ["Analítico", "Carismático", "Criativo", "Competitivo", "Diplomático", "Disciplinado", "Empático", "Inventivo", "Pragmático", "Questionador", "Resiliente", "Visionário"];
const laborAmbitions = ["Quer liderar uma equipe", "Busca estabilidade", "Quer virar diretor", "Sonha em criar um produto", "Quer participação na empresa", "Busca autonomia", "Quer aprender rápido", "Pretende abrir o próprio negócio", "Quer reconhecimento público", "Valoriza equilíbrio pessoal"];
const laborColors = ["#778ad9", "#d982a8", "#6da88c", "#df9d5d", "#7d72ad", "#57a7a0", "#bd735f", "#8d9a61"];
const talentTierLabels: Record<TalentTier, string> = { iniciante: "Iniciante", junior: "Júnior", pleno: "Pleno", senior: "Sênior", elite: "Talento de elite" };

function talentTierFor(skill: number): TalentTier {
  return skill >= 89 ? "elite" : skill >= 77 ? "senior" : skill >= 63 ? "pleno" : skill >= 50 ? "junior" : "iniciante";
}

function employerAttraction(company: Company) {
  const structure = facilitySummary(company);
  const morale = company.employees.length ? company.employees.reduce((sum, employee) => sum + employee.morale, 0) / company.employees.length : 50;
  const stress = company.employees.length ? company.employees.reduce((sum, employee) => sum + (employee.stress ?? 25), 0) / company.employees.length : 25;
  const metrics = companyMetrics(company);
  const scalePrestige: Record<BusinessScale, number> = { nascente: 25, pequena: 38, media: 55, grande: 72, corporacao: 86, global: 96 };
  const benefitLevel = structure.facilities.beneficios.level;
  const trainingLevel = structure.facilities.treinamento.level;
  const officeLevel = structure.facilities.escritorio.level;
  const score = clamp((company.employerBrand ?? company.reputation * .62) * .32 + company.reputation * .18 + morale * .15 + (100 - stress) * .08 + scalePrestige[metrics.scale] * .1 + (benefitLevel * 8 + trainingLevel * 6 + officeLevel * 4) * .17);
  const label = score >= 86 ? "Empregadora de elite" : score >= 70 ? "Empresa desejada" : score >= 52 ? "Carreira promissora" : score >= 35 ? "Empresa em construção" : "Aposta arriscada";
  return { score: Math.round(score), label, morale: Math.round(morale), stress: Math.round(stress) };
}

function candidateAcceptance(company: Company, candidate: Employee) {
  const attraction = employerAttraction(company);
  const gap = (candidate.requiredEmployerScore ?? 35) - attraction.score;
  const payPremium = candidate.salary / Math.max(1, candidate.market) - 1;
  return Math.round(clamp(88 - Math.max(0, gap) * 1.45 + Math.max(0, -gap) * .18 + payPremium * 90, 28, 97));
}

function createLaborMarket(sector: Sector, companyId: number, week: number, existingNames: string[] = [], count = 10, company?: Company): Employee[] {
  const marketCycle = Math.floor(Math.max(1, week) / 2);
  const unavailable = company?.rejectedCandidates?.filter((candidate) => candidate.untilWeek > week).map((candidate) => candidate.name) ?? [];
  const used = new Set([...existingNames, ...unavailable]);
  const employerScore = company ? employerAttraction(company).score : 28;
  const result: Employee[] = [];
  for (let index = 0; index < count * 5 && result.length < count; index += 1) {
    const seed = companyId * 97 + marketCycle * 53 + index * 29 + sector.length * 17;
    const firstName = laborFirstNames[seed % laborFirstNames.length];
    const lastName = laborLastNames[(seed * 7 + companyId * 11) % laborLastNames.length];
    const name = `${firstName} ${lastName}`;
    if (used.has(name)) continue;
    used.add(name);
    const role = laborRoles[sector][(seed * 5 + index) % laborRoles[sector].length];
    const skill = Math.round(clamp(36 + (seed % 35) + employerScore * .27 + (index % 5 === 0 ? -8 : 0), 36, 96));
    const talentTier = talentTierFor(skill);
    const requiredEmployerScore = talentTier === "elite" ? 82 : talentTier === "senior" ? 66 : talentTier === "pleno" ? 46 : talentTier === "junior" ? 28 : 12;
    if (requiredEmployerScore > employerScore + 18 && result.length >= Math.max(3, Math.floor(count * .7))) continue;
    const rolePremium = ["Engenharia", "Dados", "Cibersegurança", "Estratégia", "Expansão"].includes(role) ? 900 : 0;
    const market = Math.round((1300 + skill * 45 + rolePremium + (talentTier === "elite" ? 2400 : talentTier === "senior" ? 900 : 0)) / 100) * 100;
    const attractionGap = Math.max(0, requiredEmployerScore - employerScore);
    const salary = Math.round((market * (.88 + ((seed >> 2) % 11) / 100 + attractionGap / 260)) / 100) * 100;
    const signingBonus = Math.round((1200 + skill * (talentTier === "elite" ? 150 : talentTier === "senior" ? 90 : talentTier === "pleno" ? 55 : 25)) / 500) * 500;
    result.push({
      id: 200000000 + companyId * 100000 + marketCycle * 100 + result.length,
      name,
      initials: `${firstName[0]}${lastName[0]}`.toUpperCase(),
      role,
      salary,
      market,
      skill,
      talentTier,
      requiredEmployerScore,
      signingBonus,
      morale: 67 + ((seed * 3) % 25),
      loyalty: 48 + ((seed * 7) % 40),
      trait: laborTraits[(seed + index * 3) % laborTraits.length],
      ambition: laborAmbitions[(seed * 3 + index) % laborAmbitions.length],
      color: laborColors[(seed + index) % laborColors.length],
      relation: 45 + (seed % 19),
      stress: 8 + (seed % 18),
      weeks: 0,
      warnings: 0,
      leaveWeeks: 0,
    });
  }
  return result;
}

const ceoProductNames: Record<Sector, Record<CEOStyle, string[]>> = {
  Tecnologia: {
    crescimento: ["Nexo Go", "Plataforma Nexo Pro", "Nexo para Empresas"],
    eficiencia: ["Nexo Essencial", "Nexo Automação", "Nexo Operações"],
    inovacao: ["Nexo Quantum", "Projeto Órbita", "Nexo Inteligência"],
    pessoas: ["Nexo Equipes", "Nexo Comunidade", "Nexo Colabora"],
  },
  Alimentação: {
    crescimento: ["Menu Expresso", "Clube da Mesa", "Linha Sabor Nacional"],
    eficiencia: ["Menu Inteligente", "Cozinha Enxuta", "Linha Essencial"],
    inovacao: ["Laboratório de Sabores", "Mesa do Futuro", "Menu Vivo"],
    pessoas: ["Receitas da Equipe", "Mesa Compartilhada", "Clube da Casa"],
  },
  Varejo: {
    crescimento: ["Coleção Horizonte", "Linha Popular", "Clube de Vantagens"],
    eficiencia: ["Linha Essencial", "Estoque Inteligente", "Marca Direta"],
    inovacao: ["Coleção Mutante", "Loja Imersiva", "Linha Amanhã"],
    pessoas: ["Coleção da Comunidade", "Linha Feita Junto", "Clube da Equipe"],
  },
  Agência: {
    crescimento: ["Pacote Escala", "Marca Nacional", "Operação Conquista"],
    eficiencia: ["Campanha Expressa", "Estúdio Enxuto", "Pacote Essencial"],
    inovacao: ["Estúdio Experimental", "Campanha Impossível", "Laboratório Criativo"],
    pessoas: ["Cocriação 360", "Estúdio Aberto", "Campanha com Propósito"],
  },
};

function createCEOProduct(company: Company, week: number, style: CEOStyle): Project {
  const budgetLimit = Math.max(10000, company.ceoBudget ?? 15000);
  const profiles: Record<CEOStyle, { budget: number; quality: number; risk: number; reward: number; recurring: number }> = {
    crescimento: { budget: Math.min(42000, Math.max(20000, budgetLimit)), quality: 54, risk: 38, reward: 36000, recurring: 16500 },
    eficiencia: { budget: Math.min(26000, Math.max(12000, budgetLimit * .75)), quality: 63, risk: 19, reward: 23000, recurring: 9800 },
    inovacao: { budget: Math.min(60000, Math.max(28000, budgetLimit * 1.15)), quality: 48, risk: 59, reward: 52000, recurring: 23000 },
    pessoas: { budget: Math.min(38000, Math.max(18000, budgetLimit * .9)), quality: 61, risk: 28, reward: 30000, recurring: 13500 },
  };
  const profile = profiles[style];
  const names = ceoProductNames[company.sector][style];
  const complexity = (style === "inovacao" ? 5 : style === "crescimento" ? 4 : style === "eficiencia" ? 2 : 3) as 1 | 2 | 3 | 4 | 5;
  return {
    id: Date.now() + company.id * 100 + week,
    name: names[(week + company.id) % names.length],
    progress: 0,
    quality: profile.quality,
    budget: Math.round(profile.budget),
    reward: profile.reward,
    risk: profile.risk,
    status: "ativo",
    kind: "produto",
    recurring: profile.recurring,
    lifecycle: "desenvolvimento",
    marketStage: "lancamento",
    marketWeeks: 0,
    productPrice: company.price,
    productMarketing: style === "crescimento" ? 2500 : 0,
    version: 1,
    patented: false,
    rightsOwned: 100,
    royaltyRevenue: 0,
    complexity,
    ...productBlueprint(company.sector, complexity),
    developmentCost: Math.round(profile.budget),
    preparation: style === "eficiencia" ? { pesquisa: 1, qualidade: 1 } : style === "inovacao" ? { prototipo: 1 } : style === "pessoas" ? { pesquisa: 1, suporte: 1 } : {},
    bugLevel: 0,
    customerSatisfaction: 70,
    updateNeed: 0,
    supportLevel: 0,
    feedback: [],
  };
}

function ceoProductProposalMessage(company: Company, product: Project): StoryMessage {
  const styleLabel: Record<CEOStyle, string> = {
    crescimento: "crescimento comercial",
    eficiencia: "eficiência e retorno",
    inovacao: "inovação agressiva",
    pessoas: "cultura e clientes",
  };
  const startProduct = (state: GameState, pilot = false): GameState => {
    const planned = pilot ? {
      ...product,
      budget: Math.round(product.budget * .65),
      recurring: Math.round((product.recurring ?? 0) * .75),
      reward: Math.round(product.reward * .72),
      quality: Math.max(35, product.quality - 3),
      risk: Math.max(10, product.risk - 9),
      name: `${product.name} · piloto`,
    } : product;
    return {
      ...state,
      companies: state.companies.map((item) => item.id !== company.id || item.projects.some((project) => project.id === product.id) ? item : ({
        ...item,
        cash: item.cash - planned.budget,
        projects: [...item.projects, planned],
        ceoTrust: clamp((item.ceoTrust ?? 65) + (pilot ? 1 : 4)),
        ceoLoyalty: clamp((item.ceoLoyalty ?? 65) + (pilot ? 1 : 3)),
        ceoProductCooldown: 12,
        ceoLastDecision: `${pilot ? "Negociou um piloto para" : "Iniciou"} ${planned.name}`,
        ceoHistory: [`Semana ${state.week}: ${pilot ? "piloto aprovado" : "produto aprovado"} — ${planned.name}.`, ...(item.ceoHistory ?? [])].slice(0, 8),
        ceoMemories: addCharacterMemory(item.ceoMemories, characterMemory(state.week, "produto", pilot ? "Você reduziu meu plano, mas permitiu que eu provasse a ideia." : "Você confiou no produto que propus para a empresa.", pilot ? "cauteloso" : "orgulhoso", pilot ? 3 : 8, pilot ? 58 : 76)),
      })),
      news: [{ id: Date.now() + product.id, week: state.week, category: "negocios", headline: `${company.name} inicia desenvolvimento de ${planned.name}`, body: `${company.ceo} recebeu autorização para investir ${money.format(planned.budget)} no novo produto. O plano reflete uma gestão de ${styleLabel[company.ceoStyle ?? "crescimento"]}.`, impact: "neutro" as const }, ...state.news].slice(0, 60),
    };
  };
  return {
    id: `ceo-product-${company.id}-${product.id}`,
    from: company.ceo ?? "CEO",
    role: `CEO da ${company.name}`,
    initials: (company.ceo ?? "CEO").split(" ").map((part) => part[0]).join("").slice(0, 2).toUpperCase(),
    color: "#6f86a8",
    subject: `Quero lançar ${product.name}`,
    body: `Minha proposta é investir ${money.format(product.budget)} em um produto de ${styleLabel[company.ceoStyle ?? "crescimento"]}. A projeção inicial é de até ${money.format(product.recurring ?? 0)} por semana quando estiver no mercado. Helena anotou que “projeção” é uma palavra empresarial para esperança com planilha.`,
    choices: [
      { label: `Aprovar o projeto · ${money.format(product.budget)}`, tone: "good", result: `${company.ceo} recebeu autorização para desenvolver ${product.name}.`, effect: (state) => startProduct(state) },
      { label: "Autorizar somente um piloto", result: "O plano foi reduzido a um piloto mais barato e menos arriscado.", effect: (state) => startProduct(state, true) },
      { label: "Recusar o produto", tone: "risk", result: `${company.ceo} recebeu a ordem de manter o foco na operação atual.`, effect: (state) => ({ ...state, companies: state.companies.map((item) => item.id !== company.id ? item : ({ ...item, ceoTrust: clamp((item.ceoTrust ?? 65) - 4), ceoLoyalty: clamp((item.ceoLoyalty ?? 65) - 3), ceoProductCooldown: 10, ceoLastDecision: `Teve a proposta ${product.name} recusada`, ceoHistory: [`Semana ${state.week}: proposta de ${product.name} recusada pela holding.`, ...(item.ceoHistory ?? [])].slice(0, 8), ceoMemories: addCharacterMemory(item.ceoMemories, characterMemory(state.week, "produto", "Você recusou o produto que eu considerava importante para minha estratégia.", "frustrado", -7, 72)) })) }) },
    ],
  };
}

function createCEOHireCandidate(company: Company, week: number, style: CEOStyle): Employee {
  const roles: Record<CEOStyle, string[]> = {
    crescimento: ["Comercial", "Marketing", "Parcerias"],
    eficiencia: ["Financeiro", "Operações", "Controladoria"],
    inovacao: ["Engenharia", "Produto", "Pesquisa"],
    pessoas: ["Pessoas e Cultura", "Atendimento", "Desenvolvimento Humano"],
  };
  const traits: Record<CEOStyle, string[]> = {
    crescimento: ["Persuasivo", "Competitivo", "Incansável"],
    eficiencia: ["Analítico", "Disciplinado", "Cauteloso"],
    inovacao: ["Inventivo", "Curioso", "Visionário"],
    pessoas: ["Empático", "Conciliador", "Inspirador"],
  };
  const ambitions: Record<CEOStyle, string[]> = {
    crescimento: ["Quer liderar uma expansão", "Busca bônus por resultado"],
    eficiencia: ["Quer organizar uma operação complexa", "Busca estabilidade e autonomia"],
    inovacao: ["Quer assinar um produto importante", "Busca liberdade para experimentar"],
    pessoas: ["Quer construir uma cultura admirada", "Busca formar novos líderes"],
  };
  const seed = week * 7 + company.id * 11 + company.employees.length * 3;
  const market = createLaborMarket(company.sector, company.id, week, company.employees.map((employee) => employee.name), 12, company);
  const preferredRoles = roles[style];
  const selected = market.find((candidate) => preferredRoles.some((role) => candidate.role.includes(role))) ?? market[seed % market.length];
  const name = selected.name;
  const role = roles[style][seed % roles[style].length];
  const skill = Math.round(clamp(selected.skill + (style === "inovacao" ? 4 : 2), 42, 96));
  const marketSalary = Math.max(selected.market, Math.round((3900 + skill * 38 + (style === "inovacao" ? 700 : 0)) / 100) * 100);
  const salary = Math.round((marketSalary * (0.91 + (seed % 5) / 100)) / 100) * 100;
  return {
    ...selected,
    name,
    role,
    salary,
    market: marketSalary,
    skill,
    talentTier: talentTierFor(skill),
    morale: 76 + (seed % 11),
    loyalty: 58 + (seed % 25),
    trait: traits[style][seed % traits[style].length],
    ambition: ambitions[style][seed % ambitions[style].length],
    color: ["#6f86a8", "#a8758a", "#6f9b82", "#b28a59", "#7d72ad"][seed % 5],
    relation: 52,
    stress: 14 + (seed % 9),
    weeks: 0,
    warnings: 0,
    leaveWeeks: 0,
  };
}

function ceoHireProposalMessage(company: Company, candidate: Employee, reason: string): StoryMessage {
  const hireCandidate = (state: GameState, negotiated = false): GameState => {
    const offeredSalary = negotiated ? Math.round((candidate.salary * .88) / 100) * 100 : candidate.salary;
    const acceptance = clamp(candidateAcceptance(company, { ...candidate, salary: offeredSalary }) + (negotiated ? -8 : 8), 20, 98);
    const accepts = Math.random() * 100 < acceptance;
    const onboardingCost = 2500 + (candidate.signingBonus ?? 0);
    return {
      ...state,
      companies: state.companies.map((item) => {
        if (item.id !== company.id || item.employees.some((employee) => employee.name === candidate.name)) return item;
        if (!accepts) return {
          ...item,
          ceoTrust: clamp((item.ceoTrust ?? 65) - 1),
          ceoHireCooldown: 5,
          employerBrand: clamp((item.employerBrand ?? 35) - .4),
          rejectedCandidates: [{ name: candidate.name, untilWeek: state.week + 8 }, ...(item.rejectedCandidates ?? [])].slice(0, 12),
          ceoLastDecision: `${candidate.name} recusou a contraproposta da holding`,
          ceoHistory: [`Semana ${state.week}: contraproposta de ${money.format(offeredSalary)} recusada por ${candidate.name}.`, ...(item.ceoHistory ?? [])].slice(0, 8),
        };
        return {
          ...item,
          cash: item.cash - onboardingCost,
          employerBrand: clamp((item.employerBrand ?? 35) + .6),
          employees: [...item.employees, {
            ...candidate,
            salary: offeredSalary,
            morale: negotiated ? clamp(candidate.morale - 3) : candidate.morale,
            loyalty: negotiated ? clamp(candidate.loyalty - 4) : candidate.loyalty,
            relation: negotiated ? 46 : 55,
            memories: [characterMemory(state.week, "contratacao", negotiated ? "Aceitei entrar depois de uma negociação dura com a holding." : `A holding aprovou minha contratação indicada por ${company.ceo}.`, negotiated ? "cauteloso" : "confiante", negotiated ? 1 : 5, 68)],
          }],
          workforceTarget: Math.max(item.workforceTarget ?? item.employees.length, item.employees.length + 1),
          ceoTrust: clamp((item.ceoTrust ?? 65) + (negotiated ? 1 : 4)),
          ceoLoyalty: clamp((item.ceoLoyalty ?? 65) + (negotiated ? 0 : 2)),
          ceoHireCooldown: 12,
          ceoLastDecision: `Contratou ${candidate.name} para ${candidate.role}`,
          ceoHistory: [`Semana ${state.week}: ${candidate.name} contratado para ${candidate.role} por ${money.format(offeredSalary)} mensais.`, ...(item.ceoHistory ?? [])].slice(0, 8),
          ceoMemories: addCharacterMemory(item.ceoMemories, characterMemory(state.week, "contratacao", negotiated ? "Você negociou minha indicação, mas permitiu reforçar a equipe." : "Você confiou na pessoa que indiquei para reforçar a equipe.", negotiated ? "cauteloso" : "grato", negotiated ? 2 : 7, 70)),
        };
      }),
      news: accepts ? [{ id: Date.now() + candidate.id, week: state.week, category: "pessoas" as const, headline: `${candidate.name} reforça a ${company.name}`, body: `${company.ceo} convenceu a holding a contratar um profissional de ${candidate.role.toLowerCase()} por ${money.format(offeredSalary)} mensais.`, impact: "positivo" as const }, ...state.news].slice(0, 60) : state.news,
      staffAlerts: accepts ? (state.staffAlerts ?? []).map((alert) => alert.companyId === company.id && !alert.resolved ? { ...alert, resolved: true } : alert) : state.staffAlerts,
      log: [accepts ? `${candidate.name} aceitou entrar na ${company.name} por ${money.format(offeredSalary)} mensais.` : `${candidate.name} recusou a contraproposta de ${money.format(offeredSalary)} mensais.`, ...state.log].slice(0, 40),
    };
  };
  return {
    id: `ceo-hire-${company.id}-${candidate.id}`,
    from: company.ceo ?? "CEO",
    role: `CEO da ${company.name}`,
    initials: (company.ceo ?? "CEO").split(" ").map((part) => part[0]).join("").slice(0, 2).toUpperCase(),
    color: "#6f86a8",
    subject: `Quero contratar ${candidate.name}`,
    body: `${reason} Encontrei ${candidate.name}, ${candidate.trait.toLowerCase()}, com competência ${candidate.skill}% para ${candidate.role}. A pretensão é ${money.format(candidate.salary)} por mês, abaixo do valor de mercado de ${money.format(candidate.market)}. Helena lembra que “candidato perfeito” costuma durar até a segunda-feira de integração.`,
    choices: [
      { label: `Aprovar contratação · ${money.format(candidate.salary)}/mês`, tone: "good", hint: "R$ 9 mil de integração · contratação garantida", result: `${company.ceo} recebeu autorização para fechar a contratação.`, effect: (state) => hireCandidate(state) },
      { label: `Oferecer ${money.format(Math.round((candidate.salary * .88) / 100) * 100)}/mês`, hint: "Economiza na folha · existe risco de recusa", result: `${company.ceo} apresentará uma contraproposta ao candidato.`, effect: (state) => hireCandidate(state, true) },
      { label: "Não contratar agora", tone: "risk", hint: "Preserva o caixa · CEO e equipe podem se frustrar", result: `${company.ceo} terá de operar com a equipe atual.`, effect: (state) => ({ ...state, companies: state.companies.map((item) => item.id !== company.id ? item : ({ ...item, ceoTrust: clamp((item.ceoTrust ?? 65) - 4), ceoLoyalty: clamp((item.ceoLoyalty ?? 65) - 2), ceoHireCooldown: 8, ceoLastDecision: `Teve a contratação de ${candidate.name} recusada`, ceoHistory: [`Semana ${state.week}: contratação para ${candidate.role} recusada pela holding.`, ...(item.ceoHistory ?? [])].slice(0, 8), ceoMemories: addCharacterMemory(item.ceoMemories, characterMemory(state.week, "contratacao", "Você recusou o reforço que considerei necessário para cumprir minha meta.", "magoado", -6, 72)) })) }) },
    ],
  };
}

type PartnerStrategy = "aceitar" | "equilibrio" | "pressionar" | "relacionamento" | "encerrar";

function resolvePartnerStrategy(partner: BusinessPartner, strategy: PartnerStrategy, power: number, actor: string, week = 0): BusinessPartner {
  const early = partner.status === "ativo" && partner.weeksLeft > 2;
  const cooldown = week > 0 && week - (partner.lastNegotiationWeek ?? -99) < 4;
  const relationshipBlocked = (partner.relationshipCooldownUntil ?? 0) > week;
  if (strategy === "encerrar") return { ...partner, status: "encerrado", weeksLeft: 0, trust: clamp(partner.trust - 22), lastNegotiationWeek: week, lastNegotiatedBy: actor, lastEvent: `${actor} rescindiu o contrato antes do encerramento natural.` };
  if (cooldown || strategy === "relacionamento" && relationshipBlocked) return { ...partner, lastEvent: `A contraparte recusou reabrir a mesa tão cedo. Nova tentativa após a semana ${Math.max((partner.lastNegotiationWeek ?? week) + 4, partner.relationshipCooldownUntil ?? 0)}.` };

  const age = Math.max(0, week - (partner.signedWeek ?? 0));
  const earlyPenalty = early ? clamp(18 + partner.weeksLeft * 1.35 + Math.max(0, 5 - age) * 5, 18, 58) : 0;
  const repeatPenalty = (partner.failedRenegotiations ?? 0) * 8;
  const effectivePower = clamp(power - earlyPenalty - repeatPenalty);
  const earlySuccessChance = clamp(.16 + effectivePower / 135, .08, .78);
  if (early && Math.random() > earlySuccessChance) {
    const termination = effectivePower < 28 && Math.random() < .42 || (partner.failedRenegotiations ?? 0) >= 2 && Math.random() < .35;
    return {
      ...partner,
      status: termination ? "encerrado" : "ativo",
      weeksLeft: termination ? 0 : partner.weeksLeft,
      trust: clamp(partner.trust - (termination ? 28 : 17)),
      lastNegotiationWeek: week,
      failedRenegotiations: (partner.failedRenegotiations ?? 0) + 1,
      disputeLevel: clamp((partner.disputeLevel ?? 0) + 18),
      disputeReason: "A contraparte considerou desleal reabrir um contrato recém-assinado.",
      lastNegotiatedBy: actor,
      lastEvent: termination ? `A tentativa prematura de ${actor} provocou a rescisão do contrato.` : `A renegociação prematura fracassou e derrubou a confiança na relação.`,
    };
  }
  if (strategy === "relacionamento") {
    const trustGain = Math.max(2, Math.round(10 * (1 - partner.trust / 125)));
    return { ...partner, status: "ativo", weeksLeft: Math.min(20, Math.max(partner.weeksLeft, partner.proposedWeeks ?? 0) + (early ? 0 : 2)), trust: clamp(partner.trust + trustGain), weeklyValue: partner.proposedValue ?? partner.weeklyValue, disputeLevel: Math.max(0, (partner.disputeLevel ?? 0) - 12), signedWeek: early ? partner.signedWeek : week, lastNegotiationWeek: week, relationshipCooldownUntil: week + 6, failedRenegotiations: 0, lastNegotiatedBy: actor, lastEvent: `${actor} investiu na relação. O ganho de confiança foi de ${trustGain} pontos e não poderá ser repetido por seis semanas.` };
  }
  if (strategy === "aceitar") return { ...partner, status: "ativo", weeksLeft: partner.proposedWeeks ?? 16, weeklyValue: partner.proposedValue ?? partner.weeklyValue, trust: clamp(partner.trust + 4), disputeLevel: 0, signedWeek: week, lastNegotiationWeek: week, failedRenegotiations: 0, lastNegotiatedBy: actor, lastEvent: `${actor} aceitou a proposta comercial apresentada.` };
  if (strategy === "equilibrio") return { ...partner, status: "ativo", weeksLeft: early ? Math.max(12, partner.weeksLeft) : 18, weeklyValue: Math.round((partner.proposedValue ?? partner.weeklyValue) * (partner.kind === "cliente" ? 1.025 : 1.018)), trust: clamp(partner.trust + (early ? 0 : 3)), disputeLevel: 0, signedWeek: week, lastNegotiationWeek: week, failedRenegotiations: 0, lastNegotiatedBy: actor, lastEvent: `${actor} fechou uma renovação equilibrada para os dois lados.` };
  const threshold = partner.personality === "exigente" ? 65 : partner.personality === "oportunista" ? 60 : 53;
  const success = Math.random() * 100 < clamp(46 + (effectivePower - threshold) * 1.35, 7, 86);
  return success
    ? { ...partner, status: "ativo", weeksLeft: early ? Math.max(10, partner.weeksLeft) : Math.max(14, partner.proposedWeeks ?? partner.weeksLeft), weeklyValue: Math.round((partner.proposedValue ?? partner.weeklyValue) * (partner.kind === "cliente" ? 1.1 : .91)), trust: clamp(partner.trust - (early ? 13 : 9)), disputeLevel: 0, signedWeek: week, lastNegotiationWeek: week, failedRenegotiations: 0, lastNegotiatedBy: actor, lastEvent: `${actor} impôs condições melhores, mas deixou desgaste na mesa.` }
    : { ...partner, status: early ? "ativo" : "disputa", weeksLeft: early ? partner.weeksLeft : 0, trust: clamp(partner.trust - 16), disputeLevel: clamp((partner.disputeLevel ?? 20) + 25), failedRenegotiations: (partner.failedRenegotiations ?? 0) + 1, lastNegotiationWeek: week, disputeReason: partner.kind === "cliente" ? "O cliente acusa a empresa de tentar alterar preço e escopo unilateralmente." : "O fornecedor rejeitou cortes e ameaça suspender entregas.", lastNegotiatedBy: actor, lastEvent: `A pressão de ${actor} fracassou e abriu uma disputa contratual.` };
}

function ceoContractProposalMessage(company: Company, partner: BusinessPartner, strategy: PartnerStrategy, power: number): StoryMessage {
  const actor = company.ceo ?? "CEO";
  const apply = (state: GameState, chosen: PartnerStrategy): GameState => ({
    ...state,
    companies: state.companies.map((item) => item.id !== company.id ? item : ({
      ...item,
      cash: item.cash - (chosen === "relacionamento" ? 15000 : 0),
      partners: (item.partners ?? []).map((candidate) => candidate.id === partner.id ? resolvePartnerStrategy(candidate, chosen, power, actor, state.week) : candidate),
      ceoTrust: clamp((item.ceoTrust ?? 65) + (chosen === strategy ? 4 : chosen === "encerrar" ? -3 : 1)),
      ceoLastDecision: `${chosen === "pressionar" ? "Pressionou" : chosen === "encerrar" ? "Rompeu" : "Negociou"} contrato com ${partner.name}`,
      ceoHistory: [`Semana ${state.week}: ${actor} conduziu negociação com ${partner.name}.`, ...(item.ceoHistory ?? [])].slice(0, 8),
    })),
    news: [{ id: Date.now() + partner.id.length, week: state.week, category: "negocios", headline: `${actor} fecha negociação com ${partner.name}`, body: `A estratégia de ${chosen} alterou valor, prazo, confiança e risco do contrato da ${company.name}.`, impact: chosen === "pressionar" ? "neutro" : chosen === "encerrar" ? "negativo" : "positivo" }, ...state.news].slice(0, 60),
  });
  return {
    id: `ceo-contract-${company.id}-${partner.id}`,
    from: actor, role: `CEO da ${company.name}`, initials: actor.split(" ").map((part) => part[0]).join("").slice(0, 2), color: "#6f86a8",
    subject: `${partner.name} colocou o contrato na mesa`,
    body: `${partner.representative} representa um ${partner.kind} de perfil ${partner.personality}. Minha recomendação é ${strategy === "pressionar" ? "usar nossa força para melhorar as condições" : strategy === "relacionamento" ? "ceder agora para proteger a relação" : strategy === "aceitar" ? "aceitar antes que a proposta expire" : "buscar um acordo equilibrado"}. Estimo nosso poder de negociação em ${Math.round(power)}%.`,
    choices: [
      { label: `Seguir recomendação: ${strategy}`, tone: "good", result: `${actor} recebeu autorização para conduzir a estratégia recomendada.`, effect: (state) => apply(state, strategy) },
      { label: "Exigir acordo equilibrado", result: "O CEO recebeu limites para fechar um acordo sem confronto.", effect: (state) => apply(state, "equilibrio") },
      { label: "Mandar pressionar", tone: "risk", hint: "Pode melhorar muito o acordo ou iniciar uma disputa", result: "O CEO levou condições duras para a mesa.", effect: (state) => apply(state, "pressionar") },
    ],
  };
}

function employeeProductIdeaMessage(
  employee: Employee,
  company: Company,
  economy: Economy,
  week: number,
): StoryMessage {
  const ideaNames: Record<Sector, string[]> = {
    Tecnologia: ["Projeto Faísca", "Nexo Pocket", "Assistente Aurora", "Central Pulse"],
    Alimentação: ["Caixa Surpresa", "Menu da Madrugada", "Clube do Sabor", "Receita Secreta"],
    Varejo: ["Coleção Bastidores", "Clube Achados", "Linha Virada", "Provador em Casa"],
    Agência: ["Campanha Sem Reunião", "Estúdio Relâmpago", "Marca em 7 Dias", "Projeto Holofote"],
  };
  const name = ideaNames[company.sector][(week + employee.id) % ideaNames[company.sector].length];
  const baseSuccess = Math.round(clamp(
    employee.skill * .48 +
      employee.morale * .18 +
      employee.loyalty * .1 +
      employee.relation * .12 +
      economy.confidence * .12 -
      7,
    22,
    86,
  ));
  const budget = Math.round((11000 + employee.skill * 260) / 1000) * 1000;
  const recurring = Math.round((6500 + employee.skill * 175) / 500) * 500;
  const makeProject = (pilot: boolean): Project => {
    const successChance = clamp(baseSuccess + (pilot ? 9 : 0), 20, 92);
    const promising = Math.random() * 100 <= successChance;
    return {
      id: Date.now() + employee.id + week,
      name: pilot ? `${name} · protótipo` : name,
      progress: pilot ? 12 : 0,
      quality: promising ? 58 + Math.round(employee.skill / 8) : 34 + Math.round(employee.skill / 12),
      budget: pilot ? Math.round(budget * .55) : budget,
      reward: promising ? Math.round(recurring * 2.1) : Math.round(recurring * .7),
      risk: promising ? Math.max(14, 52 - Math.round(successChance / 2)) : Math.min(82, 102 - successChance),
      status: "ativo",
      kind: "produto",
      recurring: promising ? recurring : Math.round(recurring * .32),
      lifecycle: "desenvolvimento",
      marketStage: "lancamento",
      marketWeeks: 0,
      productPrice: company.price,
      productMarketing: 0,
      version: 1,
      patented: false,
      rightsOwned: 100,
      royaltyRevenue: 0,
      proposedByEmployeeId: employee.id,
      proposedByEmployeeName: employee.name,
      estimatedSuccess: Math.round(successChance),
    };
  };
  const accept = (state: GameState, pilot: boolean): GameState => {
    const project = makeProject(pilot);
    return {
      ...state,
      companies: state.companies.map((item) => item.id !== company.id ? item : ({
        ...item,
        cash: item.cash - project.budget,
        projects: [...item.projects, project],
        employees: item.employees.map((person) => person.id !== employee.id ? person : ({
          ...person,
          morale: clamp(person.morale + (pilot ? 5 : 10)),
          loyalty: clamp(person.loyalty + (pilot ? 4 : 8)),
          relation: clamp(person.relation + (pilot ? 5 : 10)),
          memories: addCharacterMemory(person.memories, characterMemory(state.week, "produto", pilot ? "Você permitiu que eu provasse minha ideia em pequena escala." : "Você confiou na minha ideia e colocou recursos para transformá-la em produto.", pilot ? "confiante" : "orgulhoso", pilot ? 6 : 11, pilot ? 68 : 86)),
        })),
      })),
      news: [{ id: Date.now() + project.id, week: state.week, category: "pessoas", headline: `${employee.name} convence ${company.name} a testar ${project.name}`, body: `A ideia nasceu dentro da equipe e recebeu ${money.format(project.budget)}. A estimativa interna apontava ${Math.round(project.estimatedSuccess ?? baseSuccess)}% de chance de sucesso.`, impact: "neutro" as const }, ...state.news].slice(0, 60),
    };
  };
  return {
    id: `employee-product-${company.id}-${employee.id}-${week}`,
    from: employee.name,
    role: `${employee.role} · ${company.name}`,
    initials: employee.initials,
    color: employee.color,
    subject: `Eu tive uma ideia: ${name}`,
    body: `Preparei uma proposta de ${money.format(budget)}. Pelos testes iniciais, vejo ${baseSuccess}% de chance de dar certo e ${100 - baseSuccess}% de dar errado. Se funcionar, pode gerar cerca de ${money.format(recurring)} por semana. Helena disse que a coragem da ideia é inversamente proporcional ao número de slides.`,
    choices: [
      { label: `Apostar na ideia · ${money.format(budget)}`, tone: "good", hint: `${baseSuccess}% de sucesso · melhora forte na relação`, result: `${employee.name} recebeu sinal verde para transformar a ideia em produto.`, effect: (state) => accept(state, false) },
      { label: `Pedir um protótipo · ${money.format(Math.round(budget * .55))}`, hint: `${Math.min(92, baseSuccess + 9)}% de sucesso · ganho moderado de confiança`, result: `${employee.name} poderá provar a ideia com menos dinheiro e risco.`, effect: (state) => accept(state, true) },
      { label: "Não vamos fazer isso", tone: "risk", hint: "Sem custo · moral, lealdade e relação podem cair", result: `${employee.name} guardou a apresentação — e não pareceu feliz com a decisão.`, effect: (state) => ({ ...state, companies: state.companies.map((item) => item.id !== company.id ? item : ({ ...item, employees: item.employees.map((person) => person.id !== employee.id ? person : ({ ...person, morale: clamp(person.morale - 6), loyalty: clamp(person.loyalty - 5), relation: clamp(person.relation - 7), memories: addCharacterMemory(person.memories, characterMemory(state.week, "produto", "Você recusou a ideia em que eu acreditava sem me dar espaço para testá-la.", "magoado", -9, 78)) })) })) }) },
    ],
  };
}

function newCompany(sector: Sector, id = 1, week = 1): Company {
  const data = sectorData[sector];
  const foundingTeam =
    id === 1
      ? basePeople
      : createLaborMarket(sector, id, week, [], 8)
          .slice(0, 2)
          .map((e, index) => ({
            ...e,
            id: e.id + index,
            morale: 72 + Math.round(Math.random() * 15),
            loyalty: 48 + Math.round(Math.random() * 35),
            stress: 16 + Math.round(Math.random() * 18),
            weeks: 0,
            warnings: 0,
          }));
  return {
    id,
    name: data.company,
    sector,
    cash: id === 1 ? 120000 : 0,
    debt: 0,
    customers: data.customers,
    reputation: 42,
    culture: "Equilíbrio",
    price: data.price,
    marketing: 7000,
    employees: foundingTeam.map((employee) => ({
      ...employee,
      department: employee.department ?? inferDepartment(employee.role),
    })),
    projects: [
      {
        id: Date.now(),
        name:
          sector === "Tecnologia"
            ? "Lançar versão 1.0"
            : sector === "Alimentação"
              ? "Cardápio assinatura"
              : sector === "Varejo"
                ? "Coleção própria"
                : "Conquistar cliente âncora",
        progress: 8,
        quality: 55,
        budget: 12000,
        reward: 42000,
        risk: 28,
        status: "ativo",
        kind: sector === "Agência" ? "contrato" : "produto",
        recurring: sector === "Agência" ? 0 : 12500,
        lifecycle: "desenvolvimento",
        marketStage: "lancamento",
        marketWeeks: 0,
        productPrice: data.price,
        productMarketing: 0,
        version: 1,
        patented: false,
        rightsOwned: 100,
        royaltyRevenue: 0,
        complexity: 2,
        ...productBlueprint(sector, 2),
        preparation: {},
        bugLevel: 0,
        customerSatisfaction: 70,
        updateNeed: 0,
        supportLevel: 0,
        feedback: [],
      },
    ],
    history: [id === 1 ? 120000 : 0],
    founded: week,
    founderEquity: 100,
    ceo: "Alex",
    boardSupport: 82,
    investors: [],
    productRevenue: 0,
    efficiency: 1,
    campaignWeeks: 0,
    marketingCampaigns: [],
    origin: "fundada",
    autonomy: "centralizada",
    dividendRate: 0,
    sharedServices: false,
    ceoStyle: "crescimento",
    ceoGoal: "receita",
    ceoBudget: 15000,
    ceoTrust: 75,
    ceoInfluence: 20,
    ceoTenure: 0,
    ceoLastDecision: "Fundador conduz a operação",
    ceoHistory: [],
    ceoLoyalty: 100,
    ceoAmbition: 25,
    ceoReputation: 65,
    ceoEquity: 0,
    ceoDemandCooldown: 0,
    ceoProductCooldown: 0,
    ceoHireCooldown: 0,
    workforceTarget: foundingTeam.length,
    partners: createBusinessPartners(sector, id),
    directors: [],
    facilities: {},
    facilityMaintenanceMode: "adequado",
    employerBrand: 32,
    rejectedCandidates: [],
  };
}

const initialState: GameState = {
  started: false,
  founder: "Alex",
  week: 1,
  chapter: 1,
  personalCash: 18000,
  companies: [],
  activeCompanyId: 1,
  unread: [],
  log: [],
  rivalScore: 18,
  reputation: 12,
  legacy: 0,
  lastOffer: 0,
  competitors: [],
  news: [],
  economy: {
    cycle: "estavel",
    demand: 1,
    costs: 1,
    interest: 0.009,
    confidence: 62,
    weeksLeft: 16,
  },
  providers: [],
  balanceVersion: 3,
  difficulty: "executivo",
  difficultyApplied: "executivo",
  holdingName: "Grupo Alex",
  lastNarrativeWeek: 0,
  narrativeHistory: [],
  completedMissions: [],
  survivedRecessions: 0,
  ceoComebacks: 0,
  auditCases: [],
  founderStartAge: 32,
  lifeGoal: "dinastia",
  lifeGoalCompleted: false,
  heirs: createHeirs("Alex Silva"),
  founderRetired: false,
  successionHistory: [],
  lastFamilyEventWeek: 0,
  playerExecutive: "Alex",
  dynastyMode: false,
  generation: 1,
  dynastyLegitimacy: 100,
  dynastyGoal: "preservar",
  familyUnity: 78,
  founderHealth: 100,
  founderDeceased: false,
  willPolicy: "controle",
  founderHoldingEquity: 100,
  familyFoundationEquity: 0,
  outsideFamilyEquity: 0,
  dynastyHistory: [],
  formerPresidents: [],
  generationArcHistory: [],
  generationMissions: [],
  achievements: [],
  narrativeDirector: { mode: "equilibrio", tension: 28, crisisStreak: 0, quietStreak: 0, lastInterventionWeek: 0, lastReason: "A história está começando." },
  tutorialSeenWeeks: [],
  tutorialCompleted: false,
  seenPageGuides: [],
  mandateReviews: [],
  lastMandateReviewWeek: 0,
  dynastyEndingReady: false,
  dynastyConcluded: false,
  staffAlerts: [],
  lastDynastyEventWeek: 0,
  completedDynastyGoals: [],
  recentNewsTopics: [],
  weeklyReports: [],
  decisionTraces: [],
  financialLedger: [],
  leadershipIdentity: initialLeadershipIdentity,
  identityHistory: [],
  factions: [],
  factionHistory: [],
  annualReviews: [],
  founderPersonal: { health: 82, family: 72, satisfaction: 60, ego: 38, regrets: 8 },
  careerMoments: [],
  lastPersonalEventWeek: 0,
  founderJourneyReady: false,
  founderJourneyComplete: false,
};

const missions: Mission[] = [
  {
    id: "first-product",
    chapter: 1,
    title: "Uma promessa entregue",
    story: "A ideia precisa deixar o quadro e chegar às mãos dos clientes.",
    objective: "Lance seu primeiro produto",
    target: 1,
    rewardCash: 18000,
    rewardLegacy: 3,
    progress: (s) =>
      s.companies.some((c) =>
        c.projects.some(
          (p) => p.kind === "produto" && p.status === "concluido",
        ),
      )
        ? 1
        : 0,
  },
  {
    id: "survive-12",
    chapter: 1,
    title: "Doze semanas de coragem",
    story:
      "Sobreviver também é uma forma de vencer quando todos esperam seu fracasso.",
    objective: "Chegue à semana 12",
    target: 12,
    rewardCash: 30000,
    rewardLegacy: 4,
    progress: (s) => Math.min(12, s.week),
  },
  {
    id: "team-trust",
    chapter: 2,
    title: "Agora dependem de você",
    story: "Uma empresa deixa de ser ideia quando outras pessoas passam a planejar a vida ao redor dela.",
    objective: "Tenha 3 funcionários e lealdade média de 55%",
    target: 1,
    unlockWeek: 13,
    rewardCash: 40000,
    rewardLegacy: 5,
    progress: (s) => { const people = s.companies.flatMap((c) => c.employees); return people.length >= 3 && people.reduce((sum, person) => sum + person.loyalty, 0) / people.length >= 55 ? 1 : 0; },
  },
  {
    id: "first-cycle",
    chapter: 3,
    title: "O primeiro grande ciclo",
    story: "Você já viveu tempo suficiente para descobrir que toda estratégia parece melhor antes dos resultados.",
    objective: "Chegue à semana 31 com uma empresa em operação",
    target: 31,
    unlockWeek: 25,
    rewardCash: 55000,
    rewardLegacy: 6,
    progress: (s) => s.companies.some((c) => !c.sold && !c.bankrupt && !c.closed) ? Math.min(31, s.week) : 0,
  },
  {
    id: "public-promise",
    chapter: 3,
    title: "Sua palavra agora tem preço",
    story: "O mercado começou a guardar o que você promete — e a comparar com o que entrega.",
    objective: "Defina um plano anual ou conclua uma grande venda",
    target: 1,
    unlockWeek: 31,
    rewardCash: 70000,
    rewardLegacy: 7,
    progress: (s) => s.annualPlan || s.annualReviews?.length || s.companies.some((c) => c.sold) ? 1 : 0,
  },
  {
    id: "million-company",
    chapter: 4,
    title: "O primeiro milhão",
    story: "O mercado finalmente reconhece que sua empresa deixou de ser apenas uma aposta.",
    objective: "Tenha uma empresa avaliada em R$ 1 milhão",
    target: 1000000,
    unlockWeek: 45,
    rewardCash: 85000,
    rewardLegacy: 8,
    progress: (s) => Math.max(0, ...s.companies.filter((c) => !c.sold && !c.bankrupt && !c.closed).map((c) => companyMetrics(c, s.economy).valuation)),
  },
  {
    id: "holding-or-delegation",
    chapter: 4,
    title: "Você não cabe mais em todas as salas",
    story: "Crescer significa aceitar que outras pessoas tomarão decisões usando o nome que você construiu.",
    objective: "Controle 2 empresas ou delegue uma empresa a outro CEO",
    target: 1,
    unlockWeek: 53,
    rewardCash: 110000,
    rewardLegacy: 10,
    progress: (s) => s.companies.filter((c) => !c.sold && !c.bankrupt && !c.closed).length >= 2 || s.companies.some((c) => c.ceo !== (s.playerExecutive ?? s.founder)) ? 1 : 0,
  },
  {
    id: "political-test",
    chapter: 5,
    title: "O poder também manda boletos",
    story: "Conselho, CEOs e facções descobriram que sua assinatura não encerra toda discussão.",
    objective: "Tome uma decisão com uma facção ou atravesse uma auditoria",
    target: 1,
    unlockWeek: 70,
    rewardCash: 130000,
    rewardLegacy: 11,
    progress: (s) => (s.factionHistory?.length ?? 0) > 0 || (s.auditCases?.length ?? 0) > 0 ? 1 : 0,
  },
  {
    id: "survive-crisis",
    chapter: 5,
    title: "Depois da tempestade",
    story: "A carreira deixou marcas, mas a luz do escritório ainda está acesa.",
    objective: "Atravesse uma recessão, falência ou recuperação empresarial",
    target: 1,
    unlockWeek: 81,
    rewardCash: 160000,
    rewardLegacy: 13,
    progress: (s) => (s.survivedRecessions ?? 0) > 0 || s.companies.some((c) => c.bankrupt) || s.news.some((item) => /recupera|reestrutura|crédito emergencial/i.test(item.headline)) ? 1 : 0,
  },
  {
    id: "personal-price",
    chapter: 5,
    title: "O homem atrás do cargo",
    story: "Nem toda conta aparece no balanço patrimonial.",
    objective: "Enfrente 4 acontecimentos pessoais",
    target: 4,
    unlockWeek: 81,
    rewardCash: 90000,
    rewardLegacy: 10,
    progress: (s) => (s.careerMoments ?? []).filter((moment) => /família|saúde|reuni|prêmio|patrimônio|funcionário|calendário/i.test(`${moment.title} ${moment.detail}`)).length,
  },
  {
    id: "prepare-legacy",
    chapter: 6,
    title: "Alguém precisa continuar",
    story: "Legado não é permanecer para sempre. É preparar o que acontece quando você não estiver na sala.",
    objective: "Escolha um sucessor ou construa três empresas ativas",
    target: 1,
    unlockWeek: 105,
    rewardCash: 180000,
    rewardLegacy: 15,
    progress: (s) => s.chosenSuccessorId || s.companies.filter((c) => !c.sold && !c.bankrupt && !c.closed).length >= 3 ? 1 : 0,
  },
  {
    id: "final-week",
    chapter: 6,
    title: "A última página ainda é sua",
    story: "Chegou a hora de descobrir qual história suas decisões escreveram.",
    objective: "Chegue à semana 130",
    target: 130,
    unlockWeek: 111,
    rewardCash: 250000,
    rewardLegacy: 20,
    progress: (s) => Math.min(130, s.week),
  },
];

const capitalProviders: CapitalProvider[] = [
  {
    id: "northstar",
    name: "Northstar Capital",
    representative: "Otávio Brandão",
    kind: "fundo",
    profile: "Crescimento rápido, metas agressivas e pouca paciência.",
    color: "#778ad9",
    patience: 38,
    control: 82,
  },
  {
    id: "aurora",
    name: "Aurora Ventures",
    representative: "Manuela Paes",
    kind: "fundo",
    profile: "Valoriza produto, reputação e expansão sustentável.",
    color: "#d982a8",
    patience: 72,
    control: 54,
  },
  {
    id: "prisma",
    name: "Banco Prisma",
    representative: "Eduardo Lins",
    kind: "banco",
    profile:
      "Não quer participação; exige juros, garantias e caixa previsível.",
    color: "#6da88c",
    patience: 50,
    control: 25,
  },
  {
    id: "ponte",
    name: "Ponte Anjos",
    representative: "Celso Andrade",
    kind: "anjo",
    profile: "Apoia fundadores, mas exige transparência e acesso ao conselho.",
    color: "#df9d5d",
    patience: 82,
    control: 42,
  },
];
const executives: {
  name: string;
  style: CEOStyle;
  label: string;
  profile: string;
  risk: string;
  loyalty: number;
  ambition: number;
  reputation: number;
}[] = [
  {
    name: "Renata Siqueira",
    style: "crescimento",
    label: "Crescimento agressivo",
    profile: "Investe em marketing, expansão e aquisição de clientes.",
    risk: "Pode consumir caixa e prometer mais do que entrega.",
    loyalty: 54,
    ambition: 88,
    reputation: 72,
  },
  {
    name: "Marcelo Antunes",
    style: "eficiencia",
    label: "Eficiência financeira",
    profile: "Protege margens, reduz custos e fortalece o caixa.",
    risk: "Cortes podem desgastar equipe e inovação.",
    loyalty: 76,
    ambition: 58,
    reputation: 78,
  },
  {
    name: "Helena Duarte",
    style: "inovacao",
    label: "Produtos e inovação",
    profile: "Acelera projetos, versões e qualidade dos produtos.",
    risk: "Apostas técnicas podem atrasar ou fracassar.",
    loyalty: 67,
    ambition: 72,
    reputation: 82,
  },
  {
    name: "Paula Viana",
    style: "pessoas",
    label: "Pessoas e cultura",
    profile: "Reduz estresse, retém talentos e fortalece reputação.",
    risk: "Resultados financeiros podem demorar mais.",
    loyalty: 84,
    ambition: 46,
    reputation: 70,
  },
];

const rivalNames = [
  ["Atlas & Co.", "Tomás Vale"],
  ["Orbe Labs", "Marina Ferraz"],
  ["Seta Capital", "Davi Nóbrega"],
  ["Mosaico", "Cecília Ramos"],
  ["Arco Norte", "Igor Teles"],
  ["Lumen Group", "Sofia Azevedo"],
  ["Ponto Um", "Renan Vidal"],
  ["Vanguarda", "Alice Moura"],
  ["Nova Rua", "Pedro Salles"],
];
const strategies = [
  "Preço baixo",
  "Marca premium",
  "Crescimento agressivo",
  "Atendimento próximo",
  "Tecnologia própria",
  "Aquisições",
];
const rivalPersonalities: NonNullable<Competitor["personality"]>[] = [
  "visionário",
  "agressivo",
  "conservador",
  "diplomático",
  "oportunista",
];

function rivalProductName(sector: Sector, seed = Math.random()): string {
  const products: Record<Sector, string[]> = {
    Tecnologia: [
      "Plataforma Orbit",
      "Nuvem One",
      "Assistente Lumen",
      "Suite Vector",
    ],
    Alimentação: [
      "Linha Reserva",
      "Menu Essencial",
      "Clube Sabor",
      "Seleção da Casa",
    ],
    Varejo: ["Coleção Norte", "Clube Prime", "Loja Express", "Linha Origem"],
    Agência: [
      "Método Pulso",
      "Studio On",
      "Programa Marca Viva",
      "Sprint Criativo",
    ],
  };
  return products[sector][
    Math.floor(seed * products[sector].length) % products[sector].length
  ];
}

function generateCompetitors(sector: Sector, seed = Date.now()): Competitor[] {
  return rivalNames
    .slice(0)
    .sort(() => Math.sin(seed++))
    .slice(0, 3)
    .map(([name, founder], index) => ({
      id: seed + index,
      name,
      founder,
      sector,
      score: 17 + index * 7 + Math.round(Math.random() * 8),
      reputation: 35 + Math.round(Math.random() * 25),
      strategy: strategies[Math.floor(Math.random() * strategies.length)],
      status: index === 0 ? "crescendo" : "estavel",
      crisisWeeks: 0,
      age: 0,
      cash: 150000 + Math.round(Math.random() * 420000),
      personality: rivalPersonalities[index % rivalPersonalities.length],
      relation: Math.round(Math.random() * 20 - 10),
      relationship: "neutro",
      products: [
        {
          id: seed + index + 100,
          name: rivalProductName(sector, Math.random()),
          quality: 45 + Math.round(Math.random() * 35),
          stage: index === 0 ? "crescimento" : "maduro",
        },
      ],
      history: [`${name} entrou no mercado sob comando de ${founder}.`],
      lastDecision: "Consolidar a operação",
    }));
}

function generateNewCompetitor(
  sector: Sector,
  existing: Competitor[],
  seed = Date.now(),
): Competitor {
  const used = new Set(existing.map((r) => r.name));
  const prefixes = [
    "Núcleo",
    "Cais",
    "Trama",
    "Aflora",
    "Ímpar",
    "Rota",
    "Prisma",
    "Origem",
    "Cubo",
    "Elo",
  ];
  const suffixes = [
    "Brasil",
    "Works",
    "Lab",
    "Companhia",
    "Hub",
    "Negócios",
    "Digital",
    "Sul",
    "Prime",
  ];
  let name = "";
  let attempts = 0;
  while ((!name || used.has(name)) && attempts < 30) {
    name = `${prefixes[Math.floor(Math.random() * prefixes.length)]} ${suffixes[Math.floor(Math.random() * suffixes.length)]}`;
    attempts++;
  }
  const founders = [
    "Laura Campos",
    "André Bastos",
    "Mônica Leal",
    "Gustavo Pires",
    "Tainá Nunes",
    "Leandro Reis",
    "Isabela Vaz",
  ];
  return {
    id: seed,
    name,
    founder: founders[Math.floor(Math.random() * founders.length)],
    sector,
    score: 12 + Math.round(Math.random() * 12),
    reputation: 28 + Math.round(Math.random() * 18),
    strategy: strategies[Math.floor(Math.random() * strategies.length)],
    status: "estavel",
    crisisWeeks: 0,
    age: 0,
    cash: 120000 + Math.round(Math.random() * 260000),
    personality:
      rivalPersonalities[Math.floor(Math.random() * rivalPersonalities.length)],
    relation: Math.round(Math.random() * 16 - 8),
    relationship: "neutro",
    products: [
      {
        id: seed + 100,
        name: rivalProductName(sector, Math.random()),
        quality: 38 + Math.round(Math.random() * 25),
        stage: "lançamento",
      },
    ],
    history: [
      `${name} abriu as portas para ocupar um espaço deixado no setor.`,
    ],
    lastDecision: "Conquistar os primeiros clientes",
  };
}

function rollEconomy(current: Economy): {
  economy: Economy;
  news?: Omit<NewsItem, "id" | "week">;
} {
  const profiles: Record<
    Economy["cycle"],
    Omit<Economy, "cycle" | "nextCycle">
  > = {
    expansao: {
      demand: 1.12,
      costs: 1.04,
      interest: 0.007,
      confidence: 79,
      weeksLeft: 16,
    },
    estavel: {
      demand: 1,
      costs: 1,
      interest: 0.009,
      confidence: 62,
      weeksLeft: 16,
    },
    inflacao: {
      demand: 0.96,
      costs: 1.12,
      interest: 0.012,
      confidence: 48,
      weeksLeft: 14,
    },
    recessao: {
      demand: 0.86,
      costs: 1.04,
      interest: 0.014,
      confidence: 35,
      weeksLeft: 16,
    },
    credito: {
      demand: 0.92,
      costs: 1.03,
      interest: 0.018,
      confidence: 42,
      weeksLeft: 12,
    },
  };
  const transitions: Record<Economy["cycle"], Economy["cycle"][]> = {
    expansao: ["estavel", "inflacao"],
    estavel: ["expansao", "inflacao", "credito"],
    inflacao: ["estavel", "credito", "recessao"],
    credito: ["estavel", "recessao"],
    recessao: ["estavel", "expansao"],
  };
  if (current.weeksLeft === 3 && !current.nextCycle) {
    const options = transitions[current.cycle];
    const nextCycle = options[Math.floor(Math.random() * options.length)];
    const negative = ["inflacao", "recessao", "credito"].includes(nextCycle);
    return {
      economy: { ...current, nextCycle, weeksLeft: 2 },
      news: {
        category: "economia",
        headline: negative
          ? "Indicadores antecipam semanas mais difíceis para as empresas"
          : "Indicadores apontam melhora gradual da atividade",
        body: `Analistas projetam transição para ${nextCycle}. A mudança ainda não aconteceu; empresas têm duas semanas para ajustar caixa, preços e investimentos.`,
        impact: negative ? "negativo" : "positivo",
      },
    };
  }
  if (current.weeksLeft > 1)
    return { economy: { ...current, weeksLeft: current.weeksLeft - 1 } };
  const cycle = current.nextCycle ?? "estavel";
  const profile = profiles[cycle];
  return {
    economy: {
      cycle,
      ...profile,
      weeksLeft: profile.weeksLeft + Math.round(Math.random() * 6),
    },
    news: {
      category: "economia",
      headline: `Economia entra em período de ${cycle}`,
      body: "A transição ocorreu gradualmente e deve durar vários meses, permitindo estratégias mais estáveis.",
      impact: ["inflacao", "recessao", "credito"].includes(cycle)
        ? "negativo"
        : cycle === "expansao"
          ? "positivo"
          : "neutro",
    },
  };
}

function employeeCrisisMessage(
  employee: Employee,
  companyId: number,
): StoryMessage {
  const burnout = (employee.stress ?? 0) > 86;
  const remembered = employee.memories?.[0];
  return {
    id: `employee-${employee.id}-${Date.now()}`,
    from: employee.name,
    role: employee.role,
    initials: employee.initials,
    color: employee.color,
    subject: burnout
      ? "Eu não consigo continuar nesse ritmo"
      : "Precisamos conversar sobre meu lugar aqui",
    body: burnout
      ? `As últimas semanas cobraram caro de ${employee.name}. O cansaço virou irritação e os erros começaram a aparecer. Uma decisão superficial pode apenas adiar a crise.`
      : `${employee.name} sente que a carreira parou. O mercado está fazendo propostas e a lealdade à empresa já não é suficiente.${remembered ? ` A conversa também carrega uma lembrança: “${remembered.text}”` : ""}`,
    choices: [
      {
        label: burnout
          ? "Duas semanas de descanso"
          : "Plano de carreira e promoção",
        result: burnout
          ? `${employee.name} ficará duas semanas afastado e não produzirá nesse período.`
          : `${employee.name} decidiu ficar, mas espera mudanças reais.`,
        effect: (s) => ({
          ...s,
          companies: s.companies.map((c) =>
            c.id !== companyId
              ? c
              : {
                  ...c,
                  employees: c.employees.map((e) =>
                    e.id !== employee.id
                      ? e
                      : {
                          ...e,
                          leaveWeeks: burnout ? 2 : e.leaveWeeks,
                          stress: Math.max(
                            8,
                            (e.stress ?? 30) - (burnout ? 22 : 12),
                          ),
                          morale: clamp(e.morale + 14),
                          loyalty: clamp(e.loyalty + 12),
                          role: burnout ? e.role : `Líder de ${e.role}`,
                          relation: clamp(e.relation + 10),
                          memories: addCharacterMemory(
                            e.memories,
                            characterMemory(
                              s.week,
                              "cuidado",
                              burnout
                                ? "Você respeitou meu limite quando eu estava perto de quebrar."
                                : "Você me ofereceu um caminho de crescimento quando pensei em sair.",
                              "grato",
                              13,
                              92,
                            ),
                          ),
                        },
                  ),
                },
          ),
        }),
      },
      {
        label: "Aumento de 18%",
        result: `O dinheiro reduziu a tensão, mas não resolveu tudo.`,
        effect: (s) => ({
          ...s,
          companies: s.companies.map((c) =>
            c.id !== companyId
              ? c
              : {
                  ...c,
                  employees: c.employees.map((e) =>
                    e.id !== employee.id
                      ? e
                      : {
                          ...e,
                          salary: Math.round(e.salary * 1.18),
                          market: Math.round(e.market * 1.05),
                          stress: Math.max(15, (e.stress ?? 30) - 16),
                          morale: clamp(e.morale + 9),
                          relation: clamp(e.relation + 4),
                          memories: addCharacterMemory(
                            e.memories,
                            characterMemory(
                              s.week,
                              "salario",
                              "Você respondeu à minha crise com dinheiro, mas não resolveu a causa.",
                              "cauteloso",
                              3,
                              58,
                            ),
                          ),
                        },
                  ),
                },
          ),
        }),
      },
      {
        label: "Não há espaço agora",
        tone: "risk",
        result: `${employee.name} pediu demissão e o mercado ficou sabendo.`,
        effect: (s) => ({
          ...s,
          reputation: Math.max(0, s.reputation - 3),
          staffAlerts: [{ id: `staff-${companyId}-${employee.id}-${s.week}`, companyId, companyName: s.companies.find((company) => company.id === companyId)?.name ?? "Empresa", employeeName: employee.name, role: employee.role, reason: "demissao", week: s.week, responsible: s.companies.find((company) => company.id === companyId)?.ceo ?? s.playerExecutive ?? s.founder, headcountAfter: Math.max(0, (s.companies.find((company) => company.id === companyId)?.employees.length ?? 1) - 1) }, ...(s.staffAlerts ?? [])].slice(0, 20),
          companies: s.companies.map((c) =>
            c.id !== companyId
              ? c
              : {
                  ...c,
                  reputation: Math.max(0, c.reputation - 3),
                  employees: c.employees.filter((e) => e.id !== employee.id),
                  projects: c.projects.map((p) =>
                    p.status === "ativo"
                      ? {
                          ...p,
                          progress: Math.max(0, p.progress - 12),
                          risk: clamp(p.risk + 9),
                        }
                      : p,
                  ),
                },
          ),
          news: [
            {
              id: Date.now(),
              week: s.week,
              category: "pessoas",
              headline: `${employee.name} deixa empresa em meio a tensão interna`,
              body: "A saída reacendeu perguntas sobre cultura, carga de trabalho e retenção de talentos.",
              impact: "negativo",
            },
            ...s.news,
          ].slice(0, 40),
        }),
      },
    ],
  };
}

function familyStoryMessage(heir: Heir, state: GameState): StoryMessage {
  const variant = (state.week + heir.id) % 3;
  const updateHeir = (
    game: GameState,
    changes: Partial<Heir>,
    cashCost = 0,
    legacyGain = 0,
    memory?: CharacterMemory,
  ): GameState => ({
    ...game,
    personalCash: Math.max(0, game.personalCash - cashCost),
    legacy: game.legacy + legacyGain,
    lastFamilyEventWeek: game.week,
    heirs: (game.heirs ?? []).map((item) =>
      item.id === heir.id
        ? {
            ...item,
            ...changes,
            history: [
              `Semana ${game.week}: decisão familiar mudou sua preparação.`,
              ...item.history,
            ].slice(0, 6),
            memories: memory ? addCharacterMemory(item.memories, memory) : item.memories,
          }
        : item,
    ),
  });
  return {
    id: `family-${heir.id}-${state.week}`,
    from: heir.name,
    role: `${heir.relationship} · família do fundador`,
    initials: heir.name.split(" ").map((part) => part[0]).join("").slice(0, 2),
    color: "#8b6a45",
    subject:
      variant === 0
        ? "Eu quero entender se existe um lugar para mim"
        : variant === 1
          ? "A holding está ocupando toda a nossa vida"
          : "Não quero herdar um cargo sem estar preparado",
    body: (
      variant === 0
        ? `${heir.name} pede uma oportunidade real para aprender dentro do grupo, mas teme ser visto apenas como herdeiro.`
        : variant === 1
          ? `${heir.name} questiona quanto risco pessoal a família ainda deve assumir para financiar a expansão da holding.`
          : `${heir.name} quer formação independente antes de aceitar qualquer indicação como futuro sucessor.`
      ) + (heir.memories?.[0] ? ` A forma como fala com você também revela uma lembrança: “${heir.memories[0].text}”` : ""),
    choices: [
      {
        label: "Criar programa de formação · R$ 60 mil",
        tone: "good",
        result: `${heir.name} entrou em um programa estruturado de sucessão.`,
        effect: (game) =>
          updateHeir(
            game,
            {
              competence: clamp(heir.competence + 11),
              readiness: clamp(heir.readiness + 13),
              bond: clamp(heir.bond + 7),
              role: "formacao",
            },
            60000,
            3,
            characterMemory(state.week, "reconhecimento", "Você criou um programa sério para me preparar, em vez de apenas prometer um cargo.", "grato", 13, 92),
          ),
      },
      {
        label: "Mandar ganhar experiência fora",
        result: `${heir.name} seguirá uma trajetória independente antes de voltar.`,
        effect: (game) =>
          updateHeir(game, {
            competence: clamp(heir.competence + 8),
            readiness: clamp(heir.readiness + 5),
            ambition: clamp(heir.ambition + 7),
            bond: clamp(heir.bond - 3),
          }, 0, 0, characterMemory(state.week, "familia", "Você preferiu que eu construísse minha própria trajetória antes de voltar.", "cauteloso", 2, 74)),
      },
      {
        label: "Adiar essa conversa",
        tone: "risk",
        result: `A sucessão foi adiada e ${heir.name} se sentiu ignorado.`,
        effect: (game) =>
          updateHeir(game, {
            bond: clamp(heir.bond - 12),
            ambition: clamp(heir.ambition - 4),
          }, 0, 0, characterMemory(state.week, "conflito", "Quando pedi clareza sobre meu futuro, você adiou a conversa.", "magoado", -12, 94)),
      },
    ],
  };
}

function dynastyStoryMessage(state: GameState): StoryMessage {
  const leader = state.playerExecutive ?? state.founder;
  const generation = state.generation ?? 2;
  const relatives = (state.heirs ?? []).filter(
    (heir) => heir.name !== leader && heir.status !== "rompido",
  );
  const politicalPredecessors = (state.formerPresidents ?? []).filter((president) => president.name !== leader && president.influence > 0);
  const predecessor = politicalPredecessors[(state.week + generation) % Math.max(1, politicalPredecessors.length)];
  const relative = relatives[(state.week + generation) % Math.max(1, relatives.length)];
  const variant = state.founderDeceased && state.week % 5 === 0 ? 4 : state.week % 5;
  const changeRelative = (
    game: GameState,
    changes: Partial<Heir>,
  ): GameState => {
    const supportDelta = (changes.support ?? relative?.support ?? 60) - (relative?.support ?? 60);
    const resentmentDelta = (changes.resentment ?? relative?.resentment ?? 10) - (relative?.resentment ?? 10);
    const value = clamp(Math.round(supportDelta - resentmentDelta * 0.7), -16, 16);
    return {
      ...game,
      heirs: (game.heirs ?? []).map((heir) =>
        heir.id === relative?.id ? {
          ...heir,
          ...changes,
          memories: value === 0 ? heir.memories : addCharacterMemory(heir.memories, characterMemory(
            game.week,
            "familia",
            value > 0
              ? "Você considerou meu lugar na família quando o poder e o patrimônio estavam em disputa."
              : "Você protegeu sua posição mesmo sabendo que eu me sentiria deixado de lado.",
            value > 0 ? "grato" : "ressentido",
            value,
            Math.min(100, 72 + Math.abs(value)),
          )),
        } : heir,
      ),
    };
  };
  const base = {
    id: `dynasty-${generation}-${state.week}`,
    initials: variant === 0 ? predecessor?.name.split(" ").map((part) => part[0]).join("").slice(0, 2) ?? "CF" : relative?.name.split(" ").map((part) => part[0]).join("").slice(0, 2) ?? "FC",
    color: "#704c75",
  };
  if (variant === 0 && predecessor) {
    const changePredecessor = (game: GameState, changes: Partial<FormerPresident>): GameState => ({
      ...game,
      formerPresidents: (game.formerPresidents ?? []).map((president) => president.name === predecessor.name ? { ...president, ...changes } : president),
      lastDynastyEventWeek: game.week,
    });
    const comeback = predecessor.status === "oposicao" || predecessor.ambition + predecessor.influence > 125;
    return {
      ...base,
      from: predecessor.name,
      role: `Ex-presidente · geração ${predecessor.generation}`,
      subject: comeback ? "O conselho ainda me escuta. Talvez eu devesse voltar." : "Quero participar das decisões desta geração",
      body: comeback
        ? `${predecessor.name} reuniu aliados e questionou se ${leader} está preparado para continuar. Com ${Math.round(predecessor.influence)}% de influência, uma tentativa de retorno ao poder deixou de ser apenas rumor.`
        : `${predecessor.name} ofereceu apoio público, mas quer espaço nas decisões estratégicas. A relação entre os dois está em ${Math.round(predecessor.relationship)}%.`,
      choices: [
        { label: "Transformar o ex-presidente em aliado", result: `${predecessor.name} apoiará publicamente a nova geração.`, effect: (game) => changePredecessor({ ...game, familyUnity: clamp((game.familyUnity ?? 70) + 8), dynastyLegitimacy: clamp((game.dynastyLegitimacy ?? 45) + 4) }, { status: "aliado", relationship: clamp(predecessor.relationship + 12), influence: clamp(predecessor.influence + 3), lastMove: `Declarou apoio a ${leader}.` }) },
        { label: "Dividir poder no conselho", result: "A crise foi contida, mas o antecessor voltou ao centro das decisões.", effect: (game) => changePredecessor({ ...game, familyUnity: clamp((game.familyUnity ?? 70) + 5), dynastyLegitimacy: clamp((game.dynastyLegitimacy ?? 45) - 5) }, { status: "neutro", relationship: clamp(predecessor.relationship + 7), influence: clamp(predecessor.influence + 12), lastMove: "Conquistou poder formal no conselho." }) },
        { label: "Bloquear a tentativa de retorno", tone: "risk", result: `${leader} venceu a disputa imediata, mas criou uma oposição dentro da família.`, effect: (game) => changePredecessor({ ...game, familyUnity: clamp((game.familyUnity ?? 70) - 9), dynastyLegitimacy: clamp((game.dynastyLegitimacy ?? 45) + 8) }, { status: "oposicao", relationship: clamp(predecessor.relationship - 18), influence: clamp(predecessor.influence - 11), lastMove: `Foi afastado por ${leader} e começou a organizar oposição.` }) },
      ],
    };
  }
  if (variant === 1 && relative)
    return {
      ...base,
      from: relative.name,
      role: "Acionista da família",
      subject: "Eu não aceitei ser apenas figurante",
      body: `${relative.name} exige mais participação ou o comando de uma subsidiária. A imprensa já ouviu rumores sobre a disputa.`,
      choices: [
        { label: "Entregar mais 5% das ações", result: `${relative.name} ganhou espaço societário e reduziu a pressão.`, effect: (game) => changeRelative({ ...game, founderHoldingEquity: Math.max(0, (game.founderHoldingEquity ?? 0) - 5), familyUnity: clamp((game.familyUnity ?? 70) + 7), lastDynastyEventWeek: game.week }, { equity: (relative.equity ?? 0) + 5, resentment: clamp((relative.resentment ?? 10) - 14), support: clamp((relative.support ?? 60) + 10) }) },
        { label: "Entregar uma subsidiária", result: `${relative.name} recebeu uma empresa para provar sua capacidade.`, effect: (game) => ({ ...changeRelative(game, { role: "conselho", readiness: clamp(relative.readiness + 12), resentment: clamp((relative.resentment ?? 10) - 8) }), companies: game.companies.map((company, index) => index === game.companies.findIndex((candidate) => !candidate.sold && !candidate.bankrupt && !candidate.closed && candidate.ceo !== leader) ? { ...company, ceo: relative.name, ceoStyle: relative.style, autonomy: "independente" } : company), familyUnity: clamp((game.familyUnity ?? 70) + 4), lastDynastyEventWeek: game.week }) },
        { label: "Recusar e enfrentar a disputa", tone: "risk", result: "A rivalidade familiar ficou aberta.", effect: (game) => changeRelative({ ...game, familyUnity: clamp((game.familyUnity ?? 70) - 15), dynastyLegitimacy: clamp((game.dynastyLegitimacy ?? 45) + 4), lastDynastyEventWeek: game.week }, { resentment: clamp((relative.resentment ?? 10) + 24), support: clamp((relative.support ?? 60) - 18) }) },
      ],
    };
  if (variant === 2)
    return {
      ...base,
      from: "Comitê de auditoria",
      role: "Governança da holding",
      subject: "Uma decisão antiga do fundador voltou",
      body: "Uma garantia assinada anos atrás pode obrigar o grupo a pagar R$ 140 mil. Esconder o documento preserva o caixa agora, mas aumenta o risco jurídico.",
      choices: [
        { label: "Pagar e encerrar · R$ 140 mil", result: "A dívida histórica foi encerrada com transparência.", effect: (game) => ({ ...game, personalCash: Math.max(0, game.personalCash - 140000), dynastyLegitimacy: clamp((game.dynastyLegitimacy ?? 45) + 7), legacy: game.legacy + 3, lastDynastyEventWeek: game.week }) },
        { label: "Responsabilizar publicamente o fundador", tone: "risk", result: "A nova geração protegeu o caixa, mas rompeu parte do legado.", effect: (game) => ({ ...game, reputation: clamp(game.reputation - 5), familyUnity: clamp((game.familyUnity ?? 70) - 13), dynastyLegitimacy: clamp((game.dynastyLegitimacy ?? 45) + 5), lastDynastyEventWeek: game.week }) },
        { label: "Contestar judicialmente · R$ 55 mil", result: "A disputa foi levada aos advogados e continuará sendo observada.", effect: (game) => ({ ...game, personalCash: Math.max(0, game.personalCash - 55000), dynastyLegitimacy: clamp((game.dynastyLegitimacy ?? 45) + 2), lastDynastyEventWeek: game.week }) },
      ],
    };
  if (variant === 3 && relative)
    return {
      ...base,
      from: relative.name,
      role: "Conselho de família",
      subject: "A família quer dividendos agora",
      body: "Parte da família afirma que a holding existe para proteger seus membros, não apenas para reinvestir indefinidamente.",
      choices: [
        { label: "Distribuir R$ 100 mil", result: "A distribuição comprou paz familiar no curto prazo.", effect: (game) => changeRelative({ ...game, personalCash: Math.max(0, game.personalCash - 100000), familyUnity: clamp((game.familyUnity ?? 70) + 12), lastDynastyEventWeek: game.week }, { support: clamp((relative.support ?? 60) + 12), resentment: clamp((relative.resentment ?? 10) - 10) }) },
        { label: "Reinvestir na holding", result: "A geração atual priorizou crescimento e enfrentará cobranças familiares.", effect: (game) => changeRelative({ ...game, dynastyLegitimacy: clamp((game.dynastyLegitimacy ?? 45) + 6), familyUnity: clamp((game.familyUnity ?? 70) - 8), lastDynastyEventWeek: game.week }, { resentment: clamp((relative.resentment ?? 10) + 12) }) },
        { label: "Negociar dividendos por metas", result: "A família aceitou vincular pagamentos ao desempenho.", effect: (game) => changeRelative({ ...game, familyUnity: clamp((game.familyUnity ?? 70) + 4), dynastyLegitimacy: clamp((game.dynastyLegitimacy ?? 45) + 3), lastDynastyEventWeek: game.week }, { support: clamp((relative.support ?? 60) + 5) }) },
      ],
    };
  return {
    ...base,
    from: "Conselho da holding",
    role: "Representantes de investidores e funcionários",
    subject: "Seu sobrenome não basta",
    body: `${leader} assumiu por sucessão, mas funcionários e investidores querem resultados que provem sua legitimidade.`,
    choices: [
      { label: "Visitar todas as operações · R$ 50 mil", result: "A presença direta aumentou confiança na nova liderança.", effect: (game) => ({ ...game, personalCash: Math.max(0, game.personalCash - 50000), dynastyLegitimacy: clamp((game.dynastyLegitimacy ?? 45) + 12), companies: game.companies.map((company) => ({ ...company, boardSupport: clamp((company.boardSupport ?? 50) + 5), employees: company.employees.map((employee) => ({ ...employee, morale: clamp(employee.morale + 3) })) })), lastDynastyEventWeek: game.week }) },
      { label: "Cobrar resultados antes de fazer discursos", result: "A liderança escolheu desempenho em vez de simbolismo.", effect: (game) => ({ ...game, dynastyLegitimacy: clamp((game.dynastyLegitimacy ?? 45) + 4), familyUnity: clamp((game.familyUnity ?? 70) - 2), lastDynastyEventWeek: game.week }) },
      { label: "Usar a imagem do fundador", tone: "risk", result: "O nome do fundador trouxe apoio, mas reforçou dúvidas sobre autonomia.", effect: (game) => ({ ...game, dynastyLegitimacy: clamp((game.dynastyLegitimacy ?? 45) + 5), founderHealth: clamp((game.founderHealth ?? 90) - 3), lastDynastyEventWeek: game.week }) },
    ],
  };
}

function createGenerationArc(state: GameState): GenerationNarrativeArc {
  const generation = state.generation ?? 2;
  const operating = state.companies.filter((company) => !company.sold && !company.bankrupt && !company.closed);
  const company = operating.find((item) => item.id === state.activeCompanyId) ?? operating[0];
  const relatives = (state.heirs ?? []).filter((heir) => heir.name !== (state.playerExecutive ?? state.founder) && heir.status !== "rompido");
  const relative = [...relatives].sort((a, b) => (b.ambition + (b.resentment ?? 0)) - (a.ambition + (a.resentment ?? 0)))[0];
  const rival = state.competitors.find((competitor) => competitor.id === state.nemesisId) ?? state.competitors[0];
  const ambitiousCEO = [...operating].filter((item) => item.ceo !== (state.playerExecutive ?? state.founder)).sort((a, b) => (b.ceoAmbition ?? 0) - (a.ceoAmbition ?? 0))[0];
  const project = company?.projects.find((item) => item.kind === "produto" && (item.lifecycle === "declinio" || item.lifecycle === "maturidade")) ?? company?.projects.find((item) => item.kind === "produto");
  const kinds: GenerationArcKind[] = ["guerra-familiar", "aquisicao-hostil", "fraude-ceo", "produto-declinio", "pressao-venda", "escandalo-fundador"];
  const kind = kinds[Math.abs(generation - 2) % kinds.length];
  const details: Record<GenerationArcKind, { title: string; antagonist: string; summary: string; companyId?: number }> = {
    "guerra-familiar": { title: "A guerra pelo sobrenome", antagonist: relative?.name ?? "Conselho da família", summary: `${relative?.name ?? "Uma ala da família"} começou a reunir herdeiros e executivos para disputar o rumo da holding.` },
    "aquisicao-hostil": { title: "Cerco à holding", antagonist: rival?.name ?? "Consórcio concorrente", summary: `${rival?.name ?? "Um grupo rival"} iniciou uma ofensiva para conquistar clientes, executivos e participação na holding.` },
    "fraude-ceo": { title: "O caixa que não existe", antagonist: ambitiousCEO?.ceo ?? "CEO da subsidiária", companyId: ambitiousCEO?.id ?? company?.id, summary: `Números inconsistentes colocaram ${ambitiousCEO?.ceo ?? "um CEO"} e a gestão da ${ambitiousCEO?.name ?? company?.name ?? "principal empresa"} sob suspeita.` },
    "produto-declinio": { title: "O fim de um ícone", antagonist: project?.name ?? "Produto histórico", companyId: company?.id, summary: `${project?.name ?? "O produto que construiu a reputação do grupo"} entrou em declínio e ameaça arrastar a empresa consigo.` },
    "pressao-venda": { title: "Quanto vale o legado?", antagonist: "Bloco de investidores", companyId: company?.id, summary: "Investidores e familiares começaram a pressionar pela venda de ativos enquanto ainda existe uma oferta atraente." },
    "escandalo-fundador": { title: "A sombra do fundador", antagonist: state.founder, summary: `Uma decisão antiga de ${state.founder} voltou à imprensa e colocou reputação, família e história em conflito.` },
  };
  const selected = details[kind];
  return {
    id: `generation-arc-${generation}-${state.week}`,
    generation,
    kind,
    title: selected.title,
    antagonist: selected.antagonist,
    companyId: selected.companyId,
    summary: selected.summary,
    chapter: 1,
    status: "ativo",
    power: 48,
    trust: 52,
    risk: 32,
    startedWeek: state.week,
    lastChapterWeek: state.week - 8,
    decisions: [],
  };
}

function generationArcChapter(arc: GenerationNarrativeArc) {
  const chapters: Record<GenerationArcKind, { subject: string; body: string }[]> = {
    "guerra-familiar": [
      { subject: "Há reuniões da família sem você", body: `${arc.antagonist} reuniu herdeiros e três executivos. Ainda não há rebelião aberta, mas já existe um projeto alternativo de poder.` },
      { subject: "A disputa chegou às subsidiárias", body: `Aliados de ${arc.antagonist} estão oferecendo proteção a CEOs em troca de apoio numa futura votação do conselho.` },
      { subject: "A imprensa descobriu a divisão", body: "O mercado agora trata a sucessão como uma guerra. Clientes querem garantias e investidores começaram a escolher lados." },
      { subject: "O conselho exige uma definição", body: `A família votará o futuro de ${arc.antagonist} e da presidência. Tudo o que você fez nos capítulos anteriores pesará agora.` },
    ],
    "aquisicao-hostil": [
      { subject: "Seu rival está comprando influência", body: `${arc.antagonist} abordou acionistas, clientes e dois executivos da holding. A ofensiva ainda pode ser contida.` },
      { subject: "Uma subsidiária recebeu proposta secreta", body: "O rival ofereceu capital e autonomia em troca de uma ruptura com o grupo. O CEO quer uma resposta sua." },
      { subject: "A oferta chegou ao mercado", body: `${arc.antagonist} apresentou a holding como mal administrada e prometeu pagar um prêmio pelo controle.` },
      { subject: "A tomada de controle começou", body: "Acionistas decidirão entre sua estratégia e a oferta rival. Caixa, confiança e risco acumulado definirão o resultado." },
    ],
    "fraude-ceo": [
      { subject: "A margem não fecha", body: `Auditores encontraram contratos sem lastro na gestão de ${arc.antagonist}. Pode ser erro, fraude ou tentativa de esconder prejuízo.` },
      { subject: "Um funcionário trouxe documentos", body: "Planilhas internas indicam metas manipuladas. O denunciante teme retaliação e exige proteção." },
      { subject: "O CEO tenta controlar a narrativa", body: `${arc.antagonist} convocou executivos e diz que a presidência está procurando um culpado para seus próprios erros.` },
      { subject: "O relatório final chegou", body: "O conselho exige punição, acordo ou absolvição. Sua credibilidade dependerá das provas e relações construídas." },
    ],
    "produto-declinio": [
      { subject: "O produto perdeu relevância", body: `${arc.antagonist} vende menos a cada semana. A equipe ainda acredita numa recuperação, mas o caixa começa a sentir.` },
      { subject: "A equipe se divide sobre o futuro", body: "Veteranos querem preservar o produto; novos talentos defendem substituí-lo antes que a marca envelheça." },
      { subject: "Um concorrente oferece licenciamento", body: "A proposta preservaria receita e reduziria controle. Recusar significa apostar sozinho na reinvenção." },
      { subject: "Chegou a hora de decidir o destino do ícone", body: `A próxima decisão definirá se ${arc.antagonist} renasce, vira propriedade de terceiros ou sai definitivamente de linha.` },
    ],
    "pressao-venda": [
      { subject: "A família quer liquidez", body: "Um bloco de parentes afirma que patrimônio no papel não paga seus projetos pessoais e exige venda ou dividendos." },
      { subject: "Investidores aumentaram a proposta", body: "O preço é atraente, mas inclui cláusulas que reduzem a autonomia e podem desmontar equipes." },
      { subject: "Executivos ameaçam sair", body: "Sem clareza sobre a venda, CEOs e talentos começaram a negociar proteção individual com os compradores." },
      { subject: "A proposta final está na mesa", body: "Você precisa definir o que não está à venda, o que pode ser negociado e quanto controle deseja preservar." },
    ],
    "escandalo-fundador": [
      { subject: "Um documento antigo vazou", body: `Uma assinatura de ${arc.antagonist} aparece numa decisão controversa. A autenticidade ainda é discutida.` },
      { subject: "A família exige proteção do sobrenome", body: "Alguns herdeiros querem silêncio; outros acreditam que esconder o passado destruirá a próxima geração." },
      { subject: "Funcionários pedem uma posição pública", body: "A crise deixou de ser apenas familiar. Equipes, clientes e imprensa querem saber quais valores comandam a holding hoje." },
      { subject: "O legado será reescrito", body: `Você decidirá como a história lembrará ${arc.antagonist} — e se a holding amadureceu ou permaneceu prisioneira do fundador.` },
    ],
  };
  return chapters[arc.kind][Math.min(3, arc.chapter - 1)];
}

type ArcChoiceEffects = { cash?: number; family?: number; legitimacy?: number; reputation?: number; outsideEquity?: number; companyCash?: number; morale?: number; board?: number };

function applyGenerationArcChoice(game: GameState, arc: GenerationNarrativeArc, decision: string, power: number, trust: number, risk: number, effects: ArcChoiceEffects, final: boolean): GameState {
  const nextPower = clamp(arc.power + power);
  const nextTrust = clamp(arc.trust + trust);
  const nextRisk = clamp(arc.risk + risk);
  const score = nextPower * .45 + nextTrust * .35 + (100 - nextRisk) * .2;
  const tone: GenerationArcRecord["tone"] = score >= 68 ? "vitoria" : score >= 48 ? "acordo" : "derrota";
  const outcome = tone === "vitoria"
    ? `${game.playerExecutive ?? game.founder} venceu o conflito e saiu politicamente mais forte.`
    : tone === "acordo"
      ? "O conflito terminou em um acordo imperfeito: a holding sobreviveu, mas concessões continuarão cobrando seu preço."
      : `${arc.antagonist} impôs sua narrativa e a presidência terminou o arco enfraquecida.`;
  const updatedArc: GenerationNarrativeArc = {
    ...arc,
    power: nextPower,
    trust: nextTrust,
    risk: nextRisk,
    chapter: final ? 4 : arc.chapter + 1,
    status: final ? "resolvido" : "ativo",
    lastChapterWeek: game.week,
    decisions: [...arc.decisions, decision],
    outcome: final ? outcome : undefined,
    outcomeTone: final ? tone : undefined,
  };
  const companyId = arc.companyId ?? game.activeCompanyId;
  const changed: GameState = {
    ...game,
    personalCash: Math.max(0, game.personalCash + (effects.cash ?? 0)),
    familyUnity: clamp((game.familyUnity ?? 70) + (effects.family ?? 0) + (final ? tone === "vitoria" ? 5 : tone === "derrota" ? -7 : 1 : 0)),
    dynastyLegitimacy: clamp((game.dynastyLegitimacy ?? 50) + (effects.legitimacy ?? 0) + (final ? tone === "vitoria" ? 8 : tone === "derrota" ? -9 : 2 : 0)),
    reputation: clamp(game.reputation + (effects.reputation ?? 0) + (final ? tone === "vitoria" ? 5 : tone === "derrota" ? -6 : 1 : 0)),
    outsideFamilyEquity: clamp((game.outsideFamilyEquity ?? 0) + (effects.outsideEquity ?? 0)),
    companies: game.companies.map((company) => company.id === companyId ? {
      ...company,
      cash: Math.max(0, company.cash + (effects.companyCash ?? 0)),
      boardSupport: clamp((company.boardSupport ?? 50) + (effects.board ?? 0)),
      employees: company.employees.map((employee) => ({ ...employee, morale: clamp(employee.morale + (effects.morale ?? 0)) })),
    } : company),
    generationArc: updatedArc,
  };
  if (!final) return changed;
  const record: GenerationArcRecord = { id: arc.id, generation: arc.generation, title: arc.title, antagonist: arc.antagonist, outcome, tone, endedWeek: game.week, decisions: updatedArc.decisions };
  return {
    ...changed,
    generationArcHistory: [record, ...(game.generationArcHistory ?? [])].slice(0, 12),
    dynastyHistory: [`Semana ${game.week}: ${arc.title} terminou em ${tone === "vitoria" ? "vitória" : tone === "acordo" ? "acordo" : "derrota"}.`, ...(game.dynastyHistory ?? [])].slice(0, 20),
    news: [{ id: Date.now(), week: game.week, category: "negocios", headline: `${arc.title}: ${tone === "vitoria" ? "a presidência venceu" : tone === "acordo" ? "um acordo encerrou a crise" : "a liderança saiu derrotada"}`, body: outcome, impact: tone === "vitoria" ? "positivo" : tone === "derrota" ? "negativo" : "neutro" }, ...game.news].slice(0, 60),
  };
}

function generationArcMessage(state: GameState, arc: GenerationNarrativeArc): StoryMessage {
  const chapter = generationArcChapter(arc);
  const final = arc.chapter >= 4;
  const strategies: Record<GenerationArcKind, [string, string, number, number, number, ArcChoiceEffects][]> = {
    "guerra-familiar": [["Negociar espaço sem entregar o comando", "Você abriu uma negociação com limites claros.", -2, 11, -5, { family: 6, legitimacy: 1 }], ["Construir maioria no conselho", "A presidência organizou sua própria coalizão.", 12, -2, 5, { legitimacy: 5, cash: -50000, board: 5 }], ["Afastar os aliados do rival", "A reação agressiva intimidou aliados, mas aprofundou ressentimentos.", 15, -13, 13, { family: -9, reputation: -2 }]],
    "aquisicao-hostil": [["Recomprar influência · R$ 150 mil", "A holding recomprou espaço antes que o rival avançasse.", 14, 1, -4, { cash: -150000, legitimacy: 3 }], ["Firmar pacto com clientes e CEOs", "Uma frente de aliados prometeu resistir à aquisição.", 4, 14, -3, { companyCash: -50000, morale: 5, board: 5 }], ["Lançar uma contraofensiva pública", "A rivalidade virou uma batalha aberta no mercado.", 12, -7, 14, { reputation: -3, companyCash: -30000 }]],
    "fraude-ceo": [["Auditoria independente · R$ 60 mil", "Auditores ganharam autonomia e proteção.", 6, 13, -9, { cash: -60000, reputation: 3, board: 4 }], ["Confrontar o CEO em particular", "O CEO recebeu uma chance de explicar e corrigir os números.", 3, 7, 3, { legitimacy: 1 }], ["Controlar o vazamento e ganhar tempo", "A informação foi contida, mas o risco futuro aumentou.", 8, -10, 18, { reputation: -3, morale: -4 }]],
    "produto-declinio": [["Financiar uma nova versão · R$ 120 mil", "A equipe recebeu recursos para tentar reinventar o produto.", 8, 12, 8, { cash: -120000, companyCash: 90000, morale: 7 }], ["Negociar licenciamento", "A marca poderá sobreviver com menor controle e risco.", 2, 8, -10, { companyCash: 50000, outsideEquity: 2 }], ["Preparar a retirada do produto", "A holding começou a transferir clientes e talentos para novas apostas.", 7, -5, -4, { companyCash: 25000, morale: -3 }]],
    "pressao-venda": [["Rejeitar e recomprar ações · R$ 130 mil", "A presidência reafirmou que o controle não está à venda.", 15, 2, 5, { cash: -130000, outsideEquity: -4, family: -3 }], ["Negociar venda parcial", "A proposta foi redesenhada para preservar parte do controle.", 3, 9, -7, { cash: 90000, outsideEquity: 5, family: 4 }], ["Aceitar a lógica dos investidores", "A holding priorizou liquidez e abriu espaço para capital externo.", -4, 5, 2, { cash: 180000, outsideEquity: 9, legitimacy: -3 }]],
    "escandalo-fundador": [["Publicar tudo com transparência", "A holding assumiu o passado e prometeu reparação.", 1, 15, -8, { reputation: 7, family: -7, legitimacy: 6 }], ["Proteger a família e investigar em silêncio", "A apuração começou longe da imprensa.", 5, 4, 5, { family: 5, cash: -45000 }], ["Negar e atacar os acusadores", "A família fechou fileiras, mas apostou sua reputação na negação.", 12, -12, 17, { family: 4, reputation: -8 }]],
  };
  return {
    id: `${arc.id}-chapter-${arc.chapter}`,
    from: arc.antagonist,
    role: `Arco da geração ${arc.generation} · capítulo ${arc.chapter} de 4`,
    initials: arc.antagonist.split(" ").map((part) => part[0]).join("").slice(0, 2).toUpperCase(),
    color: "#7a3948",
    subject: chapter.subject,
    body: `${chapter.body}\n\nSuas decisões anteriores deixaram poder em ${Math.round(arc.power)}%, confiança em ${Math.round(arc.trust)}% e risco em ${Math.round(arc.risk)}%.`,
    choices: strategies[arc.kind].map(([label, result, power, trust, risk, effects]) => ({
      label: final ? `Decisão final: ${label.toLowerCase()}` : label,
      tone: risk >= 12 ? "risk" : trust >= 10 ? "good" : undefined,
      hint: `Poder ${power >= 0 ? "+" : ""}${power} · confiança ${trust >= 0 ? "+" : ""}${trust} · risco ${risk >= 0 ? "+" : ""}${risk}`,
      result,
      effect: (game) => applyGenerationArcChoice(game, arc, label, power, trust, risk, effects, final),
    })),
  };
}

function politicalArcMessage(state: GameState, arc: PoliticalArc, challenger: FormerPresident): StoryMessage {
  const incumbent = state.playerExecutive ?? state.founder;
  const finishVote = (game: GameState): GameState => {
    const currentChallenger = (game.formerPresidents ?? []).find((president) => president.name === challenger.name) ?? challenger;
    const takeoverStrength = arc.support * .5 + currentChallenger.influence * .28 + (100 - (game.dynastyLegitimacy ?? 50)) * .22;
    const challengerWins = Math.random() * 100 < takeoverStrength;
    if (!challengerWins) return {
      ...game,
      politicalArc: undefined,
      dynastyLegitimacy: clamp((game.dynastyLegitimacy ?? 50) + 12),
      formerPresidents: (game.formerPresidents ?? []).map((president) => president.name === challenger.name ? { ...president, influence: clamp(president.influence - 22), relationship: clamp(president.relationship - 10), status: "oposicao" as const, lastMove: `Perdeu uma votação de confiança contra ${incumbent}.` } : president),
      dynastyHistory: [`Semana ${game.week}: ${incumbent} derrotou a tentativa de retorno de ${challenger.name}.`, ...(game.dynastyHistory ?? [])].slice(0, 18),
    };
    const incumbentStyle = game.generationProfile?.style ?? "crescimento";
    const outgoing = formerPresidentProfile(game, incumbent, game.generation ?? 2, game.dynastyStartedWeek ?? game.week - 1, game.week, incumbentStyle);
    return {
      ...game,
      playerExecutive: challenger.name,
      dynastyStartedWeek: game.week,
      dynastyLegitimacy: clamp(38 + challenger.reputation * .25),
      generationProfile: { ...generationProfileFor(challenger.name, game.generation ?? 2, challenger.style, game.week, challenger.age), health: challenger.health, title: "A geração da restauração", promise: "Provar que o retorno ao poder salvou a holding" },
      lastDynastyTransition: createDynastyTransition(game, incumbent, challenger.name, game.generation ?? 2),
      politicalArc: undefined,
      formerPresidents: [outgoing, ...(game.formerPresidents ?? []).filter((president) => president.name !== challenger.name && president.name !== incumbent)],
      companies: game.companies.map((company) => company.ceo === incumbent ? { ...company, ceo: challenger.name, ceoStyle: challenger.style, autonomy: "supervisionada", ceoLastDecision: "Assumiu após vencer uma votação de confiança" } : company),
      dynastyHistory: [`Semana ${game.week}: ${challenger.name} derrubou ${incumbent} e retornou à presidência.`, ...(game.dynastyHistory ?? [])].slice(0, 18),
      news: [{ id: Date.now(), week: game.week, category: "negocios" as const, headline: `${challenger.name} vence votação e retorna ao comando`, body: `${incumbent} perdeu a confiança do conselho, mas a Dinastia continua sob uma presidência restaurada.`, impact: "negativo" as const }, ...game.news].slice(0, 60),
    };
  };
  return {
    id: `political-arc-${arc.id}`,
    from: "Secretaria do conselho",
    role: "Votação extraordinária da holding",
    initials: "CV",
    color: "#9b4d52",
    subject: `${challenger.name} apresentou uma moção contra ${incumbent}`,
    body: `Depois de semanas de articulação, ${challenger.name} chegou à votação com apoio estimado em ${Math.round(arc.support)}%. Se o conselho retirar sua confiança, o ex-presidente voltará ao comando e você continuará a Dinastia sob o líder restaurado.`,
    choices: [
      { label: "Negociar retirada · R$ 120 mil", hint: "Encerra a crise, mas fortalece o antecessor", result: "Um acordo político evitou a votação.", effect: (game) => ({ ...game, personalCash: Math.max(0, game.personalCash - 120000), politicalArc: undefined, familyUnity: clamp((game.familyUnity ?? 70) + 5), dynastyLegitimacy: clamp((game.dynastyLegitimacy ?? 50) - 5), formerPresidents: (game.formerPresidents ?? []).map((president) => president.name === challenger.name ? { ...president, status: "neutro" as const, influence: clamp(president.influence + 8), relationship: clamp(president.relationship + 5), lastMove: "Retirou a moção após negociar espaço e recursos." } : president) }) },
      { label: "Expor o segredo do antigo mandato", tone: "risk", hint: "Reduz apoio do rival, mas fere a família e a reputação", result: "O segredo chegou à imprensa antes da votação.", effect: (game) => ({ ...game, politicalArc: { ...arc, support: clamp(arc.support - 24), weeksLeft: 1, stage: "votacao" }, reputation: clamp(game.reputation - 7), familyUnity: clamp((game.familyUnity ?? 70) - 12), formerPresidents: (game.formerPresidents ?? []).map((president) => president.name === challenger.name ? { ...president, secretRevealed: true, relationship: clamp(president.relationship - 25), status: "oposicao" as const, lastMove: "Teve um segredo do mandato exposto pela presidência atual." } : president) }) },
      { label: "Ir à votação de confiança", tone: "good", hint: "Você pode vencer ou perder a presidência — o jogo continua", result: "O conselho votou. O resultado redesenhou a Dinastia.", effect: finishVote },
    ],
  };
}

function leaderDeathMessage(state: GameState, profile: GenerationProfile): StoryMessage {
  const candidates = (state.heirs ?? []).filter((heir) => heir.name !== profile.leader && heir.status !== "rompido").sort((a, b) => b.readiness + b.competence - a.readiness - a.competence).slice(0, 2);
  const transfer = (game: GameState, successor: Heir): GameState => {
    const deceased = { ...formerPresidentProfile(game, profile.leader, game.generation ?? 2, profile.startWeek, game.week, profile.style), age: profile.age, health: 0, alive: false, influence: 0, lastMove: "Morreu no exercício da presidência e tornou-se parte da memória da Dinastia." };
    return {
      ...game,
      playerExecutive: successor.name,
      generation: (game.generation ?? 2) + 1,
      dynastyStartedWeek: game.week,
      dynastyLegitimacy: clamp(28 + successor.readiness * .35),
      generationProfile: generationProfileFor(successor.name, (game.generation ?? 2) + 1, successor.style, game.week, successor.startAge + Math.round(game.week / 52)),
      lastDynastyTransition: createDynastyTransition(game, profile.leader, successor.name, (game.generation ?? 2) + 1),
      formerPresidents: [deceased, ...(game.formerPresidents ?? []).filter((president) => president.name !== profile.leader)],
      politicalArc: undefined,
      heirs: (game.heirs ?? []).map((heir) => heir.id === successor.id ? { ...heir, role: "sucessor" as const, support: 72, resentment: 4 } : heir.name === profile.leader ? { ...heir, role: "conselho" as const } : heir),
      companies: game.companies.map((company) => company.ceo === profile.leader ? { ...company, ceo: successor.name, ceoStyle: successor.style, autonomy: "supervisionada", ceoLastDecision: "Assumiu durante uma sucessão de emergência" } : company),
      dynastyHistory: [`Semana ${game.week}: ${profile.leader} morreu no cargo e ${successor.name} assumiu em emergência.`, ...(game.dynastyHistory ?? [])].slice(0, 20),
    };
  };
  const fallback = candidates[0];
  return {
    id: `leader-death-${profile.leader}-${state.week}`,
    from: "Conselho de família",
    role: "Sucessão de emergência",
    initials: "SF",
    color: "#3d4148",
    subject: `${profile.leader} morreu no exercício da presidência`,
    body: `A Dinastia perdeu seu líder aos ${profile.age} anos. Não existe tempo para uma campanha normal: família, CEOs e investidores exigem uma nova presidência imediatamente.`,
    choices: candidates.length ? candidates.map((candidate) => ({ label: `Empossar ${candidate.name}`, hint: `Prontidão ${Math.round(candidate.readiness)}% · competência ${Math.round(candidate.competence)}%`, result: `${candidate.name} assumiu a holding em uma sucessão de emergência.`, effect: (game: GameState) => transfer(game, candidate) })) : [{ label: "Entregar o comando ao conselho profissional", tone: "risk" as const, result: "Um presidente interino externo assumiu enquanto a família se reorganiza.", effect: (game: GameState) => ({ ...game, playerExecutive: "Presidência Interina", dynastyLegitimacy: 25, generationProfile: generationProfileFor("Presidência Interina", game.generation ?? 2, "eficiencia", game.week, 51), politicalArc: undefined, dynastyHistory: [`Semana ${game.week}: a família ficou sem sucessor e entregou a holding a uma presidência interina.`, ...(game.dynastyHistory ?? [])].slice(0, 20) }) }],
  };
}

function ceoPoliticalMessage(company: Company, state: GameState): StoryMessage {
  const ceo = company.ceo ?? "CEO";
  const ambition = company.ceoAmbition ?? 50;
  const loyalty = company.ceoLoyalty ?? 60;
  const latestMemory = company.ceoMemories?.[0];
  const kind =
    loyalty < 34
      ? "saida"
      : ambition > 82 && (company.ceoInfluence ?? 0) > 58
        ? "poder"
        : (company.ceoEquity ?? 0) === 0 && ambition > 65
          ? "participacao"
          : company.autonomy !== "independente" && ambition > 55
            ? "autonomia"
            : "orcamento";
  const subjects = {
    saida: "Recebi uma proposta e preciso de uma razão para ficar",
    poder: "Quero voz real nas decisões da holding",
    participacao: "Resultados precisam vir acompanhados de participação",
    autonomia: "A empresa está perdendo velocidade",
    orcamento: "Meu plano precisa de mais orçamento",
  };
  const bodies = {
    saida: `${ceo} informa que recebeu uma proposta de outra empresa. A permanência depende de autonomia, reconhecimento e um bônus de retenção.`,
    poder: `${ceo} afirma ter apoio da equipe e de conselheiros. O pedido é participar das decisões estratégicas do grupo, não apenas executar ordens.`,
    participacao: `${ceo} pede 3% da empresa como condição para transformar sua gestão em um compromisso de longo prazo.`,
    autonomia: `${ceo} exige liberdade para aprovar investimentos e conduzir a estratégia sem autorização semanal da holding.`,
    orcamento: `${ceo} quer ampliar o orçamento por decisão para acelerar a meta definida. O caixa assumirá mais risco.`,
  };
  const update = (
    game: GameState,
    changes: (current: Company) => Partial<Company>,
    headline: string,
  ): GameState => ({
    ...game,
    companies: game.companies.map((current) =>
      current.id === company.id ? { ...current, ...changes(current) } : current,
    ),
    news: [
      {
        id: Date.now(),
        week: game.week,
        category: "negocios",
        headline,
        body: `A decisão muda a relação entre ${ceo}, a ${company.name} e o comando da holding.`,
        impact: "neutro",
      },
      ...game.news,
    ].slice(0, 50),
  });
  return {
    id: `ceo-politics-${company.id}-${state.week}`,
    from: ceo,
    role: `CEO da ${company.name}`,
    initials: ceo
      .split(" ")
      .map((part) => part[0])
      .join("")
      .slice(0, 2),
    color: "#b3654b",
    subject: subjects[kind],
    body: `${bodies[kind]}${latestMemory ? ` A conversa também é influenciada por uma lembrança: “${latestMemory.text}”` : ""}`,
    choices: [
      {
        label:
          kind === "participacao"
            ? "Conceder 3% da empresa"
            : kind === "saida"
              ? "Pagar bônus de retenção"
              : kind === "autonomia"
                ? "Conceder autonomia"
                : kind === "poder"
                  ? "Dar assento estratégico"
                  : "Aprovar o orçamento",
        tone: "good",
        result: `${ceo} teve sua principal exigência aceita.`,
        effect: (game) =>
          update(
            game,
            (current) => ({
              cash: current.cash - (kind === "saida" ? 45000 : 15000),
              founderEquity:
                kind === "participacao"
                  ? Math.max(0, (current.founderEquity ?? 100) - 3)
                  : current.founderEquity,
              ceoEquity:
                kind === "participacao"
                  ? (current.ceoEquity ?? 0) + 3
                  : current.ceoEquity,
              autonomy:
                kind === "autonomia" || kind === "poder"
                  ? "independente"
                  : current.autonomy,
              ceoBudget:
                kind === "orcamento"
                  ? Math.min(80000, (current.ceoBudget ?? 15000) + 20000)
                  : current.ceoBudget,
              ceoLoyalty: clamp((current.ceoLoyalty ?? 60) + 18),
              ceoInfluence: clamp(
                (current.ceoInfluence ?? 20) +
                  (kind === "poder" || kind === "participacao" ? 12 : 6),
              ),
              ceoLastDecision: "Negociou novas condições com o fundador",
              ceoDemandCooldown: 10,
              ceoMemories: addCharacterMemory(current.ceoMemories, characterMemory(
                game.week,
                kind === "participacao" || kind === "poder" ? "poder" : "reconhecimento",
                "Você aceitou minha principal exigência e demonstrou confiança no meu comando.",
                "grato",
                14,
                92,
              )),
            }),
            `${state.holdingName} aceita exigência de ${ceo}`,
          ),
      },
      {
        label: "Negociar condições menores",
        result: `Você preservou parte do controle e chegou a um acordo com ${ceo}.`,
        effect: (game) =>
          update(
            game,
            (current) => ({
              cash: current.cash - 18000,
              ceoBudget: Math.min(
                70000,
                (current.ceoBudget ?? 15000) + 5000,
              ),
              ceoLoyalty: clamp((current.ceoLoyalty ?? 60) + 6),
              ceoAmbition: clamp((current.ceoAmbition ?? 50) + 2),
              ceoInfluence: clamp((current.ceoInfluence ?? 20) + 3),
              ceoLastDecision: "Aceitou um acordo parcial com a holding",
              ceoDemandCooldown: 8,
              ceoMemories: addCharacterMemory(current.ceoMemories, characterMemory(
                game.week,
                "poder",
                "Você negociou comigo e preservou parte do controle; respeito o acordo, mas lembro do limite imposto.",
                "cauteloso",
                4,
                76,
              )),
            }),
            `${ceo} e a holding chegam a um acordo parcial`,
          ),
      },
      {
        label: "Recusar a exigência",
        tone: "risk",
        result: `${ceo} permaneceu no cargo, mas a lealdade caiu.`,
        effect: (game) =>
          update(
            game,
            (current) => ({
              ceoLoyalty: clamp((current.ceoLoyalty ?? 60) - 18),
              ceoAmbition: clamp((current.ceoAmbition ?? 50) + 6),
              boardSupport: clamp((current.boardSupport ?? 50) + 3),
              ceoLastDecision: "Teve uma exigência recusada pelo fundador",
              ceoDemandCooldown: 6,
              ceoMemories: addCharacterMemory(current.ceoMemories, characterMemory(
                game.week,
                "conflito",
                "Você recusou minha exigência mesmo depois dos resultados que entreguei.",
                "ressentido",
                -15,
                94,
              )),
            }),
            `${state.holdingName} rejeita pressão de ${ceo}`,
          ),
      },
      {
        label: "Levar a decisão ao conselho",
        result: "O conselho definiu os limites de poder do executivo.",
        effect: (game) =>
          update(
            game,
            (current) => {
              const founderWins = (current.boardSupport ?? 50) >= 55;
              return {
                cash: current.cash - 20000,
                boardSupport: clamp(
                  (current.boardSupport ?? 50) + (founderWins ? 5 : -8),
                ),
                ceoInfluence: clamp(
                  (current.ceoInfluence ?? 20) + (founderWins ? -10 : 12),
                ),
                ceoLoyalty: clamp(
                  (current.ceoLoyalty ?? 60) + (founderWins ? -8 : 7),
                ),
                autonomy: founderWins ? current.autonomy : "independente",
                ceoLastDecision: founderWins
                  ? "Perdeu uma disputa política no conselho"
                  : "Conquistou mais poder após votação do conselho",
                ceoDemandCooldown: 10,
                ceoMemories: addCharacterMemory(current.ceoMemories, characterMemory(
                  game.week,
                  "poder",
                  founderWins
                    ? "Você levou nossa disputa ao conselho e me derrotou politicamente."
                    : "Você aceitou a votação do conselho quando ela ampliou meu poder.",
                  founderWins ? "magoado" : "confiante",
                  founderWins ? -12 : 8,
                  90,
                )),
              };
            },
            `Conselho arbitra conflito entre ${ceo} e o fundador`,
          ),
      },
    ],
  };
}

function narrativeEvent(company: Company, state: GameState): StoryMessage {
  const product = company.projects.find(
    (p) => p.kind === "produto" && p.lifecycle === "mercado",
  );
  const rival = state.competitors.find(
    (r) =>
      r.sector === company.sector && !["fechada", "vendida"].includes(r.status),
  );
  const addEffect = (
    s: GameState,
    effect: OngoingEffect,
    immediate: Partial<Company> = {},
    news?: NewsItem,
  ) => ({
    ...s,
    lastNarrativeWeek: s.week,
    narrativeHistory: [effect.source, ...(s.narrativeHistory ?? [])].slice(
      0,
      20,
    ),
    companies: s.companies.map((c) =>
      c.id !== company.id
        ? c
        : {
            ...c,
            ...immediate,
            effects: [
              effect,
              ...(c.effects ?? []).filter(
                (existing) => existing.id !== effect.id,
              ),
            ].slice(0, 6),
          },
    ),
    news: news ? [news, ...s.news].slice(0, 50) : s.news,
  });
  const eventIndex =
    (state.week + company.id + (state.narrativeHistory?.length ?? 0)) % 4;

  if (product && eventIndex === 0)
    return {
      id: `narrative-defect-${state.week}`,
      from: "Comitê de Crise",
      role: "Qualidade e reputação",
      initials: "CC",
      color: "#ca7b83",
      subject: `Um defeito foi encontrado em ${product.name}`,
      body: `Clientes começaram a relatar falhas. Ainda não houve repercussão nacional, mas a equipe sabe que o problema é real. Um recall será caro; esconder o caso pode preservar o caixa — se ninguém descobrir.`,
      choices: [
        {
          label: "Fazer recall público",
          result:
            "A empresa assumiu o problema. O caixa sofrerá, mas a confiança pode voltar.",
          effect: (s) =>
            addEffect(
              s,
              {
                id: `recall-${state.week}`,
                name: "Recall transparente",
                source: `Recall de ${product.name}`,
                weeksLeft: 5,
                tone: "misto",
                costMultiplier: 1.18,
                revenueMultiplier: 0.94,
                reputationDelta: 1.4,
                moraleDelta: 1,
                boardDelta: 1,
              },
              { cash: company.cash - 45000 },
              {
                id: Date.now(),
                week: s.week,
                category: "negocios",
                headline: `${company.name} anuncia recall de ${product.name}`,
                body: "A empresa reconheceu a falha e prometeu substituir unidades afetadas. Analistas elogiaram a transparência, mas calculam custos elevados.",
                impact: "neutro",
              },
            ),
        },
        {
          label: "Corrigir silenciosamente",
          tone: "risk",
          result:
            "A equipe começou uma correção discreta. O risco de vazamento continuará por semanas.",
          effect: (s) =>
            addEffect(
              s,
              {
                id: `silent-fix-${state.week}`,
                name: "Correção silenciosa",
                source: `Falha ocultada em ${product.name}`,
                weeksLeft: 6,
                tone: "negativo",
                costMultiplier: 1.06,
                revenueMultiplier: 0.98,
                stressDelta: 2.2,
                boardDelta: -0.8,
                productQualityDelta: 0.7,
              },
              { cash: company.cash - 18000 },
            ),
        },
        {
          label: "Culpar o fornecedor",
          tone: "risk",
          result:
            "A responsabilidade foi terceirizada. O caixa foi protegido, mas a cadeia comercial entrou em conflito.",
          effect: (s) =>
            addEffect(
              s,
              {
                id: `supplier-blame-${state.week}`,
                name: "Conflito com fornecedor",
                source: `Fornecedor responsabilizado por ${product.name}`,
                weeksLeft: 7,
                tone: "negativo",
                costMultiplier: 1.1,
                customerDelta: -2,
                reputationDelta: -0.7,
                moraleDelta: -1.1,
                boardDelta: -0.5,
              },
              {},
              {
                id: Date.now(),
                week: s.week,
                category: "negocios",
                headline: `${company.name} atribui falha de produto a fornecedor`,
                body: "A declaração abriu uma disputa contratual e dividiu a opinião dos clientes.",
                impact: "negativo",
              },
            ),
        },
      ],
    };

  if (eventIndex === 1)
    return {
      id: `narrative-data-${state.week}`,
      from: "Diretoria de Operações",
      role: "Segurança e continuidade",
      initials: "DO",
      color: "#778ad9",
      subject: "Dados confidenciais podem ter vazado",
      body: `Uma auditoria encontrou acesso indevido a informações de clientes. Ainda não está claro quantas pessoas foram afetadas. O conselho exige uma resposta antes que concorrentes e imprensa controlem a narrativa.`,
      choices: [
        {
          label: "Divulgar e contratar auditoria",
          result:
            "A empresa abriu o incidente e iniciou uma investigação independente.",
          effect: (s) =>
            addEffect(
              s,
              {
                id: `audit-${state.week}`,
                name: "Auditoria independente",
                source: "Resposta transparente ao vazamento",
                weeksLeft: 6,
                tone: "misto",
                costMultiplier: 1.15,
                reputationDelta: 0.8,
                boardDelta: 1.2,
                stressDelta: 0.5,
              },
              { cash: company.cash - 38000 },
              {
                id: Date.now(),
                week: s.week,
                category: "negocios",
                headline: `${company.name} revela incidente de segurança`,
                body: "A transparência reduziu rumores, mas clientes aguardam o resultado da auditoria.",
                impact: "neutro",
              },
            ),
        },
        {
          label: "Resolver internamente",
          tone: "risk",
          result:
            "O problema ficou restrito à diretoria. A incerteza continuará pressionando a equipe.",
          effect: (s) =>
            addEffect(
              s,
              {
                id: `internal-security-${state.week}`,
                name: "Investigação interna",
                source: "Vazamento tratado em segredo",
                weeksLeft: 5,
                tone: "negativo",
                costMultiplier: 1.05,
                stressDelta: 1.8,
                moraleDelta: -0.7,
                boardDelta: -1,
              },
              { cash: company.cash - 14000 },
            ),
        },
        {
          label: "Negar qualquer incidente",
          tone: "risk",
          result:
            "A empresa negou o vazamento. Se novas evidências surgirem, a crise será muito maior.",
          effect: (s) =>
            addEffect(s, {
              id: `denial-${state.week}`,
              name: "Negação pública",
              source: "Incidente de segurança negado",
              weeksLeft: 8,
              tone: "negativo",
              revenueMultiplier: 0.94,
              customerDelta: -3,
              reputationDelta: -1.3,
              stressDelta: 2,
              boardDelta: -1.5,
            }),
        },
      ],
    };

  if (eventIndex === 2)
    return {
      id: `narrative-rival-${state.week}`,
      from: rival?.founder ?? "Mercado",
      role: rival ? `CEO da ${rival.name}` : "Concorrência",
      initials:
        rival?.founder
          .split(" ")
          .map((x) => x[0])
          .join("")
          .slice(0, 2) ?? "MC",
      color: "#d982a8",
      subject: rival
        ? `${rival.name} quer uma aliança inesperada`
        : "Uma empresa quer compartilhar sua distribuição",
      body: `${rival?.founder ?? "Um concorrente"} propôs uma campanha conjunta. A parceria reduziria custos e abriria clientes, mas também daria acesso a informações sobre sua operação e seus produtos.`,
      choices: [
        {
          label: "Aceitar parceria limitada",
          result:
            "As empresas dividirão canais, mantendo produtos e dados estratégicos separados.",
          effect: (s) => ({
            ...addEffect(s, {
              id: `alliance-${state.week}`,
              name: "Aliança comercial",
              source: `Parceria com ${rival?.name ?? "empresa do setor"}`,
              weeksLeft: 7,
              tone: "positivo",
              revenueMultiplier: 1.1,
              costMultiplier: 0.96,
              customerDelta: 3,
              boardDelta: 0.4,
            }),
            competitors: s.competitors.map((r) =>
              r.id === rival?.id
                ? { ...r, relationship: "parceiro" as const, relation: 58 }
                : r,
            ),
          }),
        },
        {
          label: "Exigir exclusividade",
          tone: "risk",
          result:
            "A contraproposta foi agressiva. O mercado aguardará a resposta do concorrente.",
          effect: (s) => ({
            ...addEffect(s, {
              id: `exclusive-${state.week}`,
              name: "Negociação exclusiva",
              source: `Disputa contratual com ${rival?.name ?? "concorrente"}`,
              weeksLeft: 4,
              tone: "misto",
              costMultiplier: 1.04,
              revenueMultiplier: Math.random() < 0.5 ? 1.13 : 0.95,
              boardDelta: -0.3,
            }),
            competitors: s.competitors.map((r) =>
              r.id === rival?.id
                ? { ...r, relation: clamp((r.relation ?? 0) - 8, -100, 100) }
                : r,
            ),
          }),
        },
        {
          label: "Recusar e atacar o mercado",
          tone: "risk",
          result: "Você recusou a aliança e lançou uma ofensiva comercial.",
          effect: (s) => ({
            ...addEffect(s, {
              id: `market-war-${state.week}`,
              name: "Guerra comercial",
              source: `Ofensiva contra ${rival?.name ?? "concorrentes"}`,
              weeksLeft: 6,
              tone: "misto",
              revenueMultiplier: 1.06,
              costMultiplier: 1.14,
              customerDelta: 2,
              stressDelta: 1.3,
              reputationDelta: 0.4,
            }),
            competitors: s.competitors.map((r) =>
              r.id === rival?.id
                ? { ...r, relationship: "rival" as const, relation: -60 }
                : r,
            ),
          }),
        },
      ],
    };

  return {
    id: `narrative-viral-${state.week}`,
    from: "Maya Prado",
    role: "Marketing e reputação",
    initials: "MP",
    color: "#efad55",
    subject: "A campanha viralizou pelo motivo errado",
    body: `Uma peça da campanha foi interpretada como ofensiva. Parte do público exige desculpas; outra parte defende a marca e diz que a polêmica aumentou sua relevância. A equipe de marketing espera uma direção.`,
    choices: [
      {
        label: "Retirar e pedir desculpas",
        result: "A campanha foi suspensa e a empresa assumiu responsabilidade.",
        effect: (s) =>
          addEffect(
            s,
            {
              id: `apology-${state.week}`,
              name: "Reconstrução de confiança",
              source: "Pedido público de desculpas",
              weeksLeft: 5,
              tone: "misto",
              revenueMultiplier: 0.96,
              reputationDelta: 1.2,
              moraleDelta: 0.5,
              boardDelta: 0.7,
            },
            { cash: company.cash - 16000 },
          ),
      },
      {
        label: "Manter a campanha",
        tone: "risk",
        result:
          "A marca escolheu sustentar a provocação e aproveitar a atenção.",
        effect: (s) =>
          addEffect(s, {
            id: `controversy-${state.week}`,
            name: "Polêmica de marca",
            source: "Campanha controversa mantida",
            weeksLeft: 7,
            tone: "misto",
            revenueMultiplier: 1.1,
            customerDelta: 2,
            reputationDelta: -0.8,
            stressDelta: 1.2,
            boardDelta: -1,
          }),
      },
      {
        label: "Culpar a agência",
        tone: "risk",
        result: "A empresa rompeu publicamente com seus parceiros criativos.",
        effect: (s) =>
          addEffect(
            s,
            {
              id: `agency-blame-${state.week}`,
              name: "Ruptura criativa",
              source: "Agência responsabilizada pela campanha",
              weeksLeft: 6,
              tone: "negativo",
              costMultiplier: 1.09,
              moraleDelta: -1.3,
              reputationDelta: -0.5,
              productQualityDelta: -0.3,
            },
            {},
            {
              id: Date.now(),
              week: s.week,
              category: "mercado",
              headline: `${company.name} rompe com agência após campanha controversa`,
              body: "A decisão protegeu a diretoria no curto prazo, mas gerou críticas sobre responsabilidade e liderança.",
              impact: "negativo",
            },
          ),
      },
    ],
  };
}

type BusinessScale = "nascente" | "pequena" | "media" | "grande" | "corporacao" | "global";
const businessScaleProfiles: Record<BusinessScale, { label: string; minRevenue: number; taxRate: number; administration: number; complianceRate: number; reserveWeeks: number; valuationMultiple: number }> = {
  nascente: { label: "Empresa nascente", minRevenue: 0, taxRate: .05, administration: 1200, complianceRate: .002, reserveWeeks: 2, valuationMultiple: 2.65 },
  pequena: { label: "Pequena empresa", minRevenue: 50000, taxRate: .1, administration: 4200, complianceRate: .004, reserveWeeks: 3, valuationMultiple: 2.35 },
  media: { label: "Empresa média", minRevenue: 180000, taxRate: .16, administration: 13500, complianceRate: .0065, reserveWeeks: 4, valuationMultiple: 2.05 },
  grande: { label: "Grande empresa", minRevenue: 650000, taxRate: .22, administration: 42000, complianceRate: .009, reserveWeeks: 6, valuationMultiple: 1.78 },
  corporacao: { label: "Corporação", minRevenue: 2200000, taxRate: .28, administration: 135000, complianceRate: .012, reserveWeeks: 8, valuationMultiple: 1.52 },
  global: { label: "Grupo global", minRevenue: 7000000, taxRate: .32, administration: 420000, complianceRate: .016, reserveWeeks: 10, valuationMultiple: 1.32 },
};

function businessScaleFor(revenue: number): BusinessScale {
  return (["global", "corporacao", "grande", "media", "pequena", "nascente"] as BusinessScale[]).find((scale) => revenue >= businessScaleProfiles[scale].minRevenue) ?? "nascente";
}

function saleSettlement(gross: number) {
  const rate = gross >= 500000000 ? .24 : gross >= 50000000 ? .2 : gross >= 5000000 ? .15 : gross >= 500000 ? .1 : .06;
  const taxes = Math.round(gross * rate);
  const advisory = Math.round(Math.max(12000, gross * .018));
  return { gross, rate, taxes, advisory, net: Math.max(0, gross - taxes - advisory) };
}

function personalWealthCost(wealth: number) {
  if (wealth <= 1000000) return 0;
  return Math.round((wealth - 1000000) * .00022 + Math.max(0, wealth - 10000000) * .0001 + Math.max(0, wealth - 100000000) * .00008);
}

function companyCommercialCapacity(company: Company) {
  const structure = facilitySummary(company);
  const available = company.employees.filter((employee) => (employee.leaveWeeks ?? 0) <= 0);
  const morale = company.employees.length ? company.employees.reduce((sum, employee) => sum + employee.morale, 0) / company.employees.length : 40;
  const skill = available.length ? available.reduce((sum, employee) => sum + employee.skill, 0) / available.length : 20;
  const operatingCapacity = Math.max(.35, available.length) * skill * (morale / 100) * structure.capacityMultiplier;
  const sectorMultiplier = company.sector === "Agência" ? 1.75 : company.sector === "Alimentação" ? .78 : 1;
  const customerCapacity = Math.max(5, Math.round(operatingCapacity * 410 * sectorMultiplier / Math.max(1, company.price)));
  const productRevenueCapacity = Math.max(9000, Math.round(operatingCapacity * (company.sector === "Tecnologia" ? 720 : company.sector === "Agência" ? 420 : 520)));
  return { available: available.length, morale, skill, operatingCapacity, sectorMultiplier, customerCapacity, productRevenueCapacity };
}

const marketingAudienceLabels: Record<MarketingAudience, string> = { massa: "Grande público", nicho: "Público de nicho", premium: "Clientes premium", clientes: "Clientes atuais" };
const marketingObjectiveLabels: Record<MarketingObjective, string> = { aquisicao: "Conquistar clientes", lancamento: "Lançar produto", marca: "Fortalecer a marca", retencao: "Reter clientes" };
const marketingOutcomeLabels: Record<MarketingCampaignOutcome, string> = { forte: "crescimento forte", moderado: "retorno moderado", ignorado: "campanha ignorada", negativo: "repercussão negativa" };

function marketingCampaignForecast(company: Company, economy: Economy, competitors: Competitor[], budget: number, duration: number, audience: MarketingAudience, objective: MarketingObjective, productId?: number) {
  const capacity = companyCommercialCapacity(company);
  const marketProducts = company.projects.filter((product) => product.kind === "produto" && product.lifecycle === "mercado");
  const targetProduct = marketProducts.find((product) => product.id === productId) ?? marketProducts[0];
  const quality = targetProduct?.quality ?? (marketProducts.length ? marketProducts.reduce((sum, product) => sum + product.quality, 0) / marketProducts.length : 42);
  const marketWeeks = targetProduct?.marketWeeks ?? 20;
  const priceReference = sectorData[company.sector].price;
  const priceRatio = company.price / Math.max(1, priceReference);
  const priceFit = audience === "premium" ? clamp(58 + (priceRatio - 1) * 35 + (quality - 60) * .35) : audience === "massa" ? clamp(72 - Math.max(0, priceRatio - .9) * 55) : audience === "clientes" ? clamp(company.reputation * .75 + quality * .25) : clamp(45 + quality * .55 - Math.abs(priceRatio - 1.05) * 20);
  const stageFit = objective === "lancamento" ? (marketWeeks <= 6 ? 92 : marketWeeks <= 15 ? 65 : 35) : objective === "retencao" ? clamp(50 + Math.min(30, marketWeeks)) : objective === "marca" ? clamp(52 + company.reputation * .38) : marketWeeks <= 30 ? 75 : 58;
  const audienceFit = company.sector === "Tecnologia" ? (audience === "nicho" ? 90 : audience === "premium" ? 76 : 58) : company.sector === "Agência" ? (audience === "premium" || audience === "nicho" ? 86 : 55) : company.sector === "Alimentação" ? (audience === "massa" || audience === "clientes" ? 86 : 58) : (audience === "massa" || audience === "clientes" ? 82 : 62);
  const capacityRoom = clamp((capacity.customerCapacity - company.customers) / Math.max(1, capacity.customerCapacity));
  const capacityFit = objective === "retencao" ? clamp(65 + capacityRoom * 25) : clamp(capacityRoom * 100);
  const economicFit = clamp(economy.demand * 45 + economy.confidence * .5);
  const sectorRivals = competitors.filter((rival) => rival.sector === company.sector && !["fechada", "vendida"].includes(rival.status));
  const rivalStrength = sectorRivals.length ? sectorRivals.reduce((sum, rival) => sum + rival.score, 0) / sectorRivals.length : 45;
  const competitionFit = clamp(78 + company.reputation * .25 - rivalStrength * .45);
  const estimatedRevenue = Math.max(10000, company.customers * company.price + (company.productRevenue ?? 0));
  const idealBudget = Math.max(15000, estimatedRevenue * duration * .16);
  const budgetEfficiency = clamp(1 - Math.exp(-budget / idealBudget), 0, .96);
  const overspend = Math.max(0, budget / idealBudget - 2);
  const score = clamp(quality * .22 + company.reputation * .15 + capacity.morale * .09 + priceFit * .11 + stageFit * .11 + audienceFit * .1 + economicFit * .08 + capacityFit * .08 + competitionFit * .06 + budgetEfficiency * 18 - overspend * 9);
  const raw = {
    forte: Math.max(6, 8 + score * .48),
    moderado: Math.max(18, 28 + score * .2),
    ignorado: Math.max(6, 35 - score * .25 + (1 - budgetEfficiency) * 12),
    negativo: Math.max(3, 21 - score * .16 + overspend * 9),
  };
  const total = raw.forte + raw.moderado + raw.ignorado + raw.negativo;
  const forte = Math.round(raw.forte / total * 100);
  const moderado = Math.round(raw.moderado / total * 100);
  const ignorado = Math.round(raw.ignorado / total * 100);
  const negativo = 100 - forte - moderado - ignorado;
  return {
    probabilities: { forte, moderado, ignorado, negativo } as Record<MarketingCampaignOutcome, number>,
    score: Math.round(score), idealBudget: Math.round(idealBudget), budgetEfficiency,
    factors: [
      `${quality >= 70 ? "Boa" : quality >= 50 ? "Média" : "Baixa"} qualidade do produto (${Math.round(quality)}%)`,
      `${capacityFit >= 60 ? "Capacidade disponível" : "Equipe próxima do limite"} (${Math.round(capacityFit)}%)`,
      `${audienceFit >= 75 ? "Público adequado" : "Público difícil"} para ${company.sector}`,
      `${priceFit >= 65 ? "Preço coerente" : "Preço desalinhado"} com o público (${Math.round(priceFit)}%)`,
      `${economicFit >= 60 ? "Economia favorável" : "Economia cautelosa"}`,
      `${competitionFit >= 60 ? "Boa posição contra rivais" : "Concorrência mais forte"} (${Math.round(competitionFit)}%)`,
      `${budget > idealBudget * 2 ? "Orçamento saturado" : budget < idealBudget * .45 ? "Orçamento curto" : "Orçamento coerente"}`,
    ],
  };
}

function rollMarketingPulse(company: Company, metrics: ReturnType<typeof companyMetrics>, week: number): MarketingPulse {
  const campaigns = (company.marketingCampaigns ?? []).filter((campaign) => campaign.weeksLeft > 0);
  if (campaigns.length) {
    const customerDelta = campaigns.reduce((sum, campaign) => sum + Math.round(campaign.totalCustomerImpact / campaign.duration), 0);
    const multiplier = campaigns.reduce((value, campaign) => value * (1 + (campaign.revenueMultiplier - 1) / campaign.duration), 1);
    const reputationDelta = campaigns.reduce((sum, campaign) => sum + campaign.totalReputationImpact / campaign.duration, 0);
    const strongest = campaigns.reduce<MarketingCampaignOutcome>((result, campaign) => campaign.outcome === "negativo" ? "negativo" : campaign.outcome === "forte" && result !== "negativo" ? "forte" : result, campaigns[0].outcome);
    const mappedOutcome: MarketingPulse["outcome"] = strongest === "moderado" ? "positivo" : strongest === "ignorado" ? "fraco" : strongest;
    return { week, outcome: mappedOutcome, multiplier, customerDelta, reputationDelta, efficiency: Math.round(campaigns.reduce((sum, campaign) => sum + campaign.probabilities.forte + campaign.probabilities.moderado, 0) / campaigns.length), detail: campaigns.map((campaign) => `${campaign.name}: ${marketingOutcomeLabels[campaign.outcome]}`).join(" · ") };
  }
  if (company.marketing <= 0) return { week, outcome: "organico", multiplier: 1, customerDelta: 0, efficiency: 0, detail: "Sem campanha paga: crescimento depende apenas de reputação, preço e indicação." };
  const capacity = companyCommercialCapacity(company);
  const marketProducts = company.projects.filter((product) => product.kind === "produto" && product.lifecycle === "mercado");
  const quality = marketProducts.length ? marketProducts.reduce((sum, product) => sum + product.quality, 0) / marketProducts.length : 48;
  const idealSpend = Math.max(4500, metrics.revenue * .14);
  const efficiency = clamp((1 - Math.exp(-company.marketing / idealSpend)) * 100);
  const overspend = Math.max(0, company.marketing / Math.max(1, idealSpend) - 1.8);
  const score = quality * .34 + company.reputation * .28 + capacity.morale * .18 + Math.random() * 28 - overspend * 18;
  const room = Math.max(0, capacity.customerCapacity - company.customers);
  if (score >= 72) return { week, outcome: "forte", multiplier: 1.13, customerDelta: Math.max(1, Math.round(room * efficiency / 100 * .16)), efficiency: Math.round(efficiency), detail: "A campanha encontrou o público certo e converteu acima do esperado." };
  if (score >= 52) return { week, outcome: "positivo", multiplier: 1.055, customerDelta: Math.max(0, Math.round(room * efficiency / 100 * .09)), efficiency: Math.round(efficiency), detail: "A campanha trouxe crescimento, mas parte do alcance não virou venda." };
  if (score >= 35) return { week, outcome: "fraco", multiplier: .99, customerDelta: 0, efficiency: Math.round(efficiency), detail: "A campanha gerou atenção, porém quase nenhum retorno mensurável." };
  return { week, outcome: "negativo", multiplier: .91, customerDelta: -Math.max(1, Math.round(company.customers * .025)), efficiency: Math.round(efficiency), detail: overspend > .4 ? "O excesso de mídia cansou o público e destruiu valor em vez de criar demanda." : "A mensagem foi rejeitada e provocou avaliações negativas." };
}

function companyMetrics(
  company: Company,
  economy: Economy = initialState.economy,
) {
  const payroll = company.employees.reduce((sum, e) => sum + e.salary, 0);
  const commercial = companyCommercialCapacity(company);
  const morale = commercial.morale;
  const skill = commercial.skill;
  const capacity = commercial.operatingCapacity;
  const sectorMultiplier = commercial.sectorMultiplier;
  const baseRevenue = Math.min(
    company.customers * company.price,
    capacity * 410 * sectorMultiplier,
  );
  const activeMarketingCampaigns = (company.marketingCampaigns ?? []).filter((campaign) => campaign.weeksLeft > 0);
  const campaignRevenueMultiplier = activeMarketingCampaigns.length
    ? activeMarketingCampaigns.reduce((value, campaign) => value * (1 + (campaign.revenueMultiplier - 1) / campaign.duration), 1)
    : company.marketingMultiplier ?? 1;
  const recurringRevenue = Math.min(company.productRevenue ?? 0, commercial.productRevenueCapacity) * (company.campaignWeeks ? 1.08 : 1);
  const contractRevenue = (company.partners ?? [])
    .filter((partner) => partner.kind === "cliente" && partner.status === "ativo")
    .reduce((sum, partner) => sum + partner.weeklyValue * (0.78 + partner.trust / 450), 0);
  const supplierCosts = (company.partners ?? [])
    .filter((partner) => partner.kind === "fornecedor" && partner.status === "ativo")
    .reduce((sum, partner) => sum + partner.weeklyValue, 0);
  const effectRevenue = (company.effects ?? []).reduce(
    (multiplier, effect) => multiplier * (effect.revenueMultiplier ?? 1),
    1,
  );
  const effectCosts = (company.effects ?? []).reduce(
    (multiplier, effect) => multiplier * (effect.costMultiplier ?? 1),
    1,
  );
  const preliminaryRevenue = Math.round(
    (baseRevenue + recurringRevenue + contractRevenue) *
      (0.75 + company.reputation / 250) *
      economy.demand *
      (0.9 + economy.confidence / 500) *
      campaignRevenueMultiplier *
      effectRevenue,
  );
  const weeklyPayroll = payroll / 4.33;
  const weeklyOverhead = (12500 + company.employees.length * 800) / 4.33;
  const productMarketing = company.projects.reduce(
    (sum, p) =>
      sum + (p.lifecycle === "mercado" ? (p.productMarketing ?? 0) : 0),
    0,
  );
  const productMaintenance = company.projects.filter((product) => product.kind === "produto" && product.lifecycle === "mercado").reduce((sum, product) => sum + (product.maintenanceCost ?? productBlueprint(company.sector, product.complexity ?? 3).maintenanceCost) * (1 + (product.bugLevel ?? 0) / 80), 0);
  const facilityMaintenance = facilitySummary(company).weeklyMaintenance;
  const baseCosts =
    ((weeklyPayroll + company.marketing + productMarketing + productMaintenance + facilityMaintenance + weeklyOverhead + supplierCosts) *
      economy.costs *
      (company.efficiency ?? 1) +
      company.debt * economy.interest) *
    effectCosts;
  const scale = businessScaleFor(preliminaryRevenue);
  const scaleProfile = businessScaleProfiles[scale];
  const complexityCost = Math.round((scaleProfile.administration + preliminaryRevenue * scaleProfile.complianceRate + Math.pow(Math.max(0, company.employees.length - 4), 1.35) * 380) * economy.costs);
  const requiredReserve = Math.round((baseCosts + complexityCost) * scaleProfile.reserveWeeks);
  const cashCoverage = requiredReserve > 0 ? company.cash / requiredReserve : 1;
  const liquidityFactor = cashCoverage >= 1 ? 1 : clamp(.78 + Math.max(0, cashCoverage) * .22, .72, 1);
  const revenue = Math.round(preliminaryRevenue * liquidityFactor);
  const preTaxProfit = revenue - baseCosts - complexityCost;
  const taxes = Math.round(Math.max(0, preTaxProfit) * scaleProfile.taxRate);
  const idleCashThreshold = Math.max(requiredReserve * 4, 1000000);
  const idleCashCost = Math.round(Math.max(0, company.cash - idleCashThreshold) * .00035);
  const costs = baseCosts + complexityCost + taxes + idleCashCost;
  const profit = Math.round(revenue - costs);
  const valuation = Math.max(30000, Math.round(company.cash * .58 + Math.max(0, profit) * 52 * scaleProfile.valuationMultiple + revenue * 2.4 + company.reputation * 2300 - company.debt * 1.08));
  return { payroll, morale, skill, revenue, preliminaryRevenue, baseCosts, costs, profit, preTaxProfit, taxes, complexityCost, idleCashCost, requiredReserve, cashCoverage, liquidityFactor, scale, scaleProfile, valuation, productMaintenance, facilityMaintenance, customerCapacity: commercial.customerCapacity, productRevenueCapacity: commercial.productRevenueCapacity };
}

function buildFinancialEntries(previous: GameState, companies: Company[], economy: Economy, week: number): FinancialEntry[] {
  const entries: FinancialEntry[] = [];
  companies.filter((company) => !company.sold && !company.bankrupt && !company.closed).forEach((company, companyIndex) => {
    const before = previous.companies.find((item) => item.id === company.id);
    const metrics = companyMetrics(company, economy);
    const weeklyPayroll = metrics.payroll / 4.33;
    const productMarketing = company.projects.reduce((sum, product) => sum + (product.lifecycle === "mercado" ? product.productMarketing ?? 0 : 0), 0);
    const weeklyOverhead = (12500 + company.employees.length * 800) / 4.33;
    const productMaintenance = metrics.productMaintenance;
    const facilityMaintenance = metrics.facilityMaintenance;
    const supplierCosts = (company.partners ?? []).filter((partner) => partner.kind === "fornecedor" && partner.status === "ativo").reduce((sum, partner) => sum + partner.weeklyValue, 0);
    const interest = company.debt * economy.interest;
    const launchedCampaignSpend = (company.marketingCampaigns ?? []).filter((campaign) => campaign.startedWeek === week).reduce((sum, campaign) => sum + campaign.totalBudget, 0);
    const nominalCosts = weeklyPayroll + company.marketing + productMarketing + productMaintenance + facilityMaintenance + weeklyOverhead + supplierCosts + interest;
    const costFactor = nominalCosts > 0 ? metrics.baseCosts / nominalCosts : 1;
    const add = (category: FinancialEntry["category"], label: string, amount: number, detail: string) => {
      if (Math.abs(amount) < 1) return;
      entries.push({ id: `${week}-${company.id}-${category}-${companyIndex}-${entries.length}`, week, companyId: company.id, companyName: company.name, category, label, amount: Math.round(amount), detail });
    };
    add("receita", "Receita da operação", metrics.revenue, "Clientes, produtos em mercado e contratos ativos.");
    add("equipe", "Folha semanal", -weeklyPayroll * costFactor, `${company.employees.length} profissionais na equipe.`);
    add("marketing", "Marketing e divulgação", -(company.marketing + productMarketing) * costFactor, company.marketingPulse ? company.marketingPulse.detail : "Campanhas da empresa e dos produtos.");
    add("marketing", "Nova campanha estratégica", -launchedCampaignSpend, "Orçamento comprometido no lançamento; os resultados serão distribuídos nas próximas semanas.");
    add("estrutura", "Estrutura operacional", -weeklyOverhead * costFactor, "Escritório, ferramentas, suporte e manutenção.");
    add("estrutura", "Investimentos físicos", -facilityMaintenance * costFactor, `${facilityModeLabels[company.facilityMaintenanceMode ?? "adequado"].label}; condição média de ${Math.round(facilitySummary(company).averageCondition)}%.`);
    add("estrutura", "Manutenção dos produtos", -productMaintenance * costFactor, "Suporte, infraestrutura, correções e operação dos produtos no mercado.");
    add("contratos", "Fornecedores", -supplierCosts * costFactor, "Contratos de fornecimento ativos nesta semana.");
    add("juros", "Juros da dívida", -interest * costFactor, `Dívida atual de ${money.format(company.debt)}.`);
    add("estrutura", "Administração e conformidade", -metrics.complexityCost, `${metrics.scaleProfile.label}: processos, controles, licenças e gestão da complexidade.`);
    add("tributos", "Impostos sobre o resultado", -metrics.taxes, `Alíquota efetiva da faixa: ${Math.round(metrics.scaleProfile.taxRate * 100)}%.`);
    add("estrutura", "Gestão de caixa excedente", -metrics.idleCashCost, "Tesouraria, seguros, controles e custo de manter capital ocioso acima da reserva estratégica.");
    if (before) {
      const expectedCashChange = metrics.profit - launchedCampaignSpend;
      const actualCashChange = company.cash - before.cash;
      const extraordinary = actualCashChange - expectedCashChange;
      add("eventos", extraordinary >= 0 ? "Decisões e eventos extraordinários" : "Decisões, dividendos e eventos", extraordinary, "Movimentos fora da operação normal, incluindo decisões narrativas, custos jurídicos e ações do CEO.");
    }
  });
  return entries;
}

function createDynastyTransition(state: GameState, outgoing: string, incoming: string, generation: number): DynastyTransition {
  const operating = state.companies.filter((company) => !company.sold && !company.bankrupt && !company.closed);
  const empireValue = state.personalCash + operating.reduce((sum, company) => sum + companyMetrics(company, state.economy).valuation, 0);
  const tenure = state.dynastyMode ? Math.max(1, state.week - (state.dynastyStartedWeek ?? state.retiredWeek ?? 1)) : Math.max(1, state.week);
  const performance = state.reputation + (state.dynastyLegitimacy ?? 50) + Math.min(80, operating.length * 12);
  const verdict = performance >= 205
    ? `${outgoing} deixa um grupo mais forte e uma sombra difícil de superar.`
    : performance >= 145
      ? `${outgoing} entrega uma holding estável, mas ainda divide opiniões no conselho.`
      : `${outgoing} passa o bastão sob dúvidas, cobranças e risco de interferir no novo governo.`;
  return {
    week: state.week,
    outgoing,
    incoming,
    generation,
    tenure,
    empireValue,
    activeCompanies: operating.length,
    employees: operating.reduce((sum, company) => sum + company.employees.length, 0),
    reputation: Math.round(state.reputation),
    verdict,
  };
}

function formerPresidentProfile(state: GameState, name: string, generation: number, startWeek: number, endWeek: number, style: CEOStyle): FormerPresident {
  const heir = (state.heirs ?? []).find((candidate) => candidate.name === name);
  const relationship = heir ? clamp(heir.bond - (heir.resentment ?? 0) * .35 + (heir.support ?? 50) * .25) : clamp((state.familyUnity ?? 70) * .8);
  const influence = clamp(30 + state.reputation * .25 + (state.dynastyLegitimacy ?? 50) * .25 + (heir?.equity ?? state.founderHoldingEquity ?? 0) * .3);
  const age = Math.round(name === state.founder ? (state.founderStartAge ?? 28) + endWeek / 52 : (heir?.startAge ?? 24) + Math.max(0, endWeek - startWeek) / 52);
  return {
    name,
    generation,
    startWeek,
    endWeek,
    style,
    influence,
    relationship,
    ambition: heir?.ambition ?? (name === state.founder ? 68 : 55),
    reputation: heir?.competence ?? state.reputation,
    status: relationship >= 68 ? "aliado" : relationship < 42 ? "oposicao" : "neutro",
    legacy: generation === 1 ? `Fundou a ${state.holdingName}.` : `Conduziu a holding por ${Math.max(1, endWeek - startWeek)} semanas.`,
    lastMove: "Entregou o comando, mas manteve voz no conselho.",
    age,
    health: clamp(100 - Math.max(0, age - 58) * 2.2),
    alive: true,
    memoir: `Os anos em que ${name} comandou a geração ${generation}`,
    secret: generation === 1 ? "Um acordo dos primeiros anos transferiu garantias pessoais para a holding." : "Uma decisão importante do mandato foi tomada sem registrar a discordância do conselho.",
  };
}

function generationProfileFor(leader: string, generation: number, style: CEOStyle, week: number, age = 38): GenerationProfile {
  const profiles: Record<CEOStyle, { title: string; doctrine: string; promise: string; risk: number }> = {
    crescimento: { title: "A geração da conquista", doctrine: "Crescer antes que os rivais ocupem o espaço", promise: "Entregar uma holding maior do que recebeu", risk: 78 },
    eficiencia: { title: "A geração da disciplina", doctrine: "Proteger caixa, margem e controle", promise: "Eliminar desperdícios sem desmontar o legado", risk: 34 },
    inovacao: { title: "A geração da reinvenção", doctrine: "Criar o próximo negócio antes que o atual envelheça", promise: "Lançar produtos que mudem a identidade do grupo", risk: 67 },
    pessoas: { title: "A geração da união", doctrine: "Pessoas e família sustentam resultados duradouros", promise: "Deixar uma cultura mais forte que qualquer presidente", risk: 45 },
  };
  const profile = profiles[style];
  return { leader, generation, style, title: profile.title, doctrine: profile.doctrine, promise: profile.promise, riskTolerance: profile.risk, startWeek: week, age, health: clamp(100 - Math.max(0, age - 58) * 2) };
}

function createDynastyEnding(state: GameState): DynastyEnding {
  const operating = state.companies.filter((company) => !company.sold && !company.bankrupt && !company.closed);
  const value = state.personalCash + operating.reduce((sum, company) => sum + companyMetrics(company, state.economy).valuation, 0);
  const people = operating.reduce((sum, company) => sum + company.employees.length, 0);
  const control = 100 - (state.outsideFamilyEquity ?? 0);
  const familyUnity = state.familyUnity ?? 70;
  const legitimacy = state.dynastyLegitimacy ?? 60;
  const readyHeirs = (state.heirs ?? []).filter((heir) => heir.status !== "afastado");
  const heirReadiness = readyHeirs.length
    ? readyHeirs.reduce((sum, heir) => sum + heir.competence * .55 + (heir.support ?? 50) * .25 + heir.bond * .2, 0) / readyHeirs.length
    : 18;
  const profitableCompanies = operating.filter((company) => companyMetrics(company, state.economy).profit > 0).length;
  const profitableRatio = operating.length ? profitableCompanies / operating.length * 100 : 0;
  const continuityScore = clamp(familyUnity * .28 + control * .24 + legitimacy * .2 + heirReadiness * .18 + profitableRatio * .1);
  const extraGenerations = continuityScore >= 82
    ? 3 + Math.floor(Math.random() * 4)
    : continuityScore >= 65
      ? 2 + Math.floor(Math.random() * 3)
      : continuityScore >= 45
        ? 1 + Math.floor(Math.random() * 3)
        : Math.floor(Math.random() * 2);
  const founderLegacyEndsGeneration = (state.generation ?? 1) + extraGenerations;
  const futureYears = Math.max(8, extraGenerations * 24 + 6 + Math.floor(Math.random() * 13));
  const type: DynastyEnding["type"] = operating.length === 0 || value < 100000
    ? "queda"
    : control < 35 || familyUnity < 30
      ? "fragmentacao"
      : continuityScore >= 78 && familyUnity >= 60 && control >= 55
        ? "centenario"
        : "imperio";
  const copy = {
    centenario: ["Uma dinastia centenária", `A família atravessou ${state.generation} gerações sem perder a capacidade de permanecer unida.`],
    imperio: ["O império empresarial", `A holding sobreviveu pela força dos negócios, mesmo carregando disputas que jamais desapareceram.`],
    fragmentacao: ["O sobrenome se dividiu", `A riqueza permaneceu, mas controle e afeto se espalharam entre facções que já não reconhecem uma única liderança.`],
    queda: ["O fim da holding", `Depois de gerações de decisões, o grupo perdeu suas operações e restou apenas a história do que poderia ter sido.`],
  }[type];
  const futureMultiplier = type === "centenario"
    ? 1.35 + extraGenerations * .42 + Math.random() * .4
    : type === "imperio"
      ? .9 + extraGenerations * .3 + Math.random() * .35
      : type === "fragmentacao"
        ? .45 + extraGenerations * .16 + Math.random() * .2
        : .04 + Math.random() * .12;
  const futureValue = Math.max(0, Math.round(value * futureMultiplier));
  const futureCompanies = type === "queda"
    ? 0
    : Math.max(1, Math.round(operating.length * (type === "fragmentacao" ? .55 : 1 + extraGenerations * .23 + Math.random() * .25)));
  const futurePeople = type === "queda"
    ? Math.max(0, Math.round(people * .08))
    : Math.max(futureCompanies, Math.round(people * (type === "fragmentacao" ? .62 : 1 + extraGenerations * .2 + Math.random() * .2)));
  const futureNarrative = type === "centenario"
    ? `Depois que você deixou o comando, a família preservou o controle e profissionalizou a sucessão. O nome de ${state.founder} ainda orientou decisões por ${futureYears} anos, até a geração ${founderLegacyEndsGeneration}, quando novos líderes transformaram a holding sem apagar sua origem.`
    : type === "imperio"
      ? `Nos ${futureYears} anos seguintes, a holding alternou expansão, crises e reconciliações. O legado empresarial de ${state.founder} resistiu até a geração ${founderLegacyEndsGeneration}; depois disso, o grupo continuou, mas já guiado por valores e ambições diferentes dos primeiros anos.`
      : type === "fragmentacao"
        ? `Após o capítulo encerrado por você, herdeiros dividiram empresas, patrimônio e influência. Partes do grupo sobreviveram por mais ${futureYears} anos, mas o legado comum de ${state.founder} terminou na geração ${founderLegacyEndsGeneration}, quando o sobrenome deixou de representar um único projeto.`
        : `O futuro foi curto e duro: ativos foram vendidos, equipes se dispersaram e as últimas operações desapareceram ao longo de ${futureYears} anos. A geração ${founderLegacyEndsGeneration} foi a última a carregar o legado empresarial de ${state.founder}.`;
  const secretEnding = Boolean(state.founderDeceased) && familyUnity < 25 && (state.outsideFamilyEquity ?? 0) > 60
    ? ["O fundador esquecido", `O grupo sobreviveu por algum tempo, mas o nome de ${state.founder} foi removido de prédios, produtos e discursos. O patrimônio continuou; a memória não.`]
    : (state.heirs ?? []).length > 0 && (state.heirs ?? []).every((heir) => heir.status === "rompido" || heir.status === "afastado")
      ? ["O império sem herdeiros", "Executivos profissionais preservaram as empresas, mas nenhuma pessoa da família quis — ou pôde — carregar o projeto adiante."]
      : (state.dynastyHistory ?? []).some((entry) => /derrubou|perdeu a confiança/i.test(entry))
        ? ["A cadeira que expulsou seus donos", "A dinastia continuou depois de derrubar um de seus próprios presidentes. O conselho provou que o sobrenome abria portas, mas já não garantia o comando."]
        : (state.generation ?? 1) >= 4 && familyUnity >= 80 && control >= 65
          ? ["A família centenária", `Quatro gerações ou mais atravessaram crises sem transformar parentes em inimigos permanentes. O maior ativo de ${state.founder} não foi uma empresa, mas uma família capaz de continuar conversando.`]
          : undefined;
  return {
    type,
    title: copy[0],
    narrative: copy[1],
    generation: state.generation ?? 1,
    value,
    companies: operating.length,
    people,
    founderLegacyEndsGeneration,
    futureYears,
    futureValue,
    futureCompanies,
    futurePeople,
    futureNarrative,
    secretEndingTitle: secretEnding?.[0],
    secretEndingNarrative: secretEnding?.[1],
  };
}

const averageStress = (company: Company) => company.employees.length
  ? company.employees.reduce((sum, employee) => sum + (employee.stress ?? 0), 0) / company.employees.length
  : 0;

function recordDecisionTrace(
  before: GameState,
  after: GameState,
  title: string,
  decision: string,
  result: string,
): GameState {
  const changedCompanies = after.companies.filter((company) => {
    const old = before.companies.find((item) => item.id === company.id);
    return !old || JSON.stringify({ cash: old.cash, price: old.price, marketing: old.marketing, customers: old.customers, reputation: old.reputation, board: old.boardSupport, projects: old.projects, employees: old.employees, partners: old.partners, ceo: old.ceo }) !== JSON.stringify({ cash: company.cash, price: company.price, marketing: company.marketing, customers: company.customers, reputation: company.reputation, board: company.boardSupport, projects: company.projects, employees: company.employees, partners: company.partners, ceo: company.ceo });
  });
  const company = changedCompanies.find((item) => item.id === before.activeCompanyId) ?? changedCompanies[0] ?? after.companies.find((item) => item.id === before.activeCompanyId);
  const oldCompany = company ? before.companies.find((item) => item.id === company.id) : undefined;
  const impacts: DecisionImpact[] = [];
  const impactKeys = new Set<IndicatorChange["key"]>();
  const affectedCharacters = new Set<string>();
  const addImpact = (label: string, tone: DecisionImpact["tone"], ...keys: IndicatorChange["key"][]) => {
    impacts.push({ label, tone });
    keys.forEach((key) => impactKeys.add(key));
  };

  if (company && oldCompany) {
    const cashDelta = company.cash - oldCompany.cash;
    if (Math.abs(cashDelta) >= 1000) addImpact(`${cashDelta > 0 ? "Entrada" : "Saída"} imediata de ${money.format(Math.abs(cashDelta))} no caixa`, cashDelta > 0 ? "positivo" : "negativo", "cash", "profit");
    if (company.marketing !== oldCompany.marketing) addImpact(`Marketing semanal ${company.marketing > oldCompany.marketing ? "aumentou" : "caiu"} para ${money.format(company.marketing)}`, company.marketing > oldCompany.marketing ? "positivo" : "neutro", "revenue", "customers", "profit", "cash");
    if (company.price !== oldCompany.price) addImpact(`Preço mudou de ${money.format(oldCompany.price)} para ${money.format(company.price)}`, "neutro", "revenue", "customers", "profit");
    if (company.customers !== oldCompany.customers) addImpact(`${Math.abs(company.customers - oldCompany.customers)} clientes ${company.customers > oldCompany.customers ? "conquistados" : "perdidos"} imediatamente`, company.customers > oldCompany.customers ? "positivo" : "negativo", "customers", "revenue");
    if (company.reputation !== oldCompany.reputation) addImpact(`Reputação ${company.reputation > oldCompany.reputation ? "fortalecida" : "desgastada"}`, company.reputation > oldCompany.reputation ? "positivo" : "negativo", "reputation", "revenue", "valuation");
    if ((company.boardSupport ?? 50) !== (oldCompany.boardSupport ?? 50)) addImpact(`Apoio do conselho ${Number(company.boardSupport ?? 50) > Number(oldCompany.boardSupport ?? 50) ? "aumentou" : "diminuiu"}`, Number(company.boardSupport ?? 50) > Number(oldCompany.boardSupport ?? 50) ? "positivo" : "negativo", "board", "valuation");
    if (company.employees.length !== oldCompany.employees.length) addImpact(`Equipe passou de ${oldCompany.employees.length} para ${company.employees.length} pessoas`, company.employees.length > oldCompany.employees.length ? "positivo" : "negativo", "morale", "stress", "profit", "revenue");
    if (company.projects.length !== oldCompany.projects.length) addImpact(`${company.projects.length > oldCompany.projects.length ? "Novo projeto entrou" : "Projeto saiu"} do portfólio`, "neutro", "cash", "profit", "revenue", "valuation", "stress");
    company.employees.forEach((employee) => {
      const oldEmployee = oldCompany.employees.find((item) => item.id === employee.id);
      if (!oldEmployee || employee.salary !== oldEmployee.salary || employee.morale !== oldEmployee.morale || employee.loyalty !== oldEmployee.loyalty || (employee.memories?.length ?? 0) > (oldEmployee.memories?.length ?? 0)) affectedCharacters.add(employee.name);
    });
    if (company.ceo !== oldCompany.ceo || company.ceoLoyalty !== oldCompany.ceoLoyalty || (company.ceoMemories?.length ?? 0) > (oldCompany.ceoMemories?.length ?? 0)) affectedCharacters.add(company.ceo);
  }
  (after.heirs ?? []).forEach((heir) => {
    const oldHeir = (before.heirs ?? []).find((item) => item.id === heir.id);
    if (oldHeir && (heir.bond !== oldHeir.bond || heir.resentment !== oldHeir.resentment || (heir.memories?.length ?? 0) > (oldHeir.memories?.length ?? 0))) affectedCharacters.add(heir.name);
  });
  if (!impacts.length) addImpact("A decisão alterou relações, estratégia ou poder político", "neutro", "reputation", "board", "valuation");
  const derivedNewsIds = after.news.filter((item) => !before.news.some((old) => old.id === item.id)).map((item) => item.id);
  const duration = impactKeys.has("revenue") || impactKeys.has("valuation") ? 12 : impactKeys.has("morale") || impactKeys.has("board") ? 10 : 8;
  const trace: DecisionTrace = {
    id: `decision-${before.week}-${Date.now()}-${Math.round(Math.random() * 9999)}`,
    week: before.week,
    actor: before.playerExecutive ?? before.founder,
    title,
    decision,
    result,
    companyId: company?.id,
    companyName: company?.name,
    expiresWeek: before.week + duration,
    impactKeys: [...impactKeys],
    impacts: impacts.slice(0, 5),
    affectedCharacters: [...affectedCharacters].slice(0, 8),
    derivedNewsIds,
    observations: [],
  };
  const history = (after.decisionTraces ?? before.decisionTraces ?? []).filter((item) => !(item.week === trace.week && item.title === trace.title && item.companyId === trace.companyId));
  return { ...after, decisionTraces: [trace, ...history].slice(0, 50) };
}

function observeDecisionTraces(traces: DecisionTrace[] | undefined, report: WeeklyReport, weeklyNews: NewsItem[]): DecisionTrace[] {
  return (traces ?? []).map((trace) => {
    if (trace.week >= report.week || trace.expiresWeek < report.week || trace.observations.some((item) => item.week === report.week)) return trace;
    const companyReport = report.companies.find((item) => item.companyId === trace.companyId) ?? report.companies[0];
    if (!companyReport) return trace;
    const candidates = companyReport.indicators
      .filter((indicator) => trace.impactKeys.includes(indicator.key) && Math.abs(indicator.delta) >= (indicator.format === "money" ? 500 : 0.5))
      .sort((a, b) => Math.abs(b.delta) - Math.abs(a.delta))
      .slice(0, 2);
    const observations = candidates.map((indicator): DecisionObservation => ({
      week: report.week,
      companyId: companyReport.companyId,
      indicator: indicator.key,
      label: indicator.label,
      delta: indicator.delta,
      format: indicator.format,
      tone: indicator.delta === 0 ? "neutro" : ["stress"].includes(indicator.key) ? indicator.delta < 0 ? "positivo" : "negativo" : indicator.delta > 0 ? "positivo" : "negativo",
    }));
    const relatedNews = weeklyNews.filter((item) => trace.companyName && `${item.headline} ${item.body}`.includes(trace.companyName)).map((item) => item.id);
    return { ...trace, observations: [...observations, ...trace.observations].slice(0, 16), derivedNewsIds: [...new Set([...trace.derivedNewsIds, ...relatedNews])].slice(0, 12) };
  });
}

function buildWeeklyReport(
  previous: GameState,
  companies: Company[],
  economy: Economy,
  week: number,
): WeeklyReport {
  const companyReports = companies
    .filter((company) => !company.sold && !company.bankrupt && !company.closed)
    .map((company): CompanyWeeklyReport => {
      const beforeCompany = previous.companies.find((item) => item.id === company.id) ?? company;
      const before = companyMetrics(beforeCompany, previous.economy);
      const after = companyMetrics(company, economy);
      const beforeStress = averageStress(beforeCompany);
      const afterStress = averageStress(company);
      const customerDelta = company.customers - beforeCompany.customers;
      const reputationDelta = company.reputation - beforeCompany.reputation;
      const productDelta = (company.productRevenue ?? 0) - (beforeCompany.productRevenue ?? 0);
      const employeeDelta = company.employees.length - beforeCompany.employees.length;
      const completed = company.projects.filter((project) =>
        project.status === "concluido" && beforeCompany.projects.some((old) => old.id === project.id && old.status !== "concluido"),
      );
      const changedCEO = company.ceoLastDecision !== beforeCompany.ceoLastDecision;
      const economyChanged = economy.cycle !== previous.economy.cycle;
      const confidenceDelta = economy.confidence - previous.economy.confidence;
      const reason = (title: string, detail: string, direction: IndicatorReason["direction"]): IndicatorReason => ({ title, detail, direction });
      const fallback = (detail: string): IndicatorReason[] => [reason("Variação operacional normal", detail, "neutro")];

      const revenueReasons: IndicatorReason[] = [];
      const activeClientValue = (company.partners ?? []).filter((partner) => partner.kind === "cliente" && partner.status === "ativo").reduce((sum, partner) => sum + partner.weeklyValue, 0);
      const activeSupplierValue = (company.partners ?? []).filter((partner) => partner.kind === "fornecedor" && partner.status === "ativo").reduce((sum, partner) => sum + partner.weeklyValue, 0);
      if (activeClientValue > 0) revenueReasons.push(reason("Grandes contratos", `${money.format(activeClientValue)} por semana estão contratados com clientes estratégicos antes do ajuste de confiança.`, "positivo"));
      if (customerDelta !== 0) revenueReasons.push(reason("Base de clientes", `${Math.abs(customerDelta)} cliente${Math.abs(customerDelta) === 1 ? "" : "s"} ${customerDelta > 0 ? "entraram" : "saíram"} da carteira.`, customerDelta > 0 ? "positivo" : "negativo"));
      if (productDelta !== 0) revenueReasons.push(reason("Produtos no mercado", `A receita recorrente dos produtos mudou ${money.format(productDelta)} por semana.`, productDelta > 0 ? "positivo" : "negativo"));
      if (economyChanged || Math.abs(confidenceDelta) >= 2) revenueReasons.push(reason("Ambiente econômico", `Demanda em ${Math.round(economy.demand * 100)}% e confiança em ${economy.confidence}/100${economyChanged ? ` durante ${economy.cycle}` : ""}.`, economy.demand >= previous.economy.demand && confidenceDelta >= 0 ? "positivo" : "negativo"));
      if (reputationDelta !== 0) revenueReasons.push(reason("Reputação comercial", `A reputação ${reputationDelta > 0 ? "subiu" : "caiu"} ${Math.abs(reputationDelta).toFixed(1)} ponto${Math.abs(reputationDelta) >= 2 ? "s" : ""} e alterou a conversão de vendas.`, reputationDelta > 0 ? "positivo" : "negativo"));
      if (Math.abs(after.morale - before.morale) >= 1.5 || employeeDelta !== 0) revenueReasons.push(reason("Capacidade da equipe", `A operação terminou com ${company.employees.length} pessoas e moral média de ${Math.round(after.morale)}%.`, after.morale >= before.morale && employeeDelta >= 0 ? "positivo" : "negativo"));

      const costReasons: IndicatorReason[] = [
        reason("Folha e estrutura", `${money.format(after.payroll)}/mês em salários, marketing de ${money.format(company.marketing)}/semana e custos fixos da operação.`, after.payroll <= before.payroll ? "positivo" : "neutro"),
      ];
      if (activeSupplierValue > 0) costReasons.push(reason("Fornecedores estratégicos", `${money.format(activeSupplierValue)} por semana sustentam insumos, tecnologia, mídia ou logística.`, "negativo"));
      if (economy.costs !== previous.economy.costs) costReasons.push(reason("Inflação de custos", `O multiplicador econômico passou de ${(previous.economy.costs * 100).toFixed(0)}% para ${(economy.costs * 100).toFixed(0)}%.`, economy.costs <= previous.economy.costs ? "positivo" : "negativo"));
      if (company.debt > 0) costReasons.push(reason("Juros da dívida", `${money.format(company.debt)} de dívida geram juros semanais de ${(economy.interest * 100).toFixed(1)}%.`, "negativo"));
      if (after.complexityCost > 0) costReasons.push(reason(after.scaleProfile.label, `${money.format(after.complexityCost)} foram consumidos por administração, licenças e conformidade nesta escala.`, "negativo"));
      if (after.taxes > 0) costReasons.push(reason("Impostos sobre resultado", `${money.format(after.taxes)} foram recolhidos com alíquota de ${Math.round(after.scaleProfile.taxRate * 100)}%.`, "negativo"));
      if (after.cashCoverage < 1) revenueReasons.push(reason("Capital de giro insuficiente", `O caixa cobre ${Math.max(0, Math.round(after.cashCoverage * 100))}% da reserva recomendada de ${money.format(after.requiredReserve)}, reduzindo a capacidade de atender e vender.`, "negativo"));
      if ((company.effects ?? []).length) costReasons.push(reason("Consequências ativas", (company.effects ?? []).map((effect) => `${effect.name} (${effect.weeksLeft} sem.)`).join("; "), "neutro"));

      const cashReasons: IndicatorReason[] = [reason("Resultado operacional", `${after.profit >= 0 ? "Lucro" : "Prejuízo"} estimado de ${money.format(Math.abs(after.profit))} na operação.`, after.profit >= 0 ? "positivo" : "negativo")];
      if (completed.length) cashReasons.push(reason("Entregas concluídas", `${completed.map((project) => project.name).join(", ")} gerou recompensa ou iniciou receita de produto.`, "positivo"));
      if ((company.dividendRate ?? 0) > 0 && after.profit > 0) cashReasons.push(reason("Dividendos", `A política distribui até ${company.dividendRate}% do lucro disponível para a holding.`, "negativo"));
      if (changedCEO && company.ceo !== (previous.playerExecutive ?? previous.founder)) cashReasons.push(reason("Decisão do CEO", company.ceoLastDecision ?? "A gestão delegada movimentou recursos.", "neutro"));
      const explainedCash = after.profit;
      const residualCash = company.cash - beforeCompany.cash - explainedCash;
      if (Math.abs(residualCash) >= 5000) cashReasons.push(reason("Investimentos e eventos", `${money.format(Math.abs(residualCash))} ${residualCash > 0 ? "entraram por recompensas, autonomia ou economia compartilhada" : "saíram em projetos, decisões, problemas, processos ou dividendos"}.`, residualCash > 0 ? "positivo" : "negativo"));

      const peopleReasons: IndicatorReason[] = [];
      if (afterStress !== beforeStress) peopleReasons.push(reason("Pressão e recuperação", `O estresse médio ${afterStress > beforeStress ? "subiu" : "caiu"} de ${Math.round(beforeStress)}% para ${Math.round(afterStress)}%.`, afterStress <= beforeStress ? "positivo" : "negativo"));
      const underpaid = company.employees.filter((employee) => employee.salary < employee.market * 0.9).length;
      if (underpaid) peopleReasons.push(reason("Salários abaixo do mercado", `${underpaid} pessoa${underpaid === 1 ? " está" : "s estão"} recebendo menos de 90% da referência de mercado.`, "negativo"));
      const activeProjects = company.projects.filter((project) => project.status === "ativo").length;
      if (activeProjects) peopleReasons.push(reason("Carga de projetos", `${activeProjects} projeto${activeProjects === 1 ? " está" : "s estão"} disputando a capacidade da equipe.`, activeProjects > company.employees.length ? "negativo" : "neutro"));
      if (company.culture === "Pessoas") peopleReasons.push(reason("Cultura de pessoas", "A cultura reduz estresse e protege moral e lealdade a cada semana.", "positivo"));
      if (employeeDelta !== 0) peopleReasons.push(reason("Mudança na equipe", `${Math.abs(employeeDelta)} pessoa${Math.abs(employeeDelta) === 1 ? "" : "s"} ${employeeDelta > 0 ? "entrou" : "saiu"} da empresa.`, employeeDelta > 0 ? "positivo" : "negativo"));

      const reputationReasons: IndicatorReason[] = [];
      if (completed.length) reputationReasons.push(reason("Projetos entregues", `${completed.length} entrega${completed.length === 1 ? " foi concluída" : "s foram concluídas"} e ganhou visibilidade.`, "positivo"));
      if (company.cash < 0) reputationReasons.push(reason("Caixa negativo", "A fragilidade financeira reduziu a confiança de clientes e parceiros.", "negativo"));
      if (changedCEO) reputationReasons.push(reason("Sinal da liderança", company.ceoLastDecision ?? "Uma decisão executiva repercutiu no mercado.", company.ceoReputation !== undefined && company.ceoReputation >= (beforeCompany.ceoReputation ?? 0) ? "positivo" : "neutro"));
      if ((company.effects ?? []).some((effect) => effect.reputationDelta)) reputationReasons.push(reason("Efeito narrativo", (company.effects ?? []).filter((effect) => effect.reputationDelta).map((effect) => effect.name).join(", "), reputationDelta >= 0 ? "positivo" : "negativo"));

      const boardReasons: IndicatorReason[] = [reason("Desempenho financeiro", after.profit >= 0 ? "O lucro fortaleceu a posição da liderança diante dos acionistas." : "O prejuízo aumentou a cobrança do conselho.", after.profit >= 0 ? "positivo" : "negativo")];
      if ((company.investors ?? []).length) boardReasons.push(reason("Investidores no conselho", `${company.investors?.length} investidor${company.investors?.length === 1 ? " acompanha" : "es acompanham"} metas, prazos e participação.`, "neutro"));
      if (company.cash < 0) boardReasons.push(reason("Risco de liquidez", "Caixa abaixo de zero reduz apoio e aumenta a possibilidade de intervenção.", "negativo"));

      const changes: IndicatorChange[] = [
        { key: "cash", label: "Caixa", before: beforeCompany.cash, after: company.cash, delta: company.cash - beforeCompany.cash, format: "money", reasons: cashReasons },
        { key: "revenue", label: "Faturamento semanal", before: before.revenue, after: after.revenue, delta: after.revenue - before.revenue, format: "money", reasons: revenueReasons.length ? revenueReasons : fallback("Clientes, capacidade, preço e demanda permaneceram praticamente equilibrados.") },
        { key: "profit", label: "Resultado semanal", before: before.profit, after: after.profit, delta: after.profit - before.profit, format: "money", reasons: [...revenueReasons.slice(0, 2), ...costReasons].slice(0, 5) },
        { key: "customers", label: "Clientes", before: beforeCompany.customers, after: company.customers, delta: customerDelta, format: "number", reasons: revenueReasons.filter((item) => ["Base de clientes", "Ambiente econômico", "Reputação comercial"].includes(item.title)).length ? revenueReasons.filter((item) => ["Base de clientes", "Ambiente econômico", "Reputação comercial"].includes(item.title)) : fallback("Marketing, reputação e demanda produziram uma semana estável.") },
        { key: "reputation", label: "Reputação", before: beforeCompany.reputation, after: company.reputation, delta: reputationDelta, format: "percent", reasons: reputationReasons.length ? reputationReasons : fallback("Nenhuma entrega, crise ou evento alterou significativamente a percepção pública.") },
        { key: "morale", label: "Moral da equipe", before: before.morale, after: after.morale, delta: after.morale - before.morale, format: "percent", reasons: peopleReasons.length ? peopleReasons : fallback("Remuneração, carga e ambiente permaneceram equilibrados.") },
        { key: "stress", label: "Estresse médio", before: beforeStress, after: afterStress, delta: afterStress - beforeStress, format: "percent", reasons: peopleReasons.length ? peopleReasons : fallback("A equipe trabalhou dentro da carga habitual.") },
        { key: "valuation", label: "Valor da empresa", before: before.valuation, after: after.valuation, delta: after.valuation - before.valuation, format: "money", reasons: [reason("Fórmula de valuation", "Combina caixa, lucro anual sustentável, faturamento, reputação e desconta integralmente a dívida.", "neutro"), ...revenueReasons.slice(0, 1), ...cashReasons.slice(0, 1)] },
        { key: "board", label: "Apoio do conselho", before: beforeCompany.boardSupport ?? 50, after: company.boardSupport ?? 50, delta: (company.boardSupport ?? 50) - (beforeCompany.boardSupport ?? 50), format: "percent", reasons: boardReasons },
      ];
      const critical = changes.some((item) => {
        if (item.key === "valuation") return Math.abs(item.delta) >= Math.max(250000, Math.abs(item.before) * 0.25);
        if (item.format === "money") return Math.abs(item.delta) >= Math.max(100000, Math.abs(item.before) * 0.4);
        return Math.abs(item.delta) >= 10;
      });
      const attention = changes.some((item) => {
        if (item.key === "valuation") return Math.abs(item.delta) >= Math.max(100000, Math.abs(item.before) * 0.12);
        if (item.format === "money") return Math.abs(item.delta) >= Math.max(30000, Math.abs(item.before) * 0.18);
        return Math.abs(item.delta) >= 4;
      });
      const biggest = [...changes].sort((a, b) => Math.abs(b.delta) - Math.abs(a.delta))[0];
      return {
        companyId: company.id,
        companyName: company.name,
        severity: critical ? "critico" : attention ? "atencao" : "normal",
        summary: `${biggest.label} foi o indicador com maior movimento: ${biggest.delta > 0 ? "+" : ""}${biggest.format === "money" ? money.format(biggest.delta) : `${biggest.delta.toFixed(1)}${biggest.format === "percent" ? " p.p." : ""}`}.`,
        indicators: changes,
      };
    });
  const criticalCount = companyReports.filter((report) => report.severity === "critico").length;
  return {
    week,
    economyBefore: previous.economy.cycle,
    economyAfter: economy.cycle,
    confidenceBefore: previous.economy.confidence,
    confidenceAfter: economy.confidence,
    headline: criticalCount
      ? `${criticalCount} empresa${criticalCount === 1 ? " exige" : "s exigem"} atenção imediata`
      : economy.cycle !== previous.economy.cycle
        ? `A economia entrou em ${economy.cycle} e alterou as projeções`
        : "Veja o que realmente moveu seus indicadores",
    companies: companyReports,
  };
}

function buildWeeklyAdvice(report: CompanyWeeklyReport, company: Company): WeeklyAdvice[] {
  const indicator = (key: IndicatorChange["key"]) => report.indicators.find((item) => item.key === key);
  const revenue = indicator("revenue");
  const profit = indicator("profit");
  const cash = indicator("cash");
  const customers = indicator("customers");
  const stress = indicator("stress");
  const morale = indicator("morale");
  const advice: WeeklyAdvice[] = [];
  if (revenue && revenue.delta < -Math.max(2500, Math.abs(revenue.before) * .04)) {
    advice.push({ tone: "urgente", title: `O faturamento caiu ${money.format(Math.abs(revenue.delta))}`, detail: company.marketing < 5000 ? "Seu marketing está baixo. Aumente aos poucos e observe clientes antes de fazer uma aposta grande." : "Marketing já existe; revise o preço e confira se a equipe consegue atender a demanda.", action: "estrategia", actionLabel: "Revisar preço e marketing" });
  }
  if (profit && profit.after < 0) {
    advice.push({ tone: "urgente", title: `A operação perdeu ${money.format(Math.abs(profit.after))}`, detail: company.debt > 0 ? "Dívida e custos estão consumindo o resultado. Evite outro projeto caro até recuperar margem." : "A receita não está pagando equipe, marketing e estrutura. Crescer agora pode ampliar o prejuízo.", action: "estrategia", actionLabel: "Abrir estratégia" });
  }
  if (customers && customers.delta < 0) {
    advice.push({ tone: "atencao", title: `${Math.abs(Math.round(customers.delta))} clientes saíram nesta semana`, detail: "Confira reputação, preço e produtos concorrentes antes de simplesmente aumentar anúncios.", action: "mercado", actionLabel: "Observar o mercado" });
  }
  if (stress && (stress.after >= 72 || stress.delta >= 4)) {
    advice.push({ tone: stress.after >= 84 ? "urgente" : "atencao", title: `A equipe está com ${Math.round(stress.after)}% de estresse`, detail: "Descanso pontual, menos projetos simultâneos ou uma conversa salarial custam menos que uma saída inesperada.", action: "pessoas", actionLabel: "Conversar com a equipe" });
  }
  if (cash && cash.after < 50000) {
    advice.push({ tone: cash.after < 0 ? "urgente" : "atencao", title: `O caixa caiu para ${money.format(cash.after)}`, detail: "Preserve liquidez. Pause novas apostas e procure capital apenas se houver um plano claro para pagar ou crescer.", action: "estrategia", actionLabel: "Proteger o caixa" });
  }
  if (!company.projects.some((project) => project.status === "ativo") && (company.productRevenue ?? 0) < 10000 && company.cash >= 70000) {
    advice.push({ tone: "positivo", title: "Sua equipe tem espaço para uma nova aposta", detail: "Não há projeto ativo e o caixa permite estudar um produto sem colocar a operação inteira em risco.", action: "projetos", actionLabel: "Avaliar novo projeto" });
  }
  if (!advice.length || (revenue && revenue.delta > 0 && profit && profit.after >= 0 && morale && morale.after >= 60)) {
    advice.push({ tone: "positivo", title: "A empresa está respondendo bem", detail: "Não mude tudo por ansiedade. Preserve o que funcionou e acompanhe a próxima semana antes de acelerar.", action: "nenhuma", actionLabel: "Continuar a semana" });
  }
  return advice.slice(0, 3);
}

function buildWeeklyDigest(report: WeeklyReport | null, companies: Company[]): WeeklyDigestCard[] {
  if (!report) return [];
  const candidates = report.companies.flatMap((companyReport) => {
    const company = companies.find((item) => item.id === companyReport.companyId);
    return company ? buildWeeklyAdvice(companyReport, company).map((advice) => ({ ...advice, companyId: company.id, companyName: company.name })) : [];
  });
  const chosen: WeeklyDigestCard[] = [];
  const add = (candidate: typeof candidates[number] | undefined, kind: WeeklyDigestCard["kind"]) => {
    if (candidate && !chosen.some((item) => item.title === candidate.title)) chosen.push({ ...candidate, kind });
  };
  add(candidates.find((item) => item.tone === "urgente"), "urgente");
  add(candidates.find((item) => item.tone === "positivo"), "oportunidade");
  add(candidates.find((item) => item.tone === "atencao") ?? candidates.find((item) => !chosen.some((chosenItem) => chosenItem.title === item.title)) ?? candidates[0], "assessor");
  return chosen.slice(0, 3);
}

function evolveNarrativeDirector(previous: NarrativeDirectorState | undefined, state: GameState, weeklyNews: NewsItem[], staffAlerts: StaffAlert[]): NarrativeDirectorState {
  const before = previous ?? { mode: "equilibrio" as const, tension: 30, crisisStreak: 0, quietStreak: 0, lastInterventionWeek: 0, lastReason: "A história está começando." };
  const negative = weeklyNews.filter((item) => item.impact === "negativo").length + staffAlerts.length;
  const positive = weeklyNews.filter((item) => item.impact === "positivo").length;
  const activeCrises = (state.auditCases ?? []).filter((item) => ["suspeita", "investigando", "comprovada"].includes(item.status)).length + (state.politicalArc ? 1 : 0);
  const operating = state.companies.filter((company) => !company.sold && !company.bankrupt && !company.closed);
  const fragileCash = operating.some((company) => company.cash < 45000);
  const crisisWeek = negative >= 2 || staffAlerts.length > 0 || activeCrises >= 2;
  const quietWeek = negative === 0 && positive === 0 && state.generationArc?.status !== "ativo";
  const crisisStreak = crisisWeek ? before.crisisStreak + 1 : Math.max(0, before.crisisStreak - 1);
  const quietStreak = quietWeek ? before.quietStreak + 1 : 0;
  const tension = clamp(before.tension * .62 + negative * 14 + activeCrises * 7 - positive * 5 + (fragileCash ? 9 : 0));
  const mode: NarrativeDirectorMode = state.generationArc?.status === "ativo"
    ? "foco"
    : crisisStreak >= 2 || tension >= 76 || fragileCash
      ? "recuperacao"
      : quietStreak >= 3 || tension < 18
        ? "escalada"
        : tension < 34
          ? "calma"
          : "equilibrio";
  const lastReason = mode === "foco"
    ? `O conflito “${state.generationArc?.title}” está conduzindo os acontecimentos.`
    : mode === "recuperacao"
      ? fragileCash ? "O caixa de uma empresa está vulnerável; novos choques serão menos frequentes." : "Crises consecutivas pedem espaço para reação e reorganização."
      : mode === "escalada"
        ? "As últimas semanas tiveram poucas decisões; uma nova oportunidade ou rivalidade se aproxima."
        : mode === "calma"
          ? "A história entrou numa pausa curta para você executar sua estratégia."
          : "Problemas e oportunidades estão em equilíbrio.";
  return { ...before, mode, tension: Math.round(tension), crisisStreak, quietStreak, lastReason };
}

function directorInterventionMessage(state: GameState, director: NarrativeDirectorState): StoryMessage {
  const company = state.companies.find((item) => item.id === state.activeCompanyId) ?? state.companies[0];
  if (director.mode === "recuperacao") return {
    id: `director-recovery-${state.week}`,
    from: "Helena Duarte",
    role: "Mentora · leitura do momento",
    initials: "HD",
    color: "#668477",
    subject: "Você não precisa apagar três incêndios ao mesmo tempo",
    body: `${director.lastReason} Vou segurar assuntos secundários por algumas semanas. Escolha o que a ${company.name} precisa proteger primeiro.`,
    choices: [
      { label: "Proteger as pessoas", result: "A agenda foi reduzida e as equipes ganharam espaço para respirar.", effect: (game) => ({ ...game, narrativeDirector: { ...director, lastInterventionWeek: game.week }, companies: game.companies.map((item) => ({ ...item, employees: item.employees.map((employee) => ({ ...employee, stress: clamp((employee.stress ?? 25) - 8), morale: clamp(employee.morale + 3) })) })) }) },
      { label: "Proteger o caixa", result: "Despesas discricionárias foram reduzidas para preservar liquidez.", effect: (game) => ({ ...game, narrativeDirector: { ...director, lastInterventionWeek: game.week }, companies: game.companies.map((item) => item.id === company.id ? { ...item, marketing: Math.max(0, item.marketing - 2500), cash: item.cash + 18000 } : item) }) },
      { label: "Manter o ritmo", tone: "risk", result: "Você recusou a pausa e manteve a pressão sobre a organização.", effect: (game) => ({ ...game, narrativeDirector: { ...director, mode: "equilibrio", tension: clamp(director.tension + 8), lastInterventionWeek: game.week }, reputation: clamp(game.reputation + 2) }) },
    ],
  };
  return {
    id: `director-opportunity-${state.week}`,
    from: "Helena Duarte",
    role: "Mentora · oportunidade da semana",
    initials: "HD",
    color: "#b57c47",
    subject: "O silêncio do mercado abriu uma janela",
    body: `${director.lastReason} A ${company.name} pode usar este momento para criar movimento antes que um concorrente o faça.`,
    choices: [
      { label: "Campanha focada · R$ 30 mil", result: "A empresa ocupou o espaço com uma campanha rápida.", effect: (game) => ({ ...game, narrativeDirector: { ...director, mode: "equilibrio", tension: 38, quietStreak: 0, lastInterventionWeek: game.week }, companies: game.companies.map((item) => item.id === company.id ? { ...item, cash: item.cash - 30000, marketing: item.marketing + 4500, customers: Math.round(item.customers * 1.05) } : item) }) },
      { label: "Ouvir funcionários sobre produtos", result: "A equipe ganhou confiança para trazer ideias nas próximas semanas.", effect: (game) => ({ ...game, narrativeDirector: { ...director, mode: "equilibrio", tension: 32, quietStreak: 0, lastInterventionWeek: game.week }, companies: game.companies.map((item) => item.id === company.id ? { ...item, employees: item.employees.map((employee) => ({ ...employee, loyalty: clamp(employee.loyalty + 4), relation: clamp(employee.relation + 3) })) } : item) }) },
      { label: "Não criar movimento artificial", result: "Você preservou caixa e deixou a estratégia amadurecer.", effect: (game) => ({ ...game, narrativeDirector: { ...director, mode: "calma", tension: 24, quietStreak: 0, lastInterventionWeek: game.week }, legacy: game.legacy + 1 }) },
    ],
  };
}

function tutorialNarrativeMessage(state: GameState, week: number): StoryMessage | null {
  const company = state.companies.find((item) => item.id === state.activeCompanyId) ?? state.companies[0];
  const employee = company.employees[0];
  const project = company.projects.find((item) => item.status === "ativo") ?? company.projects[0];
  const base = { id: `tutorial-${week}`, from: "Helena Duarte", role: `Mentora · semana ${week} de 12`, initials: "HD", color: "#efad55" };
  if (week === 2) return { ...base, subject: "Primeiro, aprenda a sobreviver", body: "Preço, marketing e caixa formam o pulmão da empresa. Faturar mais não significa lucrar mais: toda decisão precisa caber por várias semanas, não apenas hoje.", choices: [
    { label: "Manter uma reserva", result: "Você escolheu aprender antes de acelerar.", effect: (game) => ({ ...game, legacy: game.legacy + 1 }) },
    { label: "Investir R$ 15 mil em marketing", tone: "risk", result: "A empresa começou a testar aquisição de clientes.", effect: (game) => ({ ...game, companies: game.companies.map((item) => item.id === company.id ? { ...item, cash: item.cash - 15000, marketing: item.marketing + 2500 } : item) }) },
  ] };
  if (week === 4) return { ...base, subject: `${employee.name} quer saber se existe futuro aqui`, body: "Salário abaixo do mercado, estresse e falta de crescimento corroem lealdade aos poucos. Pessoas não saem por um único número; saem por uma sequência de sinais.", choices: [
    { label: `Dar aumento de 6% a ${employee.name}`, result: `${employee.name} percebeu que o esforço foi reconhecido.`, effect: (game) => ({ ...game, companies: game.companies.map((item) => item.id === company.id ? { ...item, employees: item.employees.map((person) => person.id === employee.id ? { ...person, salary: Math.round(person.salary * 1.06 / 100) * 100, morale: clamp(person.morale + 8), loyalty: clamp(person.loyalty + 7) } : person) } : item) }) },
    { label: "Prometer uma conversa em oito semanas", tone: "risk", result: "Você ganhou tempo, mas a promessa ficou registrada na memória da equipe.", effect: (game) => ({ ...game, companies: game.companies.map((item) => item.id === company.id ? { ...item, employees: item.employees.map((person) => person.id === employee.id ? { ...person, loyalty: clamp(person.loyalty - 3), memories: addCharacterMemory(person.memories, characterMemory(game.week, "salario", "Você adiou uma conversa importante sobre meu futuro.", "cauteloso", -5, 78)) } : person) } : item) }) },
  ] };
  if (week === 6) return { ...base, subject: `O projeto ${project.name} precisa de uma prioridade`, body: "Projetos em desenvolvimento consomem equipe e caixa. Produtos passam a faturar quando chegam ao mercado; melhorias e campanhas geram seus efeitos ao serem concluídas.", choices: [
    { label: "Priorizar qualidade", result: "A equipe aceitou avançar mais devagar para entregar algo melhor.", effect: (game) => ({ ...game, companies: game.companies.map((item) => item.id === company.id ? { ...item, projects: item.projects.map((candidate) => candidate.id === project.id ? { ...candidate, quality: clamp(candidate.quality + 8), risk: clamp(candidate.risk - 3) } : candidate) } : item) }) },
    { label: "Priorizar velocidade", tone: "risk", result: "O cronograma avançou, junto com o risco de falhas.", effect: (game) => ({ ...game, companies: game.companies.map((item) => item.id === company.id ? { ...item, projects: item.projects.map((candidate) => candidate.id === project.id ? { ...candidate, progress: clamp(candidate.progress + 12), risk: clamp(candidate.risk + 8) } : candidate) } : item) }) },
  ] };
  if (week === 8) return { ...base, subject: "Enquanto você administra, concorrentes observam", body: "Rivais desenvolvem produtos, conquistam clientes, entram em crise e podem ser comprados. Preço, reputação e marketing determinam como sua empresa responde.", choices: [
    { label: "Fortalecer clientes atuais", result: "A empresa reforçou relacionamento em vez de entrar numa guerra de descontos.", effect: (game) => ({ ...game, companies: game.companies.map((item) => item.id === company.id ? { ...item, reputation: clamp(item.reputation + 5), customers: Math.round(item.customers * 1.03) } : item) }) },
    { label: "Desafiar o principal rival", tone: "risk", result: "O mercado percebeu que existe uma rivalidade em formação.", effect: (game) => ({ ...game, rivalScore: game.rivalScore + 5, reputation: clamp(game.reputation + 3) }) },
  ] };
  if (week === 10) return { ...base, subject: "Você não precisa decidir tudo sozinho para sempre", body: "Quando a holding crescer, CEOs poderão contratar, criar produtos e negociar contratos conforme a autonomia recebida. Delegar economiza atenção, mas também cria risco político.", choices: [
    { label: "Quero construir líderes", result: "Sua identidade começou a valorizar pessoas e visão de longo prazo.", effect: (game) => evolveIdentity(game, { pessoas: 6, visao: 7 }, "Decidiu construir líderes antes de precisar deles") },
    { label: "Prefiro manter controle", result: "Sua identidade passou a valorizar prudência e supervisão direta.", effect: (game) => evolveIdentity(game, { prudencia: 8, negociacao: -2 }, "Preferiu preservar controle sobre as decisões") },
  ] };
  if (week === 12) return { ...base, subject: "A partir daqui, a história reage a você", body: "Mensagens trazem decisões; o Conselho da Semana resume apenas o essencial; e o ritmo se adapta. Crises consecutivas criam recuperação, semanas vazias abrem oportunidades e conflitos centrais ganham prioridade.", choices: [
    { label: "Estou pronto para comandar", tone: "good", result: "O tutorial terminou. Helena continuará aconselhando, mas as decisões agora são suas.", effect: (game) => ({ ...game, tutorialCompleted: true, legacy: game.legacy + 3 }) },
    { label: "Quero um ritmo mais tranquilo", result: "O tutorial terminou e a dificuldade foi ajustada para Relaxado.", effect: (game) => ({ ...game, tutorialCompleted: true, difficulty: "relaxado" }) },
  ] };
  return null;
}

function createGenerationMissions(state: GameState): GenerationMission[] {
  const generation = state.generation ?? 2;
  const operating = state.companies.filter((company) => !company.sold && !company.bankrupt && !company.closed);
  const rewardFactor = difficultyProfiles[state.difficulty ?? "executivo"].reward;
  const baseReward = Math.round((90000 + generation * 25000) * rewardFactor / 1000) * 1000;
  return [
    { id: `g${generation}-resultado`, generation, kind: "resultado", title: "Fazer a holding respirar", description: `Manter pelo menos ${Math.max(1, Math.ceil(operating.length * .67))} empresa${operating.length > 1 ? "s" : ""} no lucro ao mesmo tempo.`, target: Math.max(1, Math.ceil(operating.length * .67)), progress: 0, rewardCash: baseReward, rewardLegacy: 4, rewardTitle: "Medalha de Resultado", completed: false },
    { id: `g${generation}-reputacao`, generation, kind: "reputacao", title: "Conquistar o próprio nome", description: "Elevar a reputação da presidência e provar que o sobrenome não é a única credencial.", target: Math.min(95, Math.max(65, state.reputation + 8)), progress: state.reputation, rewardCash: Math.round(baseReward * .65), rewardLegacy: 6, rewardTitle: "Título de Liderança", completed: false },
    { id: `g${generation}-familia`, generation, kind: "familia", title: "Entregar uma família governável", description: "Construir união suficiente para que a próxima sucessão não comece como uma guerra.", target: Math.min(92, Math.max(70, (state.familyUnity ?? 60) + 8)), progress: state.familyUnity ?? 60, rewardCash: Math.round(baseReward * .45), rewardLegacy: 8, rewardTitle: "Selo de Guardião do Legado", completed: false },
  ];
}

function advanceGenerationMissions(missions: GenerationMission[], state: GameState): { missions: GenerationMission[]; completed: GenerationMission[] } {
  const profitable = state.companies.filter((company) => !company.sold && !company.bankrupt && !company.closed && companyMetrics(company, state.economy).profit > 0).length;
  const completed: GenerationMission[] = [];
  const next = missions.map((mission) => {
    const progress = mission.kind === "resultado" ? profitable : mission.kind === "reputacao" ? state.reputation : state.familyUnity ?? 0;
    const done = mission.completed || progress >= mission.target;
    const updated = { ...mission, progress: Math.min(mission.target, progress), completed: done, completedWeek: !mission.completed && done ? state.week : mission.completedWeek };
    if (!mission.completed && done) completed.push(updated);
    return updated;
  });
  return { missions: next, completed };
}

const achievementDefinitions: { id: string; title: string; description: string; secret?: boolean; test: (state: GameState) => boolean }[] = [
  { id: "primeiro-milhao", title: "O primeiro milhão", description: "Construir um patrimônio empresarial superior a R$ 1 milhão.", test: (state) => state.personalCash + state.companies.reduce((sum, company) => sum + (!company.sold && !company.bankrupt && !company.closed ? companyMetrics(company, state.economy).valuation : 0), 0) >= 1000000 },
  { id: "holding-real", title: "Agora é uma holding", description: "Controlar pelo menos três empresas operacionais.", test: (state) => state.companies.filter((company) => !company.sold && !company.bankrupt && !company.closed).length >= 3 },
  { id: "produto-icone", title: "Produto de uma geração", description: "Levar um produto com qualidade 90 ou superior ao mercado.", test: (state) => state.companies.some((company) => company.projects.some((project) => project.kind === "produto" && project.lifecycle === "mercado" && project.quality >= 90)) },
  { id: "familia-centenaria", title: "Família centenária", description: "Chegar à quarta geração com união familiar acima de 80%.", secret: true, test: (state) => (state.generation ?? 1) >= 4 && (state.familyUnity ?? 0) >= 80 },
  { id: "imperio-sem-herdeiros", title: "Império sem herdeiros", description: "Manter o grupo vivo depois que todos os herdeiros romperam ou se afastaram.", secret: true, test: (state) => (state.generation ?? 1) >= 3 && (state.heirs ?? []).length > 0 && (state.heirs ?? []).every((heir) => heir.status === "rompido" || heir.status === "afastado") },
  { id: "ceo-deposto", title: "CEO deposto", description: "Perder a presidência numa disputa política e continuar a Dinastia.", secret: true, test: (state) => (state.dynastyHistory ?? []).some((entry) => /derrubou|perdeu a confiança/i.test(entry)) },
  { id: "fundador-esquecido", title: "Fundador esquecido", description: "O nome do fundador perdeu família, controle e influência sobre o grupo.", secret: true, test: (state) => Boolean(state.founderDeceased) && (state.familyUnity ?? 100) < 25 && (state.outsideFamilyEquity ?? 0) > 60 },
  { id: "sobrevivente", title: "À prova de crise", description: "Sobreviver a três recessões sem encerrar a história.", test: (state) => (state.survivedRecessions ?? 0) >= 3 },
  { id: "arquiteto", title: "Arquiteto de gerações", description: "Vencer três conflitos centrais da Dinastia.", test: (state) => (state.generationArcHistory ?? []).filter((arc) => arc.tone === "vitoria").length >= 3 },
  { id: "implacavel", title: "Sem rede de proteção", description: "Chegar à quarta geração na dificuldade Implacável.", secret: true, test: (state) => state.difficulty === "implacavel" && (state.generation ?? 1) >= 4 },
];

function newlyUnlockedAchievements(state: GameState): AchievementUnlock[] {
  const unlocked = new Set((state.achievements ?? []).map((achievement) => achievement.id));
  return achievementDefinitions.filter((definition) => !unlocked.has(definition.id) && definition.test(state)).map((definition) => ({ id: definition.id, week: state.week, generation: state.generation ?? 1, title: definition.title }));
}

function makeOpeningMessage(): StoryMessage {
  return {
    id: "opening",
    from: "Helena Duarte",
    role: "Mentora",
    initials: "HD",
    color: "#efad55",
    subject: "Você realmente vai fazer isso?",
    body: "O contrato do escritório vence em oito semanas. Seu produto ainda não está pronto e a equipe apostou a carreira em você. Antes de crescer, defina que tipo de líder pretende ser.",
    choices: [
      {
        label: "Pessoas em primeiro lugar",
        result: "A equipe ouviu sua promessa. Agora vai cobrar coerência.",
        effect: (s) => ({
          ...s,
          companies: s.companies.map((c) => ({
            ...c,
            culture: "Pessoas",
            employees: c.employees.map((e) => ({
              ...e,
              morale: clamp(e.morale + 8),
              loyalty: clamp(e.loyalty + 7),
            })),
          })),
          legacy: s.legacy + 3,
        }),
      },
      {
        label: "Crescer a qualquer custo",
        tone: "risk",
        result: "A ambição empolgou alguns e assustou outros.",
        effect: (s) => ({
          ...s,
          companies: s.companies.map((c) => ({
            ...c,
            culture: "Crescimento",
            reputation: c.reputation + 4,
            employees: c.employees.map((e) => ({
              ...e,
              morale: e.trait === "Competitivo" ? e.morale + 7 : e.morale - 4,
            })),
          })),
          rivalScore: s.rivalScore + 3,
        }),
      },
      {
        label: "Produto acima de tudo",
        result: "Lívia sorriu. A operação terá de correr para acompanhar.",
        effect: (s) => ({
          ...s,
          companies: s.companies.map((c) => ({
            ...c,
            culture: "Excelência",
            projects: c.projects.map((p) => ({
              ...p,
              quality: p.quality + 9,
              risk: p.risk + 4,
            })),
          })),
          reputation: s.reputation + 2,
        }),
      },
    ],
  };
}

export default function Home() {
  const [game, setGame] = useState<GameState>(initialState);
  const [view, setView] = useState<View>("escritorio");
  const [selectedMessage, setSelectedMessage] = useState<StoryMessage | null>(
    null,
  );
  const [dialog, setDialog] = useState<
    | "inbox"
    | "hire"
    | "salary"
    | "project"
    | "product"
    | "sell"
    | "new-company"
    | "bankruptcy"
    | "recovery"
    | "acquire"
    | "rival"
    | "capital"
    | "board"
    | "holding-company"
    | "legacy"
    | "news-detail"
    | "dynasty"
    | "weekly-report"
    | "finance"
    | "marketing"
    | "directors"
    | "facilities"
    | "partner"
    | "factions"
    | "annual-plan"
    | "founder-finale"
    | "dynasty-transition"
    | "dynasty-ending"
    | "difficulty"
    | "page-guide"
    | "help"
    | null
  >(null);
  const [toast, setToast] = useState("");
  const [pageGuideView, setPageGuideView] = useState<View | null>(null);
  const [companyName, setCompanyName] = useState("");
  const [speed, setSpeed] = useState<0 | 1 | 2>(0);
  const [targetRival, setTargetRival] = useState<Competitor | null>(null);
  const [selectedRivalId, setSelectedRivalId] = useState<number | null>(null);
  const [salaryEmployee, setSalaryEmployee] = useState<Employee | null>(null);
  const [salaryOffer, setSalaryOffer] = useState(0);
  const [negotiationNote, setNegotiationNote] = useState("");
  const [selectedProduct, setSelectedProduct] = useState<Project | null>(null);
  const [rightsOffer, setRightsOffer] = useState<{
    buyer: string;
    value: number;
  } | null>(null);
  const [holdingCompanyId, setHoldingCompanyId] = useState<number | null>(null);
  const [transferTargetId, setTransferTargetId] = useState<number | null>(null);
  const [transferAmount, setTransferAmount] = useState(50000);
  const [campaignBudget, setCampaignBudget] = useState(30000);
  const [campaignDuration, setCampaignDuration] = useState(4);
  const [campaignAudience, setCampaignAudience] = useState<MarketingAudience>("nicho");
  const [campaignObjective, setCampaignObjective] = useState<MarketingObjective>("aquisicao");
  const [campaignProductId, setCampaignProductId] = useState<number | undefined>(undefined);
  const [directorArea, setDirectorArea] = useState<DirectorArea>("pessoas");
  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null);
  const [selectedReportWeek, setSelectedReportWeek] = useState<number | null>(null);
  const [reportCompanyId, setReportCompanyId] = useState<number | null>(null);
  const [selectedPartnerId, setSelectedPartnerId] = useState<string | null>(null);
  const [selectedFactionId, setSelectedFactionId] = useState<string | null>(null);
  const [annualPriorityChoice, setAnnualPriorityChoice] = useState<AnnualPriority>("crescimento");
  const [holdingTab, setHoldingTab] = useState<"ceo" | "integridade" | "capital" | "societario">("ceo");
  const [dynastyTab, setDynastyTab] = useState<"visao" | "conflito" | "familia" | "poder" | "sucessao" | "cronica">("visao");

  useEffect(() => {
    const saved = localStorage.getItem("ceo-historia-v2");
    if (saved)
      try {
        const parsed = JSON.parse(saved);
        setGame({
          ...initialState,
          ...parsed,
          unread: [],
          competitors: parsed.competitors?.length
            ? parsed.competitors.map((r: Competitor, index: number) => ({
                ...r,
                crisisWeeks: r.crisisWeeks ?? 0,
                age: r.age ?? 0,
                cash: r.cash ?? 180000 + r.score * 7000,
                personality:
                  r.personality ??
                  rivalPersonalities[index % rivalPersonalities.length],
                relation: r.relation ?? 0,
                relationship: r.relationship ?? "neutro",
                products: r.products?.length
                  ? r.products
                  : [
                      {
                        id: r.id + 100,
                        name: rivalProductName(r.sector, (index + 1) / 7),
                        quality: 45 + index * 6,
                        stage: "maduro",
                      },
                    ],
                history: r.history ?? [
                  `${r.name} já operava no setor quando sua história começou.`,
                ],
                lastDecision: r.lastDecision ?? "Manter posição no mercado",
              }))
            : generateCompetitors(
                parsed.companies?.[0]?.sector ?? "Tecnologia",
              ),
          news: parsed.news ?? [],
          balanceVersion: 3,
          difficulty: parsed.difficulty ?? "executivo",
          difficultyApplied: parsed.difficultyApplied ?? "executivo",
          economy:
            (parsed.balanceVersion ?? 1) >= 2
              ? (parsed.economy ?? initialState.economy)
              : initialState.economy,
          providers: parsed.providers?.length
            ? parsed.providers
            : capitalProviders,
          auditCases: parsed.auditCases ?? [],
          founderStartAge: parsed.founderStartAge ?? 32,
          lifeGoal: parsed.lifeGoal ?? "dinastia",
          lifeGoalCompleted: parsed.lifeGoalCompleted ?? false,
          heirs: (parsed.heirs?.length
            ? parsed.heirs
            : createHeirs(parsed.founder ?? "Alex Silva")).map((heir: Heir) => ({
              ...heir,
              generation: heir.generation ?? 2,
              parent: heir.parent ?? parsed.founder ?? "Alex",
              equity:
                heir.equity ??
                (parsed.founderRetired
                  ? heir.id === parsed.chosenSuccessorId
                    ? 35
                    : 15
                  : 0),
              support:
                heir.support ??
                (heir.id === parsed.chosenSuccessorId ? 78 : 60),
              resentment:
                heir.resentment ??
                (parsed.founderRetired && heir.id !== parsed.chosenSuccessorId
                  ? 28
                  : 8),
              status: heir.status ?? "familia",
              memories: heir.memories ?? [],
            })),
          chosenSuccessorId: parsed.chosenSuccessorId,
          founderRetired: parsed.founderRetired ?? false,
          retiredWeek: parsed.retiredWeek,
          successionHistory: parsed.successionHistory ?? [],
          lastFamilyEventWeek: parsed.lastFamilyEventWeek ?? 0,
          playerExecutive:
            parsed.playerExecutive ??
            (parsed.founderRetired
              ? parsed.heirs?.find((heir: Heir) => heir.id === parsed.chosenSuccessorId)?.name ?? parsed.founder
              : parsed.founder),
          dynastyMode: parsed.dynastyMode ?? parsed.founderRetired ?? false,
          generation: parsed.generation ?? (parsed.founderRetired ? 2 : 1),
          dynastyStartedWeek: parsed.dynastyStartedWeek ?? parsed.retiredWeek,
          dynastyLegitimacy: parsed.dynastyLegitimacy ?? (parsed.founderRetired ? 45 : 100),
          dynastyGoal: parsed.dynastyGoal ?? "preservar",
          familyUnity: parsed.familyUnity ?? 72,
          founderHealth: parsed.founderHealth ?? (parsed.founderRetired ? 88 : 100),
          founderDeceased: parsed.founderDeceased ?? false,
          willPolicy: parsed.willPolicy ?? "controle",
          founderHoldingEquity: parsed.founderHoldingEquity ?? (parsed.founderRetired ? 50 : 100),
          familyFoundationEquity: parsed.familyFoundationEquity ?? 0,
          outsideFamilyEquity: parsed.outsideFamilyEquity ?? 0,
          dynastyHistory: parsed.dynastyHistory ?? [],
          formerPresidents: (parsed.formerPresidents ?? (parsed.dynastyMode ? [
            {
              name: parsed.founder,
              generation: 1,
              startWeek: 1,
              endWeek: parsed.retiredWeek ?? 40,
              style: "crescimento",
              influence: parsed.founderDeceased ? 0 : 72,
              relationship: parsed.familyUnity ?? 70,
              ambition: 68,
              reputation: parsed.reputation ?? 60,
              status: "aliado",
              legacy: `Fundou a ${parsed.holdingName ?? "holding"}.`,
              lastMove: "Permanece como referência da família.",
            },
            ...(parsed.heirs ?? [])
              .filter((heir: Heir) => heir.role === "conselho" && heir.name !== parsed.founder && (heir.generation ?? 2) < (parsed.generation ?? 2))
              .map((heir: Heir) => ({
                name: heir.name,
                generation: heir.generation ?? 2,
                startWeek: parsed.retiredWeek ?? 40,
                endWeek: parsed.dynastyStartedWeek ?? parsed.week,
                style: heir.style,
                influence: clamp(35 + heir.competence * .35 + (heir.equity ?? 0) * .25),
                relationship: clamp(heir.bond + (heir.support ?? 50) * .2 - (heir.resentment ?? 10) * .35),
                ambition: heir.ambition,
                reputation: heir.competence,
                status: (heir.resentment ?? 10) > 55 ? "oposicao" : "neutro",
                legacy: `Liderou uma geração anterior da ${parsed.holdingName ?? "holding"}.`,
                lastMove: "Ocupa uma cadeira no conselho da família.",
              })),
          ] : [])).map((president: FormerPresident) => ({
            ...president,
            age: president.age ?? Math.round((president.name === parsed.founder ? parsed.founderStartAge ?? 28 : 32) + (parsed.week - president.startWeek) / 52),
            health: president.health ?? (president.name === parsed.founder ? parsed.founderHealth ?? 80 : 86),
            alive: president.alive ?? !(president.name === parsed.founder && parsed.founderDeceased),
            memoir: president.memoir ?? `Memórias do mandato de ${president.name}`,
            secret: president.secret ?? "Uma decisão do mandato nunca foi explicada por completo ao conselho.",
          })),
          lastDynastyTransition: parsed.lastDynastyTransition,
          politicalArc: parsed.politicalArc,
          generationArc: parsed.generationArc,
          generationArcHistory: parsed.generationArcHistory ?? [],
          generationMissions: parsed.generationMissions ?? [],
          achievements: parsed.achievements ?? [],
          narrativeDirector: parsed.narrativeDirector ?? { mode: "equilibrio", tension: 35, crisisStreak: 0, quietStreak: 0, lastInterventionWeek: 0, lastReason: "O ritmo será recalculado na próxima semana." },
          tutorialSeenWeeks: parsed.tutorialSeenWeeks ?? (parsed.week > 12 ? [2, 4, 6, 8, 10, 12] : []),
          tutorialCompleted: parsed.tutorialCompleted ?? parsed.week > 12,
          seenPageGuides: parsed.seenPageGuides ?? [],
          generationProfile: parsed.generationProfile ? { ...parsed.generationProfile, age: parsed.generationProfile.age ?? 42, health: parsed.generationProfile.health ?? 88 } : (parsed.dynastyMode ? generationProfileFor(parsed.playerExecutive ?? parsed.founder, parsed.generation ?? 2, parsed.heirs?.find((heir: Heir) => heir.name === (parsed.playerExecutive ?? parsed.founder))?.style ?? "crescimento", parsed.dynastyStartedWeek ?? parsed.week, 42) : undefined),
          mandateReviews: parsed.mandateReviews ?? [],
          lastMandateReviewWeek: parsed.lastMandateReviewWeek ?? parsed.dynastyStartedWeek ?? 0,
          dynastyEndingReady: parsed.dynastyEndingReady ?? false,
          dynastyConcluded: parsed.dynastyConcluded ?? false,
          dynastyEnding: parsed.dynastyEnding ? {
            ...parsed.dynastyEnding,
            founderLegacyEndsGeneration: parsed.dynastyEnding.founderLegacyEndsGeneration ?? parsed.dynastyEnding.generation,
            futureYears: parsed.dynastyEnding.futureYears ?? 0,
            futureValue: parsed.dynastyEnding.futureValue ?? parsed.dynastyEnding.value,
            futureCompanies: parsed.dynastyEnding.futureCompanies ?? parsed.dynastyEnding.companies,
            futurePeople: parsed.dynastyEnding.futurePeople ?? parsed.dynastyEnding.people,
            futureNarrative: parsed.dynastyEnding.futureNarrative ?? `O registro antigo desta dinastia termina na geração ${parsed.dynastyEnding.generation}.`,
          } : undefined,
          staffAlerts: parsed.staffAlerts ?? [],
          lastDynastyEventWeek: parsed.lastDynastyEventWeek ?? 0,
          completedDynastyGoals: parsed.completedDynastyGoals ?? [],
          recentNewsTopics: parsed.recentNewsTopics ?? [],
          weeklyReports: parsed.weeklyReports ?? [],
          decisionTraces: parsed.decisionTraces ?? [],
          financialLedger: parsed.financialLedger ?? [],
          leadershipIdentity: parsed.leadershipIdentity ?? initialLeadershipIdentity,
          identityHistory: parsed.identityHistory ?? [],
          factions: parsed.factions ?? [],
          factionHistory: parsed.factionHistory ?? [],
          annualPlan: parsed.annualPlan,
          annualReviews: parsed.annualReviews ?? [],
          founderPersonal: parsed.founderPersonal ?? { health: 82, family: 72, satisfaction: 60, ego: 38, regrets: 8 },
          careerMoments: parsed.careerMoments ?? [],
          nemesisId: parsed.nemesisId,
          lastPersonalEventWeek: parsed.lastPersonalEventWeek ?? 0,
          founderJourneyReady: parsed.founderJourneyReady ?? parsed.week >= 130,
          founderJourneyComplete: parsed.founderJourneyComplete ?? false,
          founderEnding: parsed.founderEnding,
          founderEndingWeek: parsed.founderEndingWeek,
          founderLegacyOutcome: parsed.founderLegacyOutcome,
          companies: (parsed.companies ?? []).map((c: Company) => ({
            ...c,
            founderEquity: c.founderEquity ?? 100,
            ceo: c.ceo ?? parsed.founder ?? "Alex",
            boardSupport: c.boardSupport ?? 82,
            investors: c.investors ?? [],
            productRevenue: c.productRevenue ?? 0,
            efficiency: c.efficiency ?? 1,
            campaignWeeks: c.campaignWeeks ?? 0,
            marketingMultiplier: c.marketingMultiplier ?? 1,
            marketingPulse: c.marketingPulse,
            marketingCampaigns: c.marketingCampaigns ?? [],
            directors: c.directors ?? [],
            facilities: c.facilities ?? {},
            facilityMaintenanceMode: c.facilityMaintenanceMode ?? "adequado",
            employerBrand: c.employerBrand ?? clamp(c.reputation * .62),
            rejectedCandidates: c.rejectedCandidates ?? [],
            parentCompanyId: c.parentCompanyId,
            acquisitionPrice: c.acquisitionPrice,
            origin: c.origin ?? "fundada",
            autonomy: c.autonomy ?? "centralizada",
            dividendRate: c.dividendRate ?? 0,
            sharedServices: c.sharedServices ?? false,
            closed: c.closed ?? false,
            effects: c.effects ?? [],
            ceoStyle:
              c.ceoStyle ??
              executives.find((executive) => executive.name === c.ceo)?.style ??
              "crescimento",
            ceoGoal: c.ceoGoal ?? "receita",
            ceoBudget: c.ceoBudget ?? 15000,
            ceoTrust: c.ceoTrust ?? 68,
            ceoInfluence: c.ceoInfluence ?? 20,
            ceoTenure: c.ceoTenure ?? 0,
            ceoLastDecision: c.ceoLastDecision ?? "Consolidar a gestão",
            ceoHiddenWeeks: c.ceoHiddenWeeks ?? 0,
            ceoHistory: c.ceoHistory ?? [],
            ceoMemories: c.ceoMemories ?? [],
            ceoLoyalty:
              c.ceoLoyalty ??
              executives.find((executive) => executive.name === c.ceo)
                ?.loyalty ??
              (c.ceo === parsed.founder ? 100 : 65),
            ceoAmbition:
              c.ceoAmbition ??
              executives.find((executive) => executive.name === c.ceo)
                ?.ambition ??
              45,
            ceoReputation:
              c.ceoReputation ??
              executives.find((executive) => executive.name === c.ceo)
                ?.reputation ??
              60,
            ceoEquity: c.ceoEquity ?? 0,
            ceoAllianceCompanyId: c.ceoAllianceCompanyId,
            ceoRivalCompanyId: c.ceoRivalCompanyId,
            ceoDemandCooldown: c.ceoDemandCooldown ?? 0,
            ceoProductCooldown: c.ceoProductCooldown ?? 0,
            ceoHireCooldown: c.ceoHireCooldown ?? 0,
            workforceTarget: c.workforceTarget ?? Math.max(3, c.employees.length),
            partners: (c.partners ?? createBusinessPartners(c.sector, c.id)).map((partner) => ({
              ...partner,
              signedWeek: partner.signedWeek ?? Math.max(1, parsed.week - Math.max(0, partner.weeksLeft)),
              lastNegotiationWeek: partner.lastNegotiationWeek ?? 0,
              relationshipCooldownUntil: partner.relationshipCooldownUntil ?? 0,
              failedRenegotiations: partner.failedRenegotiations ?? 0,
            })),
            projects: c.projects.map((p) => ({
              ...p,
              kind: p.kind ?? (c.sector === "Agência" ? "contrato" : "produto"),
              recurring: p.recurring ?? (c.sector === "Agência" ? 0 : 9000),
              lifecycle:
                p.lifecycle ??
                (p.status === "concluido" && (p.kind ?? "produto") === "produto"
                  ? "mercado"
                  : p.status === "ativo"
                    ? "desenvolvimento"
                    : "fora_de_linha"),
              marketStage: p.marketStage ?? "lancamento",
              marketWeeks: p.marketWeeks ?? 0,
              productPrice: p.productPrice ?? c.price,
              productMarketing: p.productMarketing ?? 0,
              version: p.version ?? 1,
              patented: p.patented ?? false,
              rightsOwned: p.rightsOwned ?? 100,
              royaltyRevenue: p.royaltyRevenue ?? 0,
              lawsuitWeeks: p.lawsuitWeeks ?? 0,
              ...((p.kind ?? (c.sector === "Agência" ? "contrato" : "produto")) === "produto" ? productBlueprint(c.sector, p.complexity ?? 3) : {}),
              complexity: p.complexity ?? ((p.kind ?? (c.sector === "Agência" ? "contrato" : "produto")) === "produto" ? 3 : undefined),
              requiredTeam: p.requiredTeam ?? ((p.kind ?? "produto") === "produto" ? productBlueprint(c.sector, p.complexity ?? 3).requiredTeam : undefined),
              requiredRoles: p.requiredRoles ?? ((p.kind ?? "produto") === "produto" ? productBlueprint(c.sector, p.complexity ?? 3).requiredRoles : undefined),
              developmentCost: p.developmentCost ?? ((p.kind ?? "produto") === "produto" ? productBlueprint(c.sector, p.complexity ?? 3).developmentCost : undefined),
              maintenanceCost: p.maintenanceCost ?? ((p.kind ?? "produto") === "produto" ? productBlueprint(c.sector, p.complexity ?? 3).maintenanceCost : undefined),
              preparation: p.preparation ?? {},
              delayWeeks: p.delayWeeks ?? 0,
              bugLevel: p.bugLevel ?? 0,
              customerSatisfaction: p.customerSatisfaction ?? 70,
              updateNeed: p.updateNeed ?? 0,
              supportLevel: p.supportLevel ?? 0,
              feedback: p.feedback ?? [],
              emergencyWeeks: p.emergencyWeeks ?? 0,
            })),
            employees: c.employees.map((e) => ({
              ...e,
              salary:
                (parsed.balanceVersion ?? 1) >= 2
                  ? e.salary
                  : Math.round((e.salary * 0.78) / 100) * 100,
              market:
                (parsed.balanceVersion ?? 1) >= 2
                  ? e.market
                  : Math.round((e.market * 0.84) / 100) * 100,
              stress: Math.min(e.stress ?? 25, 48),
              weeks: e.weeks ?? 0,
              warnings: e.warnings ?? 0,
              leaveWeeks: e.leaveWeeks ?? 0,
              memories: e.memories ?? [],
              department: e.department ?? inferDepartment(e.role),
              talentTier: e.talentTier ?? talentTierFor(e.skill),
            })),
          })),
        });
      } catch {
        localStorage.removeItem("ceo-historia-v2");
      }
  }, []);
  useEffect(() => {
    if (game.started && game.founderJourneyComplete && !game.founderLegacyOutcome) {
      const outcome = createFounderLegacyOutcome(game);
      setGame((state) => state.founderLegacyOutcome ? state : ({ ...state, founderLegacyOutcome: outcome }));
    }
  }, [game.started, game.founderJourneyComplete, game.founderLegacyOutcome]);
  useEffect(() => {
    const safe = { ...game, unread: [] };
    localStorage.setItem("ceo-historia-v2", JSON.stringify(safe));
  }, [game]);
  useEffect(() => {
    if (game.started && game.companies.length && !(game.factions ?? []).length)
      setGame((state) => ({ ...state, factions: syncHoldingFactions(state) }));
  }, [game.started, game.companies.length, game.factions?.length]);

  const active =
    game.companies.find((c) => c.id === game.activeCompanyId) ??
    game.companies[0];
  const holdingCompany =
    game.companies.find((c) => c.id === holdingCompanyId) ?? null;
  const selectedRival =
    game.competitors.find((r) => r.id === selectedRivalId) ?? null;
  const selectedNewsRepercussion = selectedNews
    ? newsRepercussion(selectedNews)
    : null;
  const managedProduct =
    active?.projects.find((p) => p.id === selectedProduct?.id) ??
    selectedProduct;
  const managedProductRisk = active && managedProduct?.kind === "produto" ? productRiskProfile(managedProduct, active) : null;
  const currentLeader = game.playerExecutive ?? game.founder;
  const selectedWeeklyReport = (game.weeklyReports ?? []).find((report) => report.week === selectedReportWeek) ?? game.weeklyReports?.[0] ?? null;
  const selectedCompanyReport = selectedWeeklyReport?.companies.find((report) => report.companyId === reportCompanyId)
    ?? selectedWeeklyReport?.companies.find((report) => report.companyId === game.activeCompanyId)
    ?? selectedWeeklyReport?.companies[0]
    ?? null;
  const advisedCompany = selectedCompanyReport
    ? game.companies.find((company) => company.id === selectedCompanyReport.companyId) ?? null
    : null;
  const weeklyDigest = buildWeeklyDigest(selectedWeeklyReport, game.companies);
  const selectedWeekDecisionTraces = (game.decisionTraces ?? [])
    .filter((trace) => selectedWeeklyReport && trace.week < selectedWeeklyReport.week && trace.expiresWeek >= selectedWeeklyReport.week && (trace.observations.some((observation) => observation.week === selectedWeeklyReport.week) || trace.companyId === selectedCompanyReport?.companyId))
    .sort((a, b) => (b.observations.some((item) => item.week === selectedWeeklyReport?.week) ? 1 : 0) - (a.observations.some((item) => item.week === selectedWeeklyReport?.week) ? 1 : 0) || b.week - a.week)
    .slice(0, 3);
  const selectedNewsCause = selectedNews ? (game.decisionTraces ?? []).find((trace) => trace.derivedNewsIds.includes(selectedNews.id)) ?? null : null;
  const latestActiveReport = game.weeklyReports?.[0]?.companies.find((report) => report.companyId === game.activeCompanyId) ?? null;
  const selectedPartner = active?.partners?.find((partner) => partner.id === selectedPartnerId) ?? null;
  const selectedPartnerCooldown = selectedPartner ? Math.max(0, (selectedPartner.lastNegotiationWeek ?? -99) + 4 - game.week) : 0;
  const selectedRelationshipCooldown = selectedPartner ? Math.max(0, (selectedPartner.relationshipCooldownUntil ?? 0) - game.week) : 0;
  const selectedPartnerEarly = Boolean(selectedPartner?.status === "ativo" && selectedPartner.weeksLeft > 2);
  const selectedPartnerAge = selectedPartner ? Math.max(0, game.week - (selectedPartner.signedWeek ?? 0)) : 0;
  const selectedPartnerEarlyPenalty = selectedPartnerEarly && selectedPartner ? clamp(18 + selectedPartner.weeksLeft * 1.35 + Math.max(0, 5 - selectedPartnerAge) * 5, 18, 58) : 0;
  const pendingStaffAlerts = (game.staffAlerts ?? []).filter((alert) => !alert.resolved);
  const [leadershipTitle, leadershipDescription] = leadershipArchetype(game.leadershipIdentity);
  const selectedFaction = (game.factions ?? []).find((faction) => faction.id === selectedFactionId) ?? game.factions?.[0] ?? null;
  const currentAnnualSnapshot = annualSnapshot(game);
  const annualTimeProgress = game.annualPlan ? Math.round(clamp(((game.week - game.annualPlan.startWeek) / 51) * 100)) : 0;
  const currentFounderAct = founderAct(game.week);
  const founderPersonal = game.founderPersonal ?? { health: 82, family: 72, satisfaction: 60, ego: 38, regrets: 8 };
  const nemesis = game.competitors.find((competitor) => competitor.id === game.nemesisId) ?? game.competitors[0] ?? null;
  const nextJourneyMission = missions.find((mission) => !(game.completedMissions ?? []).includes(mission.id) && game.week >= (mission.unlockWeek ?? 1)) ?? missions.find((mission) => !(game.completedMissions ?? []).includes(mission.id));
  const founderJourneyProgress = game.founderJourneyComplete ? 100 : Math.round(clamp(Math.min(130, game.week) / 130 * 55 + ((game.completedMissions?.length ?? 0) / missions.length) * 45));
  const projectedFounderEnding = game.founderEnding ?? determineFounderEnding(game);
  const founderLegacyProbabilities = founderLegacyChances(game);
  const founderLegacyOutcome = game.founderLegacyOutcome;
  const isCEO = active?.ceo === currentLeader;
  const operationalAccess = Boolean(
    active && !active.sold && !active.bankrupt && !active.closed,
  );
  const metrics = useMemo(
    () => (active ? companyMetrics(active, game.economy) : null),
    [active, game.economy],
  );
  const activeFacilitySummary = active ? facilitySummary(active) : null;
  const marketableProducts = active?.projects.filter((product) => product.kind === "produto" && product.lifecycle === "mercado") ?? [];
  const campaignForecast = active ? marketingCampaignForecast(active, game.economy, game.competitors, campaignBudget, campaignDuration, campaignAudience, campaignObjective, campaignProductId) : null;
  const empireValue =
    game.companies
      .filter((c) => !c.sold && !c.bankrupt && !c.closed)
      .reduce((sum, c) => sum + companyMetrics(c, game.economy).valuation, 0) +
    game.personalCash;
  const groupCash = game.companies
    .filter((company) => !company.sold && !company.bankrupt && !company.closed)
    .reduce((sum, company) => sum + company.cash, 0);
  const founderAge =
    (game.founderStartAge ?? 32) + Math.floor((game.week - 1) / 52);
  const heirs = game.heirs ?? [];
  const eligibleHeirs = heirs.filter(
    (heir) =>
      heir.status !== "rompido" &&
      heir.name !== currentLeader &&
      heir.competence >= 35 &&
      heir.readiness >= 20,
  );
  const holdingCEOHeir = holdingCompany
    ? heirs.find((heir) => heir.name === holdingCompany.ceo) ?? null
    : null;
  const recentNewsStartWeek = Math.max(1, game.week - 2);
  const recentNews = game.news.filter(
    (item) => item.week >= recentNewsStartWeek,
  );
  const chosenSuccessor = heirs.find(
    (heir) => heir.id === game.chosenSuccessorId,
  );
  const activeCompanies = game.companies.filter(
    (company) => !company.sold && !company.bankrupt && !company.closed,
  );
  const delegatedCompanies = activeCompanies.filter(
    (company) => company.ceo !== currentLeader,
  ).length;
  const totalDebt = activeCompanies.reduce(
    (sum, company) => sum + Math.max(0, company.debt),
    0,
  );
  const lifeGoalProgress = Math.round(
    clamp(
      game.lifeGoal === "fortuna"
        ? (empireValue / 10000000) * 100
        : game.lifeGoal === "impacto"
          ? (game.reputation / 90) * 50 + (game.legacy / 80) * 50
          : game.lifeGoal === "liberdade"
            ? (game.personalCash / 3000000) * 55 +
              (delegatedCompanies / Math.max(1, activeCompanies.length)) * 30 +
              (totalDebt < 100000 ? 15 : 0)
            : (chosenSuccessor?.readiness ?? Math.max(0, ...heirs.map((h) => h.readiness))) * 0.7 +
              Math.min(30, activeCompanies.length * 7.5),
    ),
  );
  const retirementReadiness = Math.round(
    clamp(
      (chosenSuccessor?.readiness ?? 0) * 0.55 +
        Math.min(22, game.week * 0.35) +
        Math.min(15, game.legacy * 0.18) +
        (lifeGoalProgress >= 80 ? 8 : 0),
    ),
  );
  const dynastyTenure = game.dynastyMode
    ? game.week - (game.dynastyStartedWeek ?? game.week)
    : 0;
  const familyControl = Math.round(
    clamp(100 - (game.outsideFamilyEquity ?? 0)),
  );
  const nextGenerationCandidates = heirs.filter(
    (heir) => (heir.generation ?? 2) === (game.generation ?? 1) + 1,
  );
  const selectedNextLeader = nextGenerationCandidates.find(
    (heir) => heir.id === game.chosenSuccessorId,
  );
  const dynastyGoalProgress = Math.round(
    clamp(
      game.dynastyGoal === "expandir"
        ? activeCompanies.length * 15 + Math.min(40, empireValue / 250000)
        : game.dynastyGoal === "inovar"
          ? activeCompanies.reduce(
              (sum, company) =>
                sum +
                company.projects.filter(
                  (project) =>
                    project.kind === "produto" &&
                    project.status === "concluido" &&
                    project.lifecycle === "mercado",
                ).length *
                  14,
              0,
            ) + game.reputation * 0.35
          : game.dynastyGoal === "unir"
            ? (game.familyUnity ?? 70) * 0.65 +
              (game.dynastyLegitimacy ?? 50) * 0.35
            : Math.max(0, 100 - totalDebt / 8000) * 0.45 +
              familyControl * 0.35 +
              (game.dynastyLegitimacy ?? 50) * 0.2,
    ),
  );
  const chapterTitle = game.dynastyMode ? `Dinastia · geração ${game.generation ?? 2}` : currentFounderAct.title;
  const gameDate = useMemo(() => {
    const date = new Date(2026, 0, 5 + (game.week - 1) * 7);
    return date
      .toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
      .replace(".", "");
  }, [game.week]);

  const updateActive = (fn: (company: Company) => Company) => {
    if (!isCEO) {
      notify(
        "Você não ocupa o cargo de CEO. Reconquiste o conselho para voltar à operação.",
      );
      return;
    }
    setGame((s) => {
      const beforeCompany = s.companies.find((company) => company.id === s.activeCompanyId);
      if (!beforeCompany) return s;
      const afterCompany = fn(beforeCompany);
      const title = afterCompany.price !== beforeCompany.price
        ? "Ajuste de preço"
        : afterCompany.marketing !== beforeCompany.marketing
          ? "Ajuste de marketing"
          : afterCompany.strategy !== beforeCompany.strategy
            ? "Mudança de estratégia"
            : "Decisão operacional";
      const changed = { ...s, companies: s.companies.map((company) => company.id === s.activeCompanyId ? afterCompany : company) };
      return recordDecisionTrace(s, changed, title, title, `A configuração da ${afterCompany.name} foi alterada e continuará sendo observada nas próximas semanas.`);
    });
  };
  const startMarketingCampaign = () => {
    if (!active || !campaignForecast || !isCEO || active.cash < campaignBudget || campaignBudget < 5000 || campaignBudget > 150000 || (active.marketingCampaigns ?? []).filter((campaign) => campaign.weeksLeft > 0).length >= 2) return;
    if (campaignObjective === "lancamento" && (!marketableProducts.length || !campaignProductId)) return;
    const roll = Math.random() * 100;
    const probabilities = campaignForecast.probabilities;
    const outcome: MarketingCampaignOutcome = roll < probabilities.forte ? "forte" : roll < probabilities.forte + probabilities.moderado ? "moderado" : roll < probabilities.forte + probabilities.moderado + probabilities.ignorado ? "ignorado" : "negativo";
    const product = marketableProducts.find((item) => item.id === campaignProductId);
    const capacity = companyCommercialCapacity(active);
    const room = Math.max(0, capacity.customerCapacity - active.customers);
    const retentionFactor = campaignObjective === "retencao" ? .45 : 1;
    const totalCustomerImpact = outcome === "forte"
      ? Math.max(1, Math.round(room * (.08 + campaignForecast.budgetEfficiency * .16) * retentionFactor))
      : outcome === "moderado"
        ? Math.max(0, Math.round(room * (.035 + campaignForecast.budgetEfficiency * .075) * retentionFactor))
        : outcome === "negativo"
          ? -Math.max(1, Math.round(active.customers * (.018 + Math.max(0, campaignBudget / campaignForecast.idealBudget - 1.8) * .012)))
          : 0;
    const campaign: MarketingCampaign = {
      id: `campaign-${active.id}-${game.week}-${Date.now()}`,
      name: campaignObjective === "lancamento" && product ? `Lançamento de ${product.name}` : `${marketingObjectiveLabels[campaignObjective]} · ${marketingAudienceLabels[campaignAudience]}`,
      audience: campaignAudience,
      objective: campaignObjective,
      productId: product?.id,
      productName: product?.name,
      totalBudget: campaignBudget,
      duration: campaignDuration,
      weeksLeft: campaignDuration,
      startedWeek: game.week,
      outcome,
      probabilities,
      totalCustomerImpact,
      revenueMultiplier: outcome === "forte" ? 1.18 : outcome === "moderado" ? 1.075 : outcome === "ignorado" ? .995 : .92,
      totalReputationImpact: outcome === "forte" ? 5 : outcome === "moderado" ? 2 : outcome === "negativo" ? -7 : 0,
      revealed: false,
    };
    setGame((state) => {
      const changed: GameState = {
        ...state,
        companies: state.companies.map((company) => company.id === active.id ? { ...company, cash: company.cash - campaignBudget, marketingCampaigns: [...(company.marketingCampaigns ?? []), campaign] } : company),
        financialLedger: [{ id: `${state.week}-${active.id}-campaign-${Date.now()}`, week: state.week, companyId: active.id, companyName: active.name, category: "marketing", label: campaign.name, amount: -campaignBudget, detail: `Campanha de ${campaignDuration} semanas para ${marketingAudienceLabels[campaignAudience].toLowerCase()}.` }, ...(state.financialLedger ?? [])].slice(0, 180),
        news: [{ id: Date.now(), week: state.week, category: "negocios", headline: `${active.name} lança nova campanha de ${money.format(campaignBudget)}`, body: `${campaign.name} ficará no ar por ${campaignDuration} semanas. O mercado estima ${probabilities.forte}% de crescimento forte, ${probabilities.moderado}% de retorno moderado, ${probabilities.ignorado}% de indiferença e ${probabilities.negativo}% de repercussão negativa.`, impact: "neutro" }, ...state.news].slice(0, 60),
      };
      return recordDecisionTrace(state, changed, "Campanha de marketing", campaign.name, `O investimento de ${money.format(campaignBudget)} produzirá efeitos graduais durante ${campaignDuration} semanas.`);
    });
    setDialog(null);
    notify("A campanha começou. O resultado aparecerá gradualmente nas próximas semanas.");
  };
  const notify = (text: string) => {
    setToast(text);
    setTimeout(() => setToast(""), 2600);
  };

  const openStaffReplacement = (alert: StaffAlert) => {
    const company = game.companies.find((item) => item.id === alert.companyId);
    if (!company) return;
    setGame((state) => ({ ...state, activeCompanyId: company.id }));
    if (company.ceo === currentLeader) {
      setView("pessoas");
      setDialog("hire");
    } else {
      setHoldingCompanyId(company.id);
      setView("portfolio");
      setDialog("holding-company");
    }
  };

  const partnerAction = (action: "aceitar" | "renovar" | "pressionar" | "relacionamento" | "encerrar") => {
    if (!active || !selectedPartner || !isCEO) return;
    if (action === "relacionamento" && active.cash < 20000) return;
    if ((action !== "encerrar" && selectedPartnerCooldown > 0) || (action === "relacionamento" && selectedRelationshipCooldown > 0)) return;
    const identity = game.leadershipIdentity ?? initialLeadershipIdentity;
    const negotiationPower = identity.negociacao * 0.45 + identity.integridade * 0.2 + selectedPartner.trust * 0.35;
    const strategy: PartnerStrategy = action === "aceitar" ? "aceitar" : action === "renovar" ? "equilibrio" : action;
    const resolvedPartner = resolvePartnerStrategy(selectedPartner, strategy, negotiationPower, currentLeader, game.week);
    const negotiationFailed = /fracass|recus|rescis/i.test(resolvedPartner.lastEvent ?? "") || resolvedPartner.status === "disputa" || resolvedPartner.status === "encerrado" && action !== "encerrar";
    const changes: Partial<Record<IdentityDimension, number>> = action === "renovar" || action === "aceitar"
      ? { prudencia: 2, negociacao: 1 }
      : action === "pressionar"
        ? { negociacao: 3, agressividade: 2, pessoas: -1 }
        : action === "relacionamento"
          ? { pessoas: 2, integridade: 1 }
          : { agressividade: 3, integridade: -1 };
    setGame((state) => {
      const changed = evolveIdentity({
        ...state,
      companies: state.companies.map((company) => company.id !== active.id ? company : ({
        ...company,
        cash: company.cash - (action === "relacionamento" ? 20000 : 0),
        reputation: clamp(company.reputation + (action === "encerrar" ? -2 : action === "relacionamento" ? 1 : 0)),
        partners: (company.partners ?? []).map((partner) => {
          if (partner.id !== selectedPartner.id) return partner;
          return resolvedPartner;
        }),
      })),
      news: [{
        id: Date.now(), week: state.week, category: "negocios",
        headline: resolvedPartner.status === "encerrado" ? `${selectedPartner.name} encerra contrato com ${active.name}` : negotiationFailed ? `Renegociação entre ${active.name} e ${selectedPartner.name} fracassa` : action === "aceitar" ? `${active.name} aceita proposta de ${selectedPartner.name}` : `${active.name} renegocia acordo com ${selectedPartner.name}`,
        body: resolvedPartner.lastEvent ?? `A decisão de ${action} alterou valores, confiança e dependência entre as empresas.`,
        impact: negotiationFailed || action === "encerrar" ? "negativo" : action === "relacionamento" ? "positivo" : "neutro",
      }, ...state.news].slice(0, 60),
      financialLedger: action === "relacionamento" ? [{ id: `${state.week}-${active.id}-contract-${Date.now()}`, week: state.week, companyId: active.id, companyName: active.name, category: "contratos", label: `Relacionamento com ${selectedPartner.name}`, amount: -20000, detail: "Investimento extraordinário para fortalecer a relação comercial." }, ...(state.financialLedger ?? [])].slice(0, 180) : state.financialLedger,
      }, changes, `${action} com ${selectedPartner.name}`);
      return recordDecisionTrace(state, changed, `Negociação com ${selectedPartner.name}`, action, resolvedPartner.lastEvent ?? "O contrato e a relação comercial foram alterados.");
    });
    setDialog(null);
    notify(resolvedPartner.lastEvent ?? "A decisão comercial foi registrada.");
  };

  const factionAction = (action: "negociar" | "agenda" | "confrontar") => {
    if (!selectedFaction || !active) return;
    if (action === "negociar" && active.cash < 30000) return;
    setGame((state) => {
      const agenda = selectedFaction.agenda;
      const companies = state.companies.map((company) => {
        if (company.sold || company.bankrupt || company.closed) return company;
        if (action === "negociar") return company.id === active.id ? { ...company, cash: company.cash - 30000 } : company;
        if (action !== "agenda") return { ...company, boardSupport: clamp((company.boardSupport ?? 50) + 2) };
        return {
          ...company,
          customers: agenda === "crescimento" ? company.customers + 5 : company.customers,
          efficiency: agenda === "seguranca" ? Math.max(.68, (company.efficiency ?? 1) - .02) : company.efficiency,
          projects: agenda === "inovacao" ? company.projects.map((project) => project.status === "ativo" ? { ...project, progress: clamp(project.progress + 5) } : project) : company.projects,
          employees: agenda === "pessoas" ? company.employees.map((employee) => ({ ...employee, morale: clamp(employee.morale + 5), stress: clamp((employee.stress ?? 0) - 4) })) : company.employees,
          boardSupport: clamp((company.boardSupport ?? 50) + (agenda === "retorno" ? 5 : agenda === "familia" ? 3 : 0)),
        };
      });
      const changed = {
        ...state,
        personalCash: state.personalCash,
        familyUnity: agenda === "familia" && action === "agenda" ? clamp((state.familyUnity ?? 70) + 8) : state.familyUnity,
        companies,
        factions: (state.factions ?? []).map((faction) => faction.id !== selectedFaction.id ? faction : ({
          ...faction,
          support: clamp(faction.support + (action === "negociar" ? 13 : action === "agenda" ? 18 : -17)),
          pressure: clamp(faction.pressure + (action === "negociar" ? -9 : action === "agenda" ? -15 : 18)),
          agendaWeeks: action === "agenda" ? 8 : faction.agendaWeeks,
          lastMove: action === "negociar" ? "Você abriu um canal político e prometeu ouvir o grupo." : action === "agenda" ? `A agenda de ${agenda} recebeu prioridade por oito semanas.` : "Você confrontou publicamente a facção e tentou reduzir sua influência.",
        })),
        factionHistory: [`Semana ${state.week}: ${action} com ${selectedFaction.name}.`, ...(state.factionHistory ?? [])].slice(0, 16),
        news: [{ id: Date.now(), week: state.week, category: "negocios" as const, headline: action === "confrontar" ? `${currentLeader} confronta ${selectedFaction.name}` : `${selectedFaction.name} fecha acordo com a liderança`, body: `A disputa por ${agenda} alterou apoio, pressão e prioridades dentro da holding.`, impact: action === "confrontar" ? "negativo" as const : "neutro" as const }, ...state.news].slice(0, 60),
      };
      const evolved = evolveIdentity(changed, action === "confrontar" ? { agressividade: 3, negociacao: -1 } : action === "negociar" ? { negociacao: 3, pessoas: 1 } : agenda === "seguranca" ? { prudencia: 3 } : agenda === "inovacao" ? { visao: 3 } : agenda === "pessoas" ? { pessoas: 3 } : { agressividade: 2 }, `${action} com ${selectedFaction.name}`);
      return recordDecisionTrace(state, evolved, `Disputa com ${selectedFaction.name}`, action, `A decisão alterou apoio, pressão e a agenda de ${agenda}.`);
    });
    notify("O equilíbrio político da holding mudou.");
  };

  const startAnnualPlan = () => {
    if (game.annualPlan) return;
    const details = annualPlanDetails[annualPriorityChoice];
    setGame((state) => {
      const changed: GameState = {
      ...state,
      annualPlan: { year: (state.annualReviews?.length ?? 0) + 1, startWeek: state.week, endWeek: state.week + 51, priority: annualPriorityChoice, title: details.title, promises: details.promises, baseline: annualSnapshot(state) },
      news: [{ id: Date.now(), week: state.week, category: "negocios", headline: `${state.holdingName} anuncia ${details.title}`, body: `A liderança assumiu três promessas públicas para as próximas 52 semanas: ${details.promises.join("; ")}.`, impact: "neutro" }, ...state.news].slice(0, 60),
      };
      return recordDecisionTrace(state, changed, "Plano estratégico anual", details.title, `Três promessas públicas orientarão a holding até a semana ${state.week + 51}.`);
    });
    notify("O plano anual começou. As promessas agora serão cobradas.");
  };

  const completeFounderJourney = () => {
    if (game.founderJourneyComplete) return;
    const ending = determineFounderEnding(game);
    const details = endingDetails[ending];
    const legacyOutcome = createFounderLegacyOutcome(game);
    setGame((state) => ({
      ...state,
      founderJourneyComplete: true,
      founderJourneyReady: true,
      founderEnding: ending,
      founderEndingWeek: state.week,
      founderLegacyOutcome: legacyOutcome,
      legacy: state.legacy + 25,
      careerMoments: [{ week: state.week, title: legacyOutcome.title, detail: legacyOutcome.narrative, tone: legacyOutcome.impactTone === "positivo" ? "positivo" : "negativo" }, ...(state.careerMoments ?? [])].slice(0, 30),
      news: [{ id: Date.now(), week: state.week, category: "pessoas", headline: `${state.founder} conclui sua jornada como ${details.title}`, body: legacyOutcome.narrative, impact: legacyOutcome.impactTone }, ...state.news].slice(0, 60),
    }));
    setSpeed(0);
    notify(`O futuro foi escrito: ${legacyOutcome.title.toLowerCase()}. Esse epílogo agora faz parte do save.`);
  };

  const concludeDynasty = () => {
    if (!game.dynastyMode || !game.dynastyEndingReady || game.dynastyConcluded) return;
    const ending = createDynastyEnding(game);
    setGame((state) => ({
      ...state,
      dynastyConcluded: true,
      dynastyEnding: ending,
      dynastyHistory: [`Semana ${state.week}: ${ending.title} encerrou a crônica principal da família.`, ...(state.dynastyHistory ?? [])].slice(0, 20),
      news: [{ id: Date.now(), week: state.week, category: "negocios", headline: ending.title, body: ending.narrative, impact: ending.type === "centenario" || ending.type === "imperio" ? "positivo" : "negativo" }, ...state.news].slice(0, 60),
    }));
    setSpeed(0);
    setDialog("dynasty-ending");
  };

  useEffect(() => {
    if (!game.started) return;
    const completed = game.completedMissions ?? [];
    const achieved = missions.filter((mission) => !completed.includes(mission.id) && game.week >= (mission.unlockWeek ?? 1) && mission.progress(game) >= mission.target);
    if (!achieved.length) return;
    setGame((s) => {
      const pending = achieved.filter((mission) => !(s.completedMissions ?? []).includes(mission.id));
      if (!pending.length) return s;
      return {
        ...s,
        completedMissions: [...(s.completedMissions ?? []), ...pending.map((mission) => mission.id)],
        personalCash: s.personalCash + pending.reduce((sum, mission) => sum + mission.rewardCash, 0),
        legacy: s.legacy + pending.reduce((sum, mission) => sum + mission.rewardLegacy, 0),
        chapter: Math.max(s.chapter, ...pending.map((mission) => mission.chapter)),
        careerMoments: [...pending.map((mission): CareerMoment => ({ week: s.week, title: mission.title, detail: mission.objective, tone: "positivo" })), ...(s.careerMoments ?? [])].slice(0, 30),
        news: [...pending.map((mission, index): NewsItem => ({ id: Date.now() + index, week: s.week, category: "negocios", headline: `Marco concluído: ${mission.title}`, body: `${mission.objective}. A jornada do fundador avançou.`, impact: "positivo" })), ...s.news].slice(0, 60),
        log: [...pending.map((mission) => `Marco concluído: ${mission.title}.`), ...s.log].slice(0, 12),
      };
    });
    setTimeout(() => notify(achieved.length === 1 ? `Marco concluído: ${achieved[0].title}` : `${achieved.length} marcos foram concluídos.`), 0);
  }, [game]);

  useEffect(() => {
    if (!game.started || game.lifeGoalCompleted || lifeGoalProgress < 100) return;
    const goal = lifeGoals.find((item) => item.id === game.lifeGoal);
    setGame((s) => ({
      ...s,
      lifeGoalCompleted: true,
      legacy: s.legacy + 20,
      news: [
        {
          id: Date.now(),
          week: s.week,
          category: "negocios",
          headline: `${s.founder} realiza seu objetivo de vida`,
          body: `${goal?.title ?? "O projeto de vida"} deixou de ser apenas uma ambição. A conquista adiciona 20 pontos ao legado do fundador.`,
          impact: "positivo",
        },
        ...s.news,
      ].slice(0, 50),
    }));
    setTimeout(() => notify("Objetivo de vida realizado: +20 de legado."), 0);
  }, [game.started, game.lifeGoalCompleted, game.lifeGoal, lifeGoalProgress]);

  useEffect(() => {
    if (!game.started || !game.dynastyMode || dynastyGoalProgress < 100) return;
    const key = `${game.generation ?? 2}-${game.dynastyGoal ?? "preservar"}`;
    if ((game.completedDynastyGoals ?? []).includes(key)) return;
    setGame((s) => ({
      ...s,
      completedDynastyGoals: [...(s.completedDynastyGoals ?? []), key],
      legacy: s.legacy + 12,
      dynastyLegitimacy: clamp((s.dynastyLegitimacy ?? 50) + 8),
      dynastyHistory: [
        `Geração ${s.generation}: projeto ${s.dynastyGoal} concluído por ${s.playerExecutive}.`,
        ...(s.dynastyHistory ?? []),
      ],
      news: [
        {
          id: Date.now(),
          week: s.week,
          category: "negocios",
          headline: `Geração ${s.generation} realiza seu projeto na ${s.holdingName}`,
          body: `${s.playerExecutive} consolidou a estratégia ${s.dynastyGoal}. A conquista adiciona legitimidade e 12 pontos ao legado da família.`,
          impact: "positivo",
        },
        ...s.news,
      ].slice(0, 50),
    }));
    setTimeout(() => notify("Projeto da geração concluído: +12 legado."), 0);
  }, [game.started, game.dynastyMode, game.generation, game.dynastyGoal, game.completedDynastyGoals, dynastyGoalProgress]);

  useEffect(() => {
    if (active?.sold || active?.bankrupt || active?.closed) {
      if (["escritorio", "pessoas", "projetos", "cidade"].includes(view))
        setView("portfolio");
      const operationalDialogs = [
        "hire", "salary", "project", "product", "sell", "bankruptcy",
        "recovery", "acquire", "capital", "board",
      ];
      if (dialog && operationalDialogs.includes(dialog)) setDialog(null);
    }
  }, [active?.sold, active?.bankrupt, active?.closed, view, dialog]);

  const start = (sector: Sector, holdingName: string, founderName: string, difficulty: GameDifficulty) => {
    const company = { ...newCompany(sector), ceo: founderName.trim() };
    const competitors = generateCompetitors(sector);
    setGame({
      ...initialState,
      started: true,
      founder: founderName.trim(),
      playerExecutive: founderName.trim(),
      companies: [company],
      activeCompanyId: company.id,
      holdingName: holdingName.trim(),
      difficulty,
      heirs: createHeirs(founderName.trim()),
      providers: capitalProviders,
      competitors,
      nemesisId: competitors[0]?.id,
      founderPersonal: { health: 82, family: 72, satisfaction: 60, ego: 38, regrets: 8 },
      careerMoments: [{ week: 1, title: "As portas abriram", detail: `${founderName.trim()} fundou ${company.name}.`, tone: "positivo" }],
      news: [
        {
          id: Date.now(),
          week: 1,
          category: "negocios",
          headline: `${company.name} inicia operações com três funcionários`,
          body: "A nova empresa entra em um mercado disputado e promete desafiar negócios estabelecidos.",
          impact: "neutro",
        },
      ],
      unread: [makeOpeningMessage()],
      log: [
        "Você assinou o contrato e abriu as portas.",
        "Três pessoas aceitaram começar essa história com você.",
      ],
    });
    setView("escritorio");
    setDialog("inbox");
  };

  const chooseMessage = (choice: MessageChoice) => {
    const message = selectedMessage ?? game.unread[0];
    if (!message) return;
    setGame((s) => {
      const changed = choice.effect(s);
      const traced = recordDecisionTrace(s, changed, message.subject, choice.label, choice.result);
      const tutorialWeek = message.id.startsWith("tutorial-") ? Number(message.id.replace("tutorial-", "")) : null;
      return {
        ...traced,
        unread: traced.unread.filter((m) => m.id !== message.id),
        log: [choice.result, ...traced.log].slice(0, 10),
        tutorialSeenWeeks: tutorialWeek ? [...new Set([...(traced.tutorialSeenWeeks ?? []), tutorialWeek])] : traced.tutorialSeenWeeks,
      };
    });
    notify(choice.result);
    setSelectedMessage(null);
    if (message.id.startsWith("tutorial-")) {
      const week = Number(message.id.replace("tutorial-", ""));
      setView(week === 4 ? "pessoas" : week === 6 ? "projetos" : week === 8 ? "cidade" : week === 10 ? "portfolio" : "escritorio");
      setDialog(null);
    }
  };

  const addMessage = (message: StoryMessage) =>
    setGame((s) =>
      s.unread.some((m) => m.id === message.id)
        ? s
        : { ...s, unread: [...s.unread, message] },
    );

  const followWeeklyAdvice = (advice: WeeklyAdvice, companyId?: number) => {
    const targetCompany = game.companies.find((company) => company.id === companyId) ?? advisedCompany;
    if (targetCompany)
      setGame((state) => ({ ...state, activeCompanyId: targetCompany.id }));
    if (advice.action === "pessoas") setView("pessoas");
    if (advice.action === "projetos") setView("projetos");
    if (advice.action === "mercado") setView("cidade");
    if (advice.action === "estrategia") setView("escritorio");
    setDialog(null);
  };

  const navigateToView = (target: View, reopenGuide = false) => {
    setView(target);
    const firstVisit = !(game.seenPageGuides ?? []).includes(target);
    if (firstVisit || reopenGuide) {
      setPageGuideView(target);
      setDialog("page-guide");
      if (firstVisit) setGame((state) => ({ ...state, seenPageGuides: [...new Set([...(state.seenPageGuides ?? []), target])] }));
    }
  };

  const storyBeat = (next: GameState, company: Company, valuation: number) => {
    if (next.week === 4)
      addMessage({
        id: "salary-livia",
        from: "Lívia Rocha",
        role: "Produto",
        initials: "LR",
        color: "#efad55",
        subject: "Preciso falar sobre meu futuro",
        body: "Uma empresa maior me ofereceu R$ 7.600. Eu gosto daqui, mas preciso sentir que existe um caminho para mim. Não é só dinheiro.",
        choices: [
          {
            label: "R$ 7.400 + promoção",
            result: "Lívia ficou e assumiu a liderança do produto.",
            effect: (s) => ({
              ...s,
              companies: s.companies.map((c) => ({
                ...c,
                employees: c.employees.map((e) =>
                  e.id === 1
                    ? {
                        ...e,
                        salary: 7400,
                        morale: 94,
                        loyalty: 90,
                        role: "Diretora de Produto",
                      }
                    : e,
                ),
              })),
            }),
          },
          {
            label: "5% da empresa",
            tone: "risk",
            result: "Você ganhou uma sócia — e abriu mão de parte do futuro.",
            effect: (s) => ({
              ...s,
              companies: s.companies.map((c) => ({
                ...c,
                employees: c.employees.map((e) =>
                  e.id === 1
                    ? { ...e, morale: 98, loyalty: 99, skill: e.skill + 4 }
                    : e,
                ),
              })),
              legacy: s.legacy + 6,
            }),
          },
          {
            label: "Não posso cobrir",
            tone: "risk",
            result: "Lívia saiu. O projeto perdeu ritmo e memória.",
            effect: (s) => ({
              ...s,
              companies: s.companies.map((c) => ({
                ...c,
                employees: c.employees.filter((e) => e.id !== 1),
                projects: c.projects.map((p) => ({
                  ...p,
                  progress: Math.max(0, p.progress - 18),
                  risk: p.risk + 20,
                })),
              })),
            }),
          },
        ],
      });
    if (next.week === 7)
      addMessage({
        id: "rival",
        from: "Tomás Vale",
        role: "CEO da Atlas",
        initials: "TV",
        color: "#ca7b83",
        subject: "Talvez você devesse desistir",
        body: "Seu concorrente lançou uma campanha copiando sua proposta e começou a abordar seus clientes. Tomás ainda deixou um recado: “Negócios não são para sentimentais.”",
        choices: [
          {
            label: "Responder com inovação",
            result: "A equipe canalizou a raiva para o produto.",
            effect: (s) => ({
              ...s,
              companies: s.companies.map((c) => ({
                ...c,
                cash: c.cash - 22000,
                projects: c.projects.map((p) => ({
                  ...p,
                  quality: p.quality + 14,
                  progress: p.progress + 12,
                })),
              })),
              rivalScore: s.rivalScore + 2,
            }),
          },
          {
            label: "Campanha provocativa",
            tone: "risk",
            result:
              "A disputa virou assunto. A marca cresceu, mas a rivalidade também.",
            effect: (s) => ({
              ...s,
              companies: s.companies.map((c) => ({
                ...c,
                cash: c.cash - 14000,
                reputation: c.reputation + 11,
                customers: Math.round(c.customers * 1.12),
              })),
              rivalScore: s.rivalScore + 10,
            }),
          },
          {
            label: "Conversar com os clientes",
            result: "Foi lento, mas você fortaleceu relações reais.",
            effect: (s) => ({
              ...s,
              companies: s.companies.map((c) => ({
                ...c,
                reputation: c.reputation + 6,
                employees: c.employees.map((e) => ({
                  ...e,
                  morale: e.morale + 3,
                })),
              })),
              legacy: s.legacy + 3,
            }),
          },
        ],
      });
    if (next.week >= 10 && valuation > 900000 && next.lastOffer === 0)
      addMessage({
        id: "offer",
        from: "Otávio Brandão",
        role: "Fundo Northstar",
        initials: "OB",
        color: "#778ad9",
        subject: "Temos uma proposta pela sua empresa",
        body: `A Northstar quer comprar 100% da ${company.name}. A oferta é alta o bastante para mudar sua vida, mas a equipe provavelmente será reestruturada.`,
        choices: [
          {
            label: `Aceitar ${compact.format(valuation * 1.35)} · líquido ${compact.format(saleSettlement(Math.round(valuation * 1.35)).net)}`,
            tone: "good",
            result:
              "Você vendeu sua primeira empresa. Agora joga com o próprio patrimônio.",
            effect: (s) => ({
              ...s,
              personalCash: s.personalCash + saleSettlement(Math.round(valuation * 1.35)).net,
              companies: s.companies.map((c) =>
                c.id === company.id ? { ...c, sold: true } : c,
              ),
              chapter: 4,
              lastOffer: valuation * 1.35,
              legacy: s.legacy + 8,
            }),
          },
          {
            label: "Pedir 60% a mais",
            tone: "risk",
            result:
              "Você fez uma contraproposta agressiva. O fundo vai pensar.",
            effect: (s) => ({
              ...s,
              lastOffer: valuation * 1.6,
              reputation: s.reputation + 4,
              rivalScore: s.rivalScore + 4,
            }),
          },
          {
            label: "Recusar. Ainda não terminei.",
            result: "Você recusou milhões e voltou para a arena.",
            effect: (s) => ({
              ...s,
              lastOffer: -1,
              legacy: s.legacy + 12,
              companies: s.companies.map((c) => ({
                ...c,
                reputation: c.reputation + 8,
                employees: c.employees.map((e) => ({
                  ...e,
                  loyalty: clamp(e.loyalty + 9),
                })),
              })),
            }),
          },
        ],
      });
  };

  const advanceWeek = () => {
    if (!active || active.sold || active.bankrupt || game.dynastyConcluded) return;
    setGame((current) => {
      const nextWeek = current.week + 1;
      const controlledExecutive = current.playerExecutive ?? current.founder;
      const directorBefore = current.narrativeDirector ?? initialState.narrativeDirector!;
      const eventPressure = directorBefore.mode === "recuperacao" ? .52 : directorBefore.mode === "calma" ? .72 : directorBefore.mode === "escalada" ? 1.38 : directorBefore.mode === "foco" ? .68 : 1;
      const difficulty = difficultyProfiles[current.difficulty ?? "executivo"];
      const previousDifficulty = difficultyProfiles[current.difficultyApplied ?? "executivo"];
      const rolledEconomy = rollEconomy({ ...current.economy, demand: current.economy.demand / previousDifficulty.economyDemand, costs: current.economy.costs / previousDifficulty.economyCosts });
      const economyRoll = {
        ...rolledEconomy,
        economy: {
          ...rolledEconomy.economy,
          demand: rolledEconomy.economy.demand * difficulty.economyDemand,
          costs: rolledEconomy.economy.costs * difficulty.economyCosts,
          confidence: clamp(rolledEconomy.economy.confidence + (current.difficulty === "relaxado" ? 3 : current.difficulty === "implacavel" ? -3 : 0)),
        },
      };
      const weeklyNews: NewsItem[] = economyRoll.news
        ? [{ ...economyRoll.news, id: Date.now() + 1, week: nextWeek }]
        : [];
      const ambientNews = generateWorldNews(
        current,
        economyRoll.economy,
        nextWeek,
        current.recentNewsTopics ?? [],
        directorBefore.mode === "recuperacao" || directorBefore.mode === "foco" ? 1 : directorBefore.mode === "escalada" ? 2 : nextWeek % 4 === 0 ? 2 : 1,
      );
      weeklyNews.push(...ambientNews);
      if (nextWeek % 12 === 0) {
        const [identityTitle, identityDescription] = leadershipArchetype(current.leadershipIdentity);
        weeklyNews.push({
          id: Date.now() + 1510,
          week: nextWeek,
          category: "pessoas",
          headline: `Mercado passa a descrever ${controlledExecutive} como “${identityTitle}”`,
          body: `${identityDescription} Clientes, fornecedores, candidatos e investidores começam a antecipar esse comportamento nas negociações.`,
          impact: "neutro",
          topic: `identidade-${identityTitle}`,
          source: "Perfil Executivo",
          scope: "nacional",
          tags: ["liderança", "reputação", "decisões"],
        });
      }
      let completedName = "";
      let holdingDividends = 0;
      let ceoProposalMessage: StoryMessage | null = null;
      const newAuditCases: AuditCase[] = [];
      const newStaffAlerts: StaffAlert[] = [];

      let companies = current.companies.map((company) => {
        if (company.sold || company.bankrupt || company.closed) return company;
        const activeEffects = company.effects ?? [];
        const effectValue = (field: keyof OngoingEffect) =>
          activeEffects.reduce(
            (sum, effect) =>
              sum +
              (typeof effect[field] === "number"
                ? (effect[field] as number)
                : 0),
            0,
        );
        const cm = companyMetrics(company, economyRoll.economy);
        let employerBrand = company.employerBrand ?? clamp(company.reputation * .62);
        const liquidityPressure = cm.cashCoverage >= 1 ? 0 : clamp((1 - cm.cashCoverage) * 3.5, 0, 3.5);
        if (cm.cashCoverage < .55 && nextWeek % 6 === company.id % 6) weeklyNews.push({ id: Date.now() + company.id + 2320, week: nextWeek, category: "economia", headline: `${company.name} cresce sem capital de giro suficiente`, body: `A reserva cobre apenas ${Math.max(0, Math.round(cm.cashCoverage * 100))}% da necessidade de ${money.format(cm.requiredReserve)}. Fornecedores, equipe e clientes já percebem atrasos e cautela.`, impact: "negativo" });
        let facilities = normalizedFacilities(company);
        const maintenanceMode = company.facilityMaintenanceMode ?? "adequado";
        const maintenancePlan = facilityModeLabels[maintenanceMode];
        facilities = Object.fromEntries(facilityKeys.map((key) => [key, {
          ...facilities[key],
          condition: facilities[key].level === 0 ? 100 : clamp(facilities[key].condition + maintenancePlan.conditionDelta + (Math.random() * .8 - .4), 15, 100),
        }])) as Record<FacilityKey, FacilityState>;
        let structure = facilitySummary({ ...company, facilities });
        let facilityIncidentCost = 0;
        const vulnerableFacilities = facilityKeys.filter((key) => facilities[key].level > 0).sort((a, b) => facilities[a].condition - facilities[b].condition);
        const facilityIncidentChance = clamp((100 - structure.averageCondition) * .0013 + (maintenanceMode === "economico" ? .018 : 0) - structure.securityProtection / 5000, .002, .11);
        if (vulnerableFacilities.length && Math.random() < facilityIncidentChance * eventPressure) {
          const affected = vulnerableFacilities[0];
          const severity = 7 + Math.round(Math.random() * 11);
          facilityIncidentCost = 6000 + facilities[affected].level * 5500 + severity * 700;
          facilities[affected] = { ...facilities[affected], condition: clamp(facilities[affected].condition - severity, 10, 100), incidents: facilities[affected].incidents + 1 };
          structure = facilitySummary({ ...company, facilities });
          weeklyNews.push({ id: Date.now() + company.id + 2290, week: nextWeek, category: "negocios", headline: `Falha em ${facilityDefinitions[affected].short.toLowerCase()} interrompe a ${company.name}`, body: `A condição da estrutura caiu para ${Math.round(facilities[affected].condition)}%. Reparos emergenciais custaram ${money.format(facilityIncidentCost)}. Segurança e manutenção preventiva poderiam reduzir esse risco.`, impact: "negativo" });
        }
        const delegated = company.ceo !== controlledExecutive;
        const executive = executives.find((item) => item.name === company.ceo);
        let ceoStyle = company.ceoStyle ?? executive?.style ?? "crescimento";
        const ceoDecisionWeek = delegated && (nextWeek + company.id) % 3 === 0;
        const ceoSpend = ceoDecisionWeek
          ? Math.min(
              company.ceoBudget ?? 15000,
              Math.max(0, company.cash - 35000),
            )
          : 0;
        const goalAchieved =
          company.ceoGoal === "lucro"
            ? cm.profit > 0
            : company.ceoGoal === "valor"
              ? cm.valuation >= 1000000
              : company.ceoGoal === "cultura"
                ? cm.morale >= 75
                : cm.revenue >= cm.costs * 1.15;
        let ceoTrust = clamp(
          (company.ceoTrust ?? 68) +
            (delegated ? (goalAchieved ? 0.9 : -0.7) : 0),
        );
        let ceoInfluence = clamp(
          (company.ceoInfluence ?? 20) +
            (delegated
              ? (company.autonomy === "independente" ? 1.2 : 0.45) +
                (goalAchieved ? 0.35 : 0)
              : -1.5),
        );
        let ceoLoyalty = delegated
          ? clamp(
              (company.ceoLoyalty ?? executive?.loyalty ?? 65) +
                (goalAchieved ? 0.7 : -0.45) +
                ((company.ceoBudget ?? 0) >= 20000 ? 0.25 : -0.2) +
                (company.autonomy === "independente" ? 0.35 : 0),
            )
          : 100;
        let ceoAmbition = delegated
          ? clamp(
              (company.ceoAmbition ?? executive?.ambition ?? 55) +
                (goalAchieved ? 0.35 : 0.1) +
                (company.autonomy === "independente" ? 0.25 : 0),
            )
          : 25;
        let ceoReputation = clamp(
          (company.ceoReputation ?? executive?.reputation ?? 60) +
            (delegated ? (goalAchieved ? 0.6 : -0.45) : 0),
        );
        let ceoDemandCooldown = Math.max(
          0,
          (company.ceoDemandCooldown ?? 0) - 1,
        );
        let ceoProductCooldown = Math.max(
          0,
          (company.ceoProductCooldown ?? 0) - 1,
        );
        let ceoHireCooldown = Math.max(
          0,
          (company.ceoHireCooldown ?? 0) - 1,
        );
        let ceoAllianceCompanyId = company.ceoAllianceCompanyId;
        let ceoRivalCompanyId = company.ceoRivalCompanyId;
        let ceoLastDecision =
          company.ceoLastDecision ?? "Consolidar a operação";
        let ceoHistory = company.ceoHistory ?? [];
        let ceoMemories = company.ceoMemories ?? [];
        let marketingCampaigns = company.marketingCampaigns ?? [];
        let directors = company.directors ?? [];
        let ceoHiddenIssue = company.ceoHiddenIssue;
        let ceoHiddenWeeks = Math.max(0, (company.ceoHiddenWeeks ?? 0) - 1);
        let ceoExtraCost = ceoSpend;
        let ceoCustomerBoost = 0,
          ceoProgressBoost = 0,
          ceoQualityBoost = 0,
          ceoMoraleBoost = 0,
          ceoStressRelief = 0,
          ceoEfficiencyGain = 0,
          ceoReputationBoost = 0,
          ceoBoardImpact = 0;
        const peopleDirectorStrength = directorStrength(directors, "pessoas");
        const operationsDirectorStrength = directorStrength(directors, "operacoes");
        const productDirectorStrength = directorStrength(directors, "produto");
        const commercialDirectorStrength = directorStrength(directors, "comercial");
        const directorStressRelief = peopleDirectorStrength > 0 ? Math.max(-.8, (peopleDirectorStrength - 42) / 18) : 0;
        const directorMoraleBoost = peopleDirectorStrength > 0 ? (peopleDirectorStrength - 45) / 45 : 0;
        const directorRelationBoost = peopleDirectorStrength > 0 ? (peopleDirectorStrength - 40) / 70 : 0;
        ceoProgressBoost += productDirectorStrength > 0 ? Math.max(-2, (productDirectorStrength - 42) / 9) : 0;
        ceoQualityBoost += productDirectorStrength > 0 ? Math.max(-1, (productDirectorStrength - 48) / 35) : 0;
        ceoCustomerBoost += commercialDirectorStrength > 0 ? Math.round(Math.max(-2, (commercialDirectorStrength - 48) / 18)) : 0;
        ceoReputationBoost += commercialDirectorStrength > 0 ? Math.max(-.7, (commercialDirectorStrength - 50) / 65) : 0;
        ceoEfficiencyGain += operationsDirectorStrength > 0 ? Math.max(-.012, (operationsDirectorStrength - 48) / 3200) : 0;
        ceoProgressBoost += structure.progressBoost;
        ceoQualityBoost += structure.qualityBoost;
        ceoEfficiencyGain += structure.efficiencyGain;
        directors = directors.map((director) => {
          const score = directorStrength([director], director.area);
          const review = (nextWeek + director.employeeId) % 6 === 0;
          const successful = score + Math.random() * 24 >= 62;
          if (review) weeklyNews.push({ id: Date.now() + director.employeeId + 2240, week: nextWeek, category: "pessoas", headline: successful ? `${director.name} ganha espaço na ${company.name}` : `${director.name} enfrenta resistência interna`, body: successful ? `A diretoria de ${directorAreaLabels[director.area].toLowerCase()} entregou resultados e fortaleceu o estilo ${director.style} de liderança.` : `Decisões da diretoria de ${directorAreaLabels[director.area].toLowerCase()} geraram conflito, retrabalho e dúvidas sobre sua autoridade.`, impact: successful ? "positivo" : "negativo" });
          return { ...director, weeks: (director.weeks ?? 0) + 1, trust: clamp(director.trust + (review ? successful ? 2 : -4 : .15)), authority: clamp(director.authority + (review ? successful ? 2 : -2 : .1)), lastAction: review ? successful ? "Conduziu uma iniciativa bem recebida pela equipe." : "Tomou uma decisão contestada por funcionários e pelo CEO." : director.lastAction };
        });
        if (ceoDecisionWeek) {
          if (ceoStyle === "crescimento") {
            const activeCampaignCount = marketingCampaigns.filter((campaign) => campaign.weeksLeft > 0).length;
            if (ceoSpend >= 5000 && activeCampaignCount < 2) {
              const audience: MarketingAudience = company.sector === "Tecnologia" || company.sector === "Agência" ? "nicho" : "massa";
              const forecast = marketingCampaignForecast(company, economyRoll.economy, current.competitors, ceoSpend, 3, audience, "aquisicao");
              const roll = Math.random() * 100;
              const outcome: MarketingCampaignOutcome = roll < forecast.probabilities.forte ? "forte" : roll < forecast.probabilities.forte + forecast.probabilities.moderado ? "moderado" : roll < forecast.probabilities.forte + forecast.probabilities.moderado + forecast.probabilities.ignorado ? "ignorado" : "negativo";
              const capacity = companyCommercialCapacity(company);
              const room = Math.max(0, capacity.customerCapacity - company.customers);
              const totalCustomerImpact = outcome === "forte" ? Math.max(1, Math.round(room * (.08 + forecast.budgetEfficiency * .14))) : outcome === "moderado" ? Math.max(0, Math.round(room * .065)) : outcome === "negativo" ? -Math.max(1, Math.round(company.customers * .025)) : 0;
              marketingCampaigns = [...marketingCampaigns, { id: `ceo-campaign-${company.id}-${nextWeek}`, name: `Expansão comercial de ${company.ceo}`, audience, objective: "aquisicao", totalBudget: ceoSpend, duration: 3, weeksLeft: 3, startedWeek: nextWeek, outcome, probabilities: forecast.probabilities, totalCustomerImpact, revenueMultiplier: outcome === "forte" ? 1.16 : outcome === "moderado" ? 1.065 : outcome === "ignorado" ? .995 : .93, totalReputationImpact: outcome === "forte" ? 4 : outcome === "moderado" ? 1 : outcome === "negativo" ? -5 : 0, revealed: false }];
              weeklyNews.push({ id: Date.now() + company.id + 2035, week: nextWeek, category: "negocios", headline: `${company.ceo} autoriza campanha na ${company.name}`, body: `O CEO comprometeu ${money.format(ceoSpend)} em uma campanha de três semanas para ${marketingAudienceLabels[audience].toLowerCase()}. A chance estimada de crescimento forte era ${forecast.probabilities.forte}%.`, impact: "neutro" });
              ceoLastDecision = "Lançou uma campanha de expansão com risco calculado";
            } else {
              ceoExtraCost -= ceoSpend;
              ceoLastDecision = "Adiou nova campanha para evitar saturação";
            }
          }
          if (ceoStyle === "eficiencia") {
            ceoEfficiencyGain = 0.018 + ceoSpend / 3000000;
            ceoMoraleBoost = -0.8;
            ceoLastDecision = "Revisou contratos e reduziu custos operacionais";
          }
          if (ceoStyle === "inovacao") {
            ceoProgressBoost = 5 + ceoSpend / 3500;
            ceoQualityBoost = 1.5 + ceoSpend / 12000;
            ceoLastDecision = "Priorizou produto, tecnologia e novas versões";
          }
          if (ceoStyle === "pessoas") {
            ceoMoraleBoost = 2 + ceoSpend / 9000;
            ceoStressRelief = 2 + ceoSpend / 10000;
            ceoReputationBoost = 0.6;
            ceoLastDecision = "Investiu em liderança, cultura e retenção";
          }
          const errorChance =
            0.11 +
            (company.autonomy === "independente" ? 0.045 : 0) +
            (ceoTrust < 40 ? 0.05 : 0) +
            (ceoLoyalty < 35 ? 0.04 : 0);
          if (Math.random() < errorChance) {
            if (!ceoHiddenIssue && Math.random() < 0.72) {
              const auditCase = createAuditCase(company, nextWeek);
              ceoHiddenIssue = auditCase.title;
              newAuditCases.push(auditCase);
              weeklyNews.push({
                id: Date.now() + company.id + 870,
                week: nextWeek,
                category: "pessoas",
                headline: `Canal de ética recebe denúncia na ${company.name}`,
                body: `O relato menciona ${auditCase.title.toLowerCase()} e aponta ${company.ceo} como responsável ou beneficiário. Ainda não há prova conclusiva.`,
                impact: "neutro",
              });
              ceoHiddenWeeks = 3 + Math.floor(Math.random() * 3);
              ceoLastDecision = "Reportou que o plano segue dentro do esperado";
            } else {
              ceoExtraCost += Math.round(18000 + Math.random() * 32000);
              ceoTrust = clamp(ceoTrust - 7);
              ceoBoardImpact -= 3;
              weeklyNews.push({
                id: Date.now() + company.id + 801,
                week: nextWeek,
                category: "negocios",
                headline: `${company.ceo} admite erro de gestão na ${company.name}`,
                body: "Uma decisão autônoma consumiu recursos acima do previsto. O conselho cobra explicações e novos controles.",
                impact: "negativo",
              });
            }
          }
          ceoHistory = [
            `Semana ${nextWeek}: ${ceoLastDecision}.`,
            ...ceoHistory,
          ].slice(0, 8);
          if (delegated && (goalAchieved || (company.ceoBudget ?? 0) < 10000)) {
            ceoMemories = addCharacterMemory(ceoMemories, characterMemory(
              nextWeek,
              "resultado",
              goalAchieved
                ? `Você manteve ${company.autonomy === "independente" ? "minha autonomia" : "o acordo de gestão"} enquanto eu entregava a meta da ${company.name}.`
                : `Você cobrou minha meta sem disponibilizar orçamento suficiente para executá-la.`,
              goalAchieved ? "orgulhoso" : "magoado",
              goalAchieved ? 5 : -7,
              goalAchieved ? 58 : 76,
            ));
          }
          ceoReputation = clamp(
            ceoReputation + (goalAchieved ? 1.4 : -0.8),
          );
        }
        if (company.ceoHiddenIssue && ceoHiddenWeeks === 0) {
          ceoExtraCost += 52000;
          ceoTrust = clamp(ceoTrust - 14);
          ceoInfluence = clamp(ceoInfluence - 8);
          ceoBoardImpact -= 8;
          ceoReputationBoost -= 3;
          weeklyNews.push({
            id: Date.now() + company.id + 802,
            week: nextWeek,
            category: "negocios",
            headline: `Problema ocultado por ${company.ceo} vem à tona na ${company.name}`,
            body: `${company.ceoHiddenIssue}. O fundador e o conselho só foram informados quando o impacto financeiro se tornou inevitável.`,
            impact: "negativo",
          });
          ceoLastDecision = `Precisou explicar: ${company.ceoHiddenIssue}`;
          ceoHiddenIssue = undefined;
        }
        if (
          delegated &&
          ceoInfluence > 78 &&
          ceoTrust < 45 &&
          ceoDecisionWeek &&
          Math.random() < 0.16 * eventPressure
        ) {
          ceoBoardImpact -= 7;
          weeklyNews.push({
            id: Date.now() + company.id + 803,
            week: nextWeek,
            category: "negocios",
            headline: `${company.ceo} confronta a holding sobre autonomia`,
            body: "O CEO afirma ter apoio da equipe e de parte do conselho para manter sua estratégia, mesmo contra a orientação do fundador.",
            impact: "negativo",
          });
        }
        const activePressure =
          company.projects
            .filter((p) => p.status === "ativo")
            .reduce((sum, p) => sum + p.risk, 0) /
          Math.max(
            1,
            company.projects.filter((p) => p.status === "ativo").length,
          );
        let productReputationImpact = 0;
        let productCustomerImpact = 0;
        let productEmergencyCost = 0;
        let nextProjects = company.projects.map((p) => {
          if (p.status === "concluido") {
            if (p.kind !== "produto" || p.lifecycle !== "mercado")
              return {
                ...p,
                lawsuitWeeks: Math.max(0, (p.lawsuitWeeks ?? 0) - 1),
              };
            const marketWeeks = (p.marketWeeks ?? 0) + 1;
            const marketStage =
              marketWeeks <= 5
                ? ("lancamento" as const)
                : marketWeeks <= 15
                  ? ("crescimento" as const)
                  : marketWeeks <= 30
                    ? ("maturidade" as const)
                    : ("declinio" as const);
            const decay =
              marketStage === "declinio"
                ? 0.45
                : marketStage === "maturidade"
                  ? 0.12
                  : 0;
            const complexity = p.complexity ?? 3;
            const support = (p.preparation?.suporte ?? 0) + (p.supportLevel ?? 0);
            let bugLevel = clamp((p.bugLevel ?? 0) + Math.max(0, (p.updateNeed ?? 0) - 55) * .035 - support * .8);
            let updateNeed = clamp((p.updateNeed ?? 0) + complexity * .65 + Math.max(0, bugLevel - 25) * .04 - support * .7);
            let customerSatisfaction = clamp((p.customerSatisfaction ?? 70) + (p.quality - 65) * .025 - bugLevel * .035 + support * .32);
            let feedback = p.feedback ?? [];
            if (Math.random() < .09 + bugLevel / 260) {
              const negative = Math.random() * 100 > customerSatisfaction;
              const rating = negative ? Math.max(1, Math.round(customerSatisfaction / 25)) : Math.min(5, 3 + Math.round(customerSatisfaction / 45));
              const texts = negative ? ["O produto prometeu mais do que entregou.", "Encontrei falhas e o suporte demorou a responder.", "A atualização deixou tudo mais instável.", "O preço não combina com a experiência."] : ["Resolveu um problema real sem complicação.", "A nova versão ficou melhor do que eu esperava.", "O suporte respondeu rápido e salvou a experiência.", "Já recomendei para outras pessoas."];
              feedback = [{ id: `feedback-${p.id}-${nextWeek}`, week: nextWeek, rating, text: texts[(nextWeek + p.id) % texts.length], tone: negative ? "negativo" as const : "positivo" as const }, ...feedback].slice(0, 8);
              customerSatisfaction = clamp(customerSatisfaction + (negative ? -2 : 1));
            }
            if (Math.random() < bugLevel / 900) {
              const severity = 6 + Math.round(Math.random() * 14);
              bugLevel = clamp(bugLevel + severity);
              updateNeed = clamp(updateNeed + severity * .7);
              customerSatisfaction = clamp(customerSatisfaction - severity * .35);
              productEmergencyCost += Math.round(severity * 900);
              productReputationImpact -= severity / 8;
              weeklyNews.push({ id: Date.now() + p.id + 2210, week: nextWeek, category: "negocios", headline: `${p.name} apresenta falha para clientes`, body: `O problema elevou os bugs para ${Math.round(bugLevel)}%, gerou custo emergencial de ${money.format(Math.round(severity * 900))} e aumentou a necessidade de atualização.`, impact: "negativo" });
            }
            return {
              ...p,
              marketWeeks,
              marketStage,
              quality: clamp(
                p.quality -
                  decay +
                  effectValue("productQualityDelta") +
                  ceoQualityBoost,
              ),
              bugLevel,
              updateNeed,
              customerSatisfaction,
              feedback,
              emergencyWeeks: Math.max(0, (p.emergencyWeeks ?? 0) - 1),
              lawsuitWeeks: Math.max(0, (p.lawsuitWeeks ?? 0) - 1),
            };
          }
          const riskProfile = p.kind === "produto" ? productRiskProfile(p, company) : null;
          if (p.kind === "produto" && (p.delayWeeks ?? 0) > 0) return { ...p, delayWeeks: Math.max(0, (p.delayWeeks ?? 0) - 1), risk: clamp(p.risk + 1) };
          const delayTriggered = Boolean(riskProfile && Math.random() < riskProfile.delayChance / 260);
          const setback = delayTriggered || Math.random() < p.risk / 650 ? 8 + Math.round(Math.random() * 13) : 0;
          const availableCount = company.employees.filter(
            (e) => (e.leaveWeeks ?? 0) <= 0,
          ).length;
          const roleBlocked = Boolean(riskProfile && riskProfile.complexity >= 4 && riskProfile.coverage.ratio < .5);
          const progress =
            p.progress +
            Math.round(
              cm.skill / 11 +
                availableCount * 1.35 -
                p.risk / 27 +
                ceoProgressBoost,
            ) -
            setback - (riskProfile?.teamShortage ?? 0) * 2.5 - (roleBlocked ? 9 : 0);
          if (delayTriggered && p.kind === "produto") weeklyNews.push({ id: Date.now() + p.id + 2200, week: nextWeek, category: "negocios", headline: `${p.name} sofre atraso no desenvolvimento`, body: `${riskProfile?.coverage.missing.length ? `Faltam competências de ${riskProfile.coverage.missing.join(" e ")}. ` : ""}A complexidade e a preparação atual criaram ${riskProfile?.delayChance}% de risco estimado de atraso.`, impact: "negativo" });
          return progress >= 100
            ? (() => {
                if (p.kind !== "produto") return {
                  ...p, progress: 100, status: "concluido" as const,
                };
                const launchRoll = Math.random() * 100;
                const failureChance = riskProfile?.failureChance ?? 35;
                const launchOutcome: Project["launchOutcome"] = launchRoll < failureChance * .22 ? "desastre" : launchRoll < failureChance ? "falha" : launchRoll < failureChance + 22 ? "morno" : "sucesso";
                const launchData = launchOutcome === "sucesso" ? { quality: 4, recurring: 1.08, bugs: 4, satisfaction: 82, reputation: 4, customers: 3, emergency: 0 } : launchOutcome === "morno" ? { quality: 0, recurring: .84, bugs: 12, satisfaction: 66, reputation: 0, customers: 0, emergency: 0 } : launchOutcome === "falha" ? { quality: -8, recurring: .58, bugs: 38, satisfaction: 43, reputation: -6, customers: -3, emergency: 3 } : { quality: -15, recurring: .3, bugs: 68, satisfaction: 24, reputation: -12, customers: -7, emergency: 5 };
                productReputationImpact += launchData.reputation;
                productCustomerImpact += launchData.customers;
                productEmergencyCost += launchData.emergency * 9000;
                weeklyNews.push({ id: Date.now() + p.id + 2190, week: nextWeek, category: "negocios", headline: launchOutcome === "sucesso" ? `${p.name} estreia acima das expectativas` : launchOutcome === "morno" ? `${p.name} chega ao mercado sem empolgar` : `${p.name} enfrenta ${launchOutcome === "desastre" ? "crise" : "problemas"} no lançamento`, body: `O produto tinha ${failureChance}% de chance estimada de falha. O lançamento terminou como ${launchOutcome}, com satisfação inicial de ${launchData.satisfaction}% e bugs em ${launchData.bugs}%.`, impact: launchOutcome === "sucesso" ? "positivo" : launchOutcome === "morno" ? "neutro" : "negativo" });
                return {
                ...p,
                progress: 100,
                status: "concluido" as const,
                lifecycle: "mercado" as const,
                marketStage: "lancamento" as const,
                marketWeeks: 0,
                productPrice: p.productPrice ?? company.price,
                productMarketing: p.productMarketing ?? 0,
                version: p.version ?? 1,
                patented: p.patented ?? false,
                rightsOwned: p.rightsOwned ?? 100,
                royaltyRevenue: p.royaltyRevenue ?? 0,
                launchOutcome,
                quality: clamp(p.quality + launchData.quality),
                recurring: Math.round((p.recurring ?? 9000) * launchData.recurring),
                bugLevel: launchData.bugs,
                customerSatisfaction: launchData.satisfaction,
                updateNeed: launchData.bugs * .55,
                supportLevel: p.supportLevel ?? 0,
                feedback: p.feedback ?? [],
                emergencyWeeks: launchData.emergency,
              };
              })()
            : {
                ...p,
                progress: Math.max(0, progress),
                quality: clamp(p.quality + cm.skill / 55 - setback / 4),
                risk: clamp(p.risk + (setback ? 7 : -1)),
                delayWeeks: delayTriggered ? 1 + Math.floor(Math.random() * 2) : Math.max(0, p.delayWeeks ?? 0),
              };
        });
        const productCadence =
          ceoStyle === "inovacao"
            ? 8
            : ceoStyle === "crescimento"
              ? 11
              : ceoStyle === "pessoas"
                ? 14
                : 16;
        const activeProduct = nextProjects.some(
          (project) => project.kind === "produto" && project.status === "ativo",
        );
        const liveProducts = nextProjects.filter(
          (project) =>
            project.kind === "produto" &&
            !["fora_de_linha", "direitos_vendidos"].includes(
              project.lifecycle ?? "desenvolvimento",
            ),
        ).length;
        const plannedCEOProduct = createCEOProduct(company, nextWeek, ceoStyle);
        const canCreateProduct =
          delegated &&
          (company.ceoTenure ?? 0) >= 5 &&
          ceoProductCooldown === 0 &&
          (company.ceoBudget ?? 0) >= 10000 &&
          !activeProduct &&
          liveProducts < 6 &&
          company.cash - ceoExtraCost >= plannedCEOProduct.budget + 45000 &&
          (nextWeek + company.id) % productCadence === 0;
        if (canCreateProduct && company.autonomy === "independente") {
          nextProjects = [...nextProjects, plannedCEOProduct];
          ceoExtraCost += plannedCEOProduct.budget;
          ceoProductCooldown = productCadence;
          ceoTrust = clamp(ceoTrust + 1);
          ceoInfluence = clamp(ceoInfluence + 2);
          ceoLastDecision = `Iniciou ${plannedCEOProduct.name} sem pedir autorização`;
          ceoHistory = [
            `Semana ${nextWeek}: iniciou autonomamente ${plannedCEOProduct.name} por ${money.format(plannedCEOProduct.budget)}.`,
            ...ceoHistory,
          ].slice(0, 8);
          weeklyNews.push({
            id: Date.now() + company.id + plannedCEOProduct.id,
            week: nextWeek,
            category: "negocios",
            headline: `${company.ceo} aposta em ${plannedCEOProduct.name} na ${company.name}`,
            body: `Com autonomia independente, o CEO iniciou um produto de ${money.format(plannedCEOProduct.budget)} sem votação da holding. A promessa é gerar até ${money.format(plannedCEOProduct.recurring ?? 0)} por semana depois do lançamento.`,
            impact: plannedCEOProduct.risk >= 50 ? "neutro" : "positivo",
          });
        } else if (
          canCreateProduct &&
          !ceoProposalMessage &&
          current.unread.length === 0
        ) {
          ceoProposalMessage = ceoProductProposalMessage(
            { ...company, ceoStyle },
            plannedCEOProduct,
          );
          ceoProductCooldown = 6;
          ceoLastDecision = `Apresentou a proposta ${plannedCEOProduct.name} à holding`;
          ceoHistory = [
            `Semana ${nextWeek}: solicitou aprovação para ${plannedCEOProduct.name}.`,
            ...ceoHistory,
          ].slice(0, 8);
        }
        const newlyCompleted = nextProjects.filter(
          (p, i) =>
            p.status === "concluido" &&
            company.projects[i]?.status !== "concluido",
        );
        if (company.id === current.activeCompanyId && newlyCompleted[0])
          completedName = newlyCompleted[0].name;
        const reward = newlyCompleted.reduce(
          (sum, p) => sum + Math.round(p.reward * (p.quality / 100)),
          0,
        );
        const rivalPressure =
          current.competitors
            .filter(
              (r) =>
                r.sector === company.sector &&
                !["fechada", "vendida"].includes(r.status),
            )
            .reduce(
              (sum, r) =>
                sum +
                (r.products ?? []).reduce(
                  (productSum, product) => productSum + product.quality,
                  0,
                ),
              0,
            ) / 8;
        const productRevenue = nextProjects.reduce(
          (sum, p) => sum + productWeeklyRevenue(p, rivalPressure),
          0,
        );
        const efficiencyGain =
          newlyCompleted.filter((p) => p.kind === "melhoria").length * 0.04;
        const campaignGain = newlyCompleted.some((p) => p.kind === "campanha")
          ? 6
          : Math.max(0, (company.campaignWeeks ?? 0) - 1);
        const marketingPulse = rollMarketingPulse({ ...company, marketingCampaigns }, cm, nextWeek);
        const runningMarketingCampaigns = marketingCampaigns.filter((campaign) => campaign.weeksLeft > 0);
        const newlyRevealedCampaign = runningMarketingCampaigns.find((campaign) => !campaign.revealed);
        const finishingCampaign = runningMarketingCampaigns.find((campaign) => campaign.weeksLeft === 1);
        const commercialCapacity = companyCommercialCapacity(company);
        const referencePrice = sectorData[company.sector].price;
        const pricePressure = Math.max(0, company.price / Math.max(1, referencePrice) - 1) * 5;
        const organicCustomerDelta = Math.round(
          (company.reputation / 38 -
            Math.max(0, 70 - cm.morale) / 10 -
            pricePressure +
            Math.random() * 3 - 1.2) *
            economyRoll.economy.demand +
            effectValue("customerDelta") +
            ceoCustomerBoost,
        );
        const capacityOverflow = Math.max(0, company.customers - commercialCapacity.customerCapacity);
        const serviceChurn = capacityOverflow > 0 ? Math.max(1, Math.round(capacityOverflow * .22)) : 0;
        const customerDelta = organicCustomerDelta + marketingPulse.customerDelta - serviceChurn + productCustomerImpact;
        if (newlyRevealedCampaign) {
          weeklyNews.push({
            id: Date.now() + company.id + 2065,
            week: nextWeek,
            category: "negocios",
            headline: newlyRevealedCampaign.outcome === "forte" ? `${newlyRevealedCampaign.name} começa acima das projeções` : newlyRevealedCampaign.outcome === "negativo" ? `${newlyRevealedCampaign.name} enfrenta rejeição inicial` : `${newlyRevealedCampaign.name} revela sua primeira resposta`,
            body: `Os primeiros sinais apontam ${marketingOutcomeLabels[newlyRevealedCampaign.outcome]}. O efeito completo do investimento de ${money.format(newlyRevealedCampaign.totalBudget)} continuará aparecendo por ${newlyRevealedCampaign.duration} semanas.`,
            impact: newlyRevealedCampaign.outcome === "forte" ? "positivo" : newlyRevealedCampaign.outcome === "negativo" ? "negativo" : "neutro",
          });
        } else if (finishingCampaign) {
          weeklyNews.push({ id: Date.now() + company.id + 2065, week: nextWeek, category: "negocios", headline: `${finishingCampaign.name} encerra sua circulação`, body: `A campanha terminou com ${marketingOutcomeLabels[finishingCampaign.outcome]}, impacto acumulado estimado de ${finishingCampaign.totalCustomerImpact >= 0 ? "+" : ""}${finishingCampaign.totalCustomerImpact} clientes e efeito de ${finishingCampaign.totalReputationImpact >= 0 ? "+" : ""}${finishingCampaign.totalReputationImpact} na reputação.`, impact: finishingCampaign.outcome === "forte" ? "positivo" : finishingCampaign.outcome === "negativo" ? "negativo" : "neutro" });
        } else if (!runningMarketingCampaigns.length && company.marketing > 0 && ["forte", "negativo"].includes(marketingPulse.outcome)) {
          weeklyNews.push({ id: Date.now() + company.id + 2065, week: nextWeek, category: "negocios", headline: marketingPulse.outcome === "forte" ? `Presença de marca da ${company.name} ganha tração` : `Comunicação rotineira da ${company.name} é rejeitada`, body: `${marketingPulse.detail} A verba semanal de ${money.format(company.marketing)} ${marketingPulse.customerDelta >= 0 ? "trouxe" : "custou"} ${Math.abs(marketingPulse.customerDelta)} cliente${Math.abs(marketingPulse.customerDelta) === 1 ? "" : "s"}.`, impact: marketingPulse.outcome === "forte" ? "positivo" : "negativo" });
        }
        if (serviceChurn > 0) {
          weeklyNews.push({
            id: Date.now() + company.id + 2066,
            week: nextWeek,
            category: "negocios",
            headline: `${company.name} perde clientes por operação sobrecarregada`,
            body: `A empresa atendia ${company.customers} clientes, acima da capacidade estimada de ${commercialCapacity.customerCapacity}. Reclamações e atrasos custaram ${serviceChurn} contrato${serviceChurn === 1 ? "" : "s"}.`,
            impact: "negativo",
          });
        }
        const evolvedEmployees = company.employees.map((e) => {
          const creditedProduct = newlyCompleted.find(
            (project) => project.proposedByEmployeeId === e.id,
          );
          const payGap = e.salary / Math.max(1, e.market);
          const onLeave = (e.leaveWeeks ?? 0) > 0;
          const workload =
            (activePressure / 34 +
            company.projects.filter((p) => p.status === "ativo").length * 1.05) * difficulty.stress;
          const naturalRecovery =
            company.projects.filter((p) => p.status === "ativo").length === 0
              ? 4
              : 1.6;
          const stress = onLeave
            ? Math.max(5, (e.stress ?? 25) - 15)
            : clamp(
                (e.stress ?? 25) +
                  workload +
                  (payGap < 0.9 ? 1.7 : -1.2) +
                  (economyRoll.economy.cycle === "recessao" ? 0.7 : 0) -
                  (company.culture === "Pessoas" ? 1.7 : 0) -
                  naturalRecovery,
              );
          const careerStagnation =
            (e.weeks ?? 0) > 18 &&
            !e.role.startsWith("Líder") &&
            !e.role.startsWith("Diretor")
              ? 2
              : 0;
          const employeeArea = e.department ?? inferDepartment(e.role);
          const areaDirector = directors.find((director) => director.area === employeeArea);
          const areaLeadership = areaDirector ? directorStrength([areaDirector], employeeArea) : 0;
          const localMoraleBoost = areaLeadership > 0 ? Math.max(-.5, (areaLeadership - 48) / 65) : 0;
          const evolvedSkill = clamp(e.skill + structure.skillGrowth);
          const evolvedTier = talentTierFor(evolvedSkill);
          if (evolvedTier !== (e.talentTier ?? talentTierFor(e.skill)) && ["senior", "elite"].includes(evolvedTier)) weeklyNews.push({ id: Date.now() + e.id + 2360, week: nextWeek, category: "pessoas", headline: `${e.name} alcança nível ${talentTierLabels[evolvedTier].toLowerCase()} na ${company.name}`, body: `Treinamento, experiência e projetos elevaram a competência de ${e.role.toLowerCase()} para ${Math.round(evolvedSkill)}. O mercado também passará a disputar esse profissional com mais força.`, impact: "positivo" });
          return {
            ...e,
            department: employeeArea,
            skill: evolvedSkill,
            talentTier: evolvedTier,
            weeks: (e.weeks ?? 0) + 1,
            leaveWeeks: Math.max(0, (e.leaveWeeks ?? 0) - 1),
            market: Math.round(
              e.market *
                (1 +
                  (economyRoll.economy.cycle === "inflacao" ? 0.004 : 0.001)),
            ),
            morale: clamp(
              e.morale +
                (onLeave ? 3 : 0) +
                (payGap >= 1 ? 0.5 : payGap < 0.9 ? -1.2 : -0.3) -
                Math.max(0, stress - 55) / 32 -
                careerStagnation +
                (Math.random() * 2 - 1) +
                effectValue("moraleDelta") +
                ceoMoraleBoost +
                directorMoraleBoost +
                localMoraleBoost +
                structure.moraleBoost -
                liquidityPressure * .7 +
                (creditedProduct ? 9 : 0),
            ),
            loyalty: clamp(
              e.loyalty +
                (company.culture === "Pessoas" ? 0.6 : 0) -
                careerStagnation -
                (stress > 82 ? 1 : 0) +
                structure.loyaltyBoost +
                (creditedProduct ? 7 : 0),
            ),
            relation: clamp(
              e.relation +
                (company.culture === "Pessoas" ? 0.5 : 0) +
                (Math.random() - 0.5) +
                directorRelationBoost +
                (creditedProduct ? 6 : 0),
            ),
            stress: clamp(
              stress + effectValue("stressDelta") + liquidityPressure - ceoStressRelief - directorStressRelief - structure.stressRelief,
            ),
            memories: creditedProduct
              ? addCharacterMemory(
                  e.memories,
                  characterMemory(
                    nextWeek,
                    "produto",
                    `Minha ideia, ${creditedProduct.name}, chegou ao mercado com meu nome ligado ao projeto.`,
                    "orgulhoso",
                    12,
                    90,
                  ),
                )
              : e.memories,
          };
        });
        let employees = evolvedEmployees.filter((e) => {
          const retentionEffect = clamp(1 - Math.max(0, peopleDirectorStrength - 45) / 110, .45, 1);
          const leaves =
            e.loyalty < 18 && (e.weeks ?? 0) > 8 && Math.random() < 0.24 * difficulty.departure * retentionEffect;
          if (leaves) {
            employerBrand = clamp(employerBrand - 2.2);
            weeklyNews.push({
              id: Date.now() + e.id,
              week: nextWeek,
              category: "pessoas",
              headline: `${e.name} deixa ${company.name} sem acordo`,
              body: `A saída de ${e.role.toLowerCase()} ocorre após semanas de desgaste e deve afetar projetos em andamento.`,
              impact: "negativo",
            });
            newStaffAlerts.push({ id: `staff-${company.id}-${e.id}-${nextWeek}`, companyId: company.id, companyName: company.name, employeeName: e.name, role: e.role, reason: "demissao", week: nextWeek, responsible: company.ceo ?? controlledExecutive, headcountAfter: Math.max(0, evolvedEmployees.length - 1) });
          }
          return !leaves;
        });
        if (delegated && company.autonomy === "independente" && employees.length > 3 && (nextWeek + company.id) % 24 === 0) {
          const directorIds = new Set(directors.map((director) => director.employeeId));
          const dismissal = [...employees].filter((employee) => !directorIds.has(employee.id)).sort((a, b) => a.skill + a.morale * .35 - (b.skill + b.morale * .35))[0];
          if (dismissal && (dismissal.skill < 58 || dismissal.morale < 30)) {
            employerBrand = clamp(employerBrand - 1.2);
            employees = employees.filter((employee) => employee.id !== dismissal.id);
            newStaffAlerts.push({ id: `staff-${company.id}-${dismissal.id}-${nextWeek}`, companyId: company.id, companyName: company.name, employeeName: dismissal.name, role: dismissal.role, reason: "desligamento", week: nextWeek, responsible: company.ceo ?? "CEO", headcountAfter: employees.length });
            ceoLastDecision = `Desligou ${dismissal.name} por baixo desempenho`;
            weeklyNews.push({ id: Date.now() + dismissal.id + 21, week: nextWeek, category: "pessoas", headline: `${company.ceo} desliga ${dismissal.name} da ${company.name}`, body: `O CEO usou sua autonomia para encerrar o vínculo por desempenho. A posição entrou em revisão para possível reposição.`, impact: "negativo" });
          }
        }
        if (
          employees.length > 1 &&
          activePressure > 64 &&
          Math.random() < 0.07 * eventPressure
        ) {
          const first = employees[Math.floor(Math.random() * employees.length)];
          const second = employees.find((e) => e.id !== first.id)!;
          first.morale = clamp(first.morale - 8);
          second.morale = clamp(second.morale - 8);
          first.relation = clamp(first.relation - 7);
          second.relation = clamp(second.relation - 7);
          weeklyNews.push({
            id: Date.now() + company.id,
            week: nextWeek,
            category: "pessoas",
            headline: `Conflito interno aumenta pressão na ${company.name}`,
            body: `${first.name} e ${second.name} divergiram sobre prioridades. A liderança terá de reconstruir a confiança.`,
            impact: "negativo",
          });
        }
        const activeProjectCount = nextProjects.filter((project) => project.status === "ativo").length;
        const marketProductCount = nextProjects.filter((project) => project.kind === "produto" && project.lifecycle === "mercado").length;
        const demandDivisor = company.sector === "Agência" ? 18 : company.sector === "Alimentação" ? 700 : company.sector === "Varejo" ? 450 : 180;
        const demandTeamSize = Math.min(10, Math.max(3, 2 + activeProjectCount * 2 + Math.floor(marketProductCount / 2) + Math.floor(company.customers / demandDivisor)));
        const previousWorkforceTarget = Math.max(company.workforceTarget ?? company.employees.length, company.employees.length);
        const replacementVacancy = employees.length < previousWorkforceTarget;
        const workforceTarget = Math.min(10, Math.max(3, previousWorkforceTarget, Math.min(demandTeamSize, employees.length + 1)));
        const averageStress = employees.length ? employees.reduce((sum, employee) => sum + (employee.stress ?? 0), 0) / employees.length : 100;
        const hireReason = replacementVacancy
          ? `A saída de um funcionário deixou ${previousWorkforceTarget - employees.length} vaga${previousWorkforceTarget - employees.length > 1 ? "s" : ""} aberta${previousWorkforceTarget - employees.length > 1 ? "s" : ""} no plano da equipe.`
          : employees.length < 3
          ? "A equipe ficou pequena demais para sustentar a operação."
          : averageStress > 58
            ? `O estresse médio chegou a ${Math.round(averageStress)}% e precisamos dividir a carga.`
            : activeProjectCount >= Math.max(1, Math.ceil(employees.length / 2))
              ? `Temos ${activeProjectCount} projetos ativos para uma equipe de ${employees.length} pessoas.`
              : "A demanda cresceu além da capacidade segura da equipe.";
        const plannedHire = createCEOHireCandidate({ ...company, employees }, nextWeek, ceoStyle);
        const ceoOnboardingCost = 2500 + (plannedHire.signingBonus ?? 0);
        const hiringReserve = replacementVacancy
          ? 15000 + plannedHire.salary * 2 + ceoOnboardingCost
          : 45000 + plannedHire.salary * 8 + ceoOnboardingCost;
        const hiringReviewDue = replacementVacancy
          ? true
          : (nextWeek + company.id) % (ceoStyle === "crescimento" ? 9 : ceoStyle === "pessoas" ? 10 : 12) === 0;
        const canHire =
          delegated &&
          (company.ceoTenure ?? 0) >= (replacementVacancy ? 0 : 4) &&
          (replacementVacancy || ceoHireCooldown === 0) &&
          employees.length < workforceTarget &&
          employees.length < 10 &&
          company.cash - ceoExtraCost >= hiringReserve &&
          (cm.profit >= -plannedHire.salary || replacementVacancy || employees.length < 3) &&
          (replacementVacancy || averageStress > 58 || activeProjectCount >= Math.max(1, Math.ceil(employees.length / 2)) || employees.length < 3) &&
          hiringReviewDue;
        if (canHire && company.autonomy === "independente") {
          const badHireChance = .08 + (ceoTrust < 45 ? .08 : 0) + (ceoStyle === "crescimento" ? .03 : 0);
          const badHire = Math.random() < badHireChance;
          const autonomousHire = {
            ...plannedHire,
            department: plannedHire.department ?? inferDepartment(plannedHire.role),
            skill: badHire ? Math.max(48, plannedHire.skill - 22) : plannedHire.skill,
            morale: badHire ? 64 : plannedHire.morale,
            loyalty: badHire ? 45 : plannedHire.loyalty,
            trait: badHire ? "Boa entrevista, execução incerta" : plannedHire.trait,
            memories: [characterMemory(nextWeek, "contratacao", `${company.ceo} me contratou com autonomia para reforçar a ${company.name}.`, "confiante", 4, 70)],
          };
          employees = [...employees, autonomousHire];
          employerBrand = clamp(employerBrand + (badHire ? -.5 : .7));
          ceoExtraCost += ceoOnboardingCost;
          ceoHireCooldown = replacementVacancy ? 8 : 12;
          ceoInfluence = clamp(ceoInfluence + 1);
          ceoTrust = clamp(ceoTrust + (badHire ? -3 : 1));
          ceoLastDecision = `Contratou ${autonomousHire.name} para ${autonomousHire.role}`;
          ceoHistory = [`Semana ${nextWeek}: contratou ${autonomousHire.name} para ${autonomousHire.role} por ${money.format(autonomousHire.salary)} mensais.`, ...ceoHistory].slice(0, 8);
          weeklyNews.push({
            id: Date.now() + company.id + autonomousHire.id,
            week: nextWeek,
            category: "pessoas",
            headline: `${company.ceo} reforça a equipe da ${company.name}`,
            body: `${hireReason} Com autonomia independente, o CEO contratou ${autonomousHire.name} para ${autonomousHire.role} por ${money.format(autonomousHire.salary)} mensais.${badHire ? " Nos bastidores, alguns gestores questionam se a boa entrevista se converterá em entrega." : " A equipe recebeu o reforço com expectativa positiva."}`,
            impact: badHire ? "neutro" : "positivo",
          });
        } else if (
          canHire &&
          (company.autonomy === "supervisionada" || (company.autonomy === "centralizada" && replacementVacancy)) &&
          !ceoProposalMessage &&
          current.unread.length === 0
        ) {
          ceoProposalMessage = ceoHireProposalMessage({ ...company, ceoStyle }, plannedHire, hireReason);
          ceoHireCooldown = 5;
          ceoLastDecision = `Solicitou autorização para contratar ${plannedHire.name}`;
          ceoHistory = [`Semana ${nextWeek}: pediu reforço para ${plannedHire.role}.`, ...ceoHistory].slice(0, 8);
        }
        const exposedProduct = nextProjects.find(
          (p) =>
            p.kind === "produto" &&
            p.lifecycle === "mercado" &&
            !p.patented &&
            (p.lawsuitWeeks ?? 0) === 0 &&
            p.quality > 62,
        );
        if (exposedProduct && Math.random() < 0.018 * eventPressure) {
          exposedProduct.lawsuitWeeks = 5;
          exposedProduct.legalOpponent =
            current.competitors.find(
              (r) =>
                r.sector === company.sector &&
                !["fechada", "vendida"].includes(r.status),
            )?.name ?? "Consórcio de Tecnologia";
          weeklyNews.push({
            id: Date.now() + company.id + exposedProduct.id,
            week: nextWeek,
            category: "negocios",
            headline: `${company.name} enfrenta disputa sobre ${exposedProduct.name}`,
            body: `${exposedProduct.legalOpponent} alega semelhanças comerciais e pede indenização. A ausência de patente aumenta a incerteza jurídica.`,
            impact: "negativo",
          });
        }
        directors = directors.filter((director) => employees.some((employee) => employee.id === director.employeeId));
        const evolvedMorale = employees.length ? employees.reduce((sum, employee) => sum + employee.morale, 0) / employees.length : 40;
        const evolvedStress = employees.length ? employees.reduce((sum, employee) => sum + (employee.stress ?? 25), 0) / employees.length : 80;
        employerBrand = clamp(employerBrand + (evolvedMorale - 62) / 90 - Math.max(0, evolvedStress - 65) / 120 + structure.facilities.beneficios.level * .06 + structure.facilities.treinamento.level * .04 + (company.reputation - employerBrand) / 500);
        const legalCost = nextProjects.reduce(
          (sum, p) => sum + ((p.lawsuitWeeks ?? 0) > 0 ? 9000 : 0),
          0,
        );
        const autonomyEffect =
          company.autonomy === "independente"
            ? Math.round(Math.random() * 10000 - 2500)
            : company.autonomy === "supervisionada"
              ? Math.round(Math.random() * 5000)
              : 0;
        const sharedSavings = company.sharedServices ? 2800 : 0;
        const grossCash =
          company.cash +
          cm.profit +
          reward +
          autonomyEffect +
          sharedSavings -
          legalCost -
          productEmergencyCost -
          facilityIncidentCost -
          ceoExtraCost;
        const dividend =
          cm.profit > 0 && (company.dividendRate ?? 0) > 0
            ? Math.min(
                Math.max(0, grossCash - cm.requiredReserve),
                Math.round((cm.profit * (company.dividendRate ?? 0)) / 100),
              )
            : 0;
        holdingDividends += dividend;
        const nextCash = grossCash - dividend;
        const valuationNow = companyMetrics(
          { ...company, cash: nextCash, projects: nextProjects, employees },
          economyRoll.economy,
        ).valuation;
        const investors = (company.investors ?? []).map((investor) => {
          if (nextWeek < investor.deadline) return investor;
          const achieved =
            investor.target === "receita"
              ? cm.revenue >= investor.targetValue
              : investor.target === "valor"
                ? valuationNow >= investor.targetValue
                : cm.profit >= investor.targetValue;
          const support = clamp(
            investor.support +
              (achieved ? 13 : -18) +
              (company.reputation > 65 ? 3 : 0),
          );
          weeklyNews.push({
            id: Date.now() + company.id + investor.providerId.length,
            week: nextWeek,
            category: "negocios",
            headline: achieved
              ? `${investor.name} confirma apoio à gestão da ${company.name}`
              : `${investor.name} cobra mudança de rumo na ${company.name}`,
            body: achieved
              ? "A meta contratual foi atingida e o conselho renovou sua confiança na administração."
              : "O desempenho ficou abaixo do contrato. Investidores discutem cortes, nova estratégia e até substituição do CEO.",
            impact: achieved ? "positivo" : "negativo",
          });
          return {
            ...investor,
            support,
            lastReview: nextWeek,
            deadline: nextWeek + 10,
            targetValue: Math.round(investor.targetValue * 1.18),
          };
        });
        const investorWeight = investors.reduce(
          (sum, i) => sum + (i.equity * (i.support - 50)) / 50,
          0,
        );
        const founderWeight =
          (company.founderEquity ?? 100) *
          ((cm.profit >= 0 ? 1 : -0.65) + company.reputation / 140);
        let boardSupport = clamp(
          50 +
            (founderWeight + investorWeight) / 3.2 -
            (nextCash < 0 ? 12 : 0) +
            effectValue("boardDelta") +
            ceoBoardImpact,
        );
        let ceo = company.ceo ?? controlledExecutive;
        if (
          ceo === controlledExecutive &&
          boardSupport < 24 &&
          investors.some((i) => i.boardSeats > 0) &&
          Math.random() < 0.38
        ) {
          const replacement =
            executives[Math.floor(Math.random() * executives.length)];
          ceo = replacement.name;
          ceoStyle = replacement.style;
          ceoTrust = 58;
          ceoInfluence = 25;
          ceoHiddenIssue = undefined;
          ceoHiddenWeeks = 0;
          ceoLoyalty = replacement.loyalty;
          ceoAmbition = replacement.ambition;
          ceoReputation = replacement.reputation;
          ceoDemandCooldown = 8;
          ceoMemories = [];
          boardSupport = 48;
          weeklyNews.push({
            id: Date.now() + company.id + 500,
            week: nextWeek,
            category: "negocios",
            headline: `Conselho afasta ${controlledExecutive} do cargo de CEO da ${company.name}`,
            body: `${ceo} assume a gestão após uma votação tensa. A liderança da geração atual perde o comando operacional, mas preserva sua posição familiar.`,
            impact: "negativo",
          });
        }
        if (
          delegated &&
          ceoLoyalty < 18 &&
          ceo === company.ceo &&
          Math.random() < 0.28
        ) {
          const replacement = executives.find((item) => item.name !== ceo)!;
          const formerCEO = ceo;
          ceo = replacement.name;
          ceoStyle = replacement.style;
          ceoTrust = 55;
          ceoInfluence = 16;
          ceoLoyalty = replacement.loyalty;
          ceoAmbition = replacement.ambition;
          ceoReputation = replacement.reputation;
          ceoDemandCooldown = 8;
          ceoMemories = [characterMemory(
            nextWeek,
            "contratacao",
            `A holding me chamou para reconstruir a ${company.name} após a saída de ${formerCEO}.`,
            "cauteloso",
            1,
            64,
          )];
          ceoAllianceCompanyId = undefined;
          ceoRivalCompanyId = undefined;
          ceoLastDecision = `${replacement.name} assumiu após a saída de ${formerCEO}`;
          weeklyNews.push({
            id: Date.now() + company.id + 760,
            week: nextWeek,
            category: "pessoas",
            headline: `${formerCEO} deixa a ${company.name} e aceita proposta externa`,
            body: `${replacement.name} assume a operação. A troca repentina reduz a continuidade da estratégia e expõe a disputa interna da holding.`,
            impact: "negativo",
          });
        }
        if (delegated && nextWeek % 7 === company.id % 7) {
          const peer = current.companies.find(
            (candidate) =>
              candidate.id !== company.id &&
              candidate.ceo !== controlledExecutive &&
              !candidate.sold &&
              !candidate.bankrupt &&
              !candidate.closed,
          );
          if (peer) {
            const allied =
              peer.ceoStyle === ceoStyle ||
              ceoStyle === "pessoas" ||
              peer.ceoStyle === "pessoas";
            ceoAllianceCompanyId = allied ? peer.id : undefined;
            ceoRivalCompanyId = allied ? undefined : peer.id;
            if (company.id < peer.id)
              weeklyNews.push({
                id: Date.now() + company.id + peer.id + 880,
                week: nextWeek,
                category: "negocios",
                headline: allied
                  ? `${ceo} e ${peer.ceo} formam uma aliança interna`
                  : `${ceo} e ${peer.ceo} disputam recursos da holding`,
                body: allied
                  ? `Os CEOs da ${company.name} e da ${peer.name} passaram a defender projetos em conjunto no conselho.`
                  : `Metas concorrentes transformaram orçamento, talentos e influência em uma disputa aberta entre as subsidiárias.`,
                impact: allied ? "positivo" : "negativo",
              });
          }
        }
        const publicIdentity = current.leadershipIdentity ?? initialLeadershipIdentity;
        let partners = (company.partners ?? createBusinessPartners(company.sector, company.id)).map((partner) => {
          if (partner.status === "encerrado") return partner;
          if (partner.status === "proposta" && nextWeek > (partner.proposalExpiresWeek ?? nextWeek + 1)) return { ...partner, status: "encerrado" as const, lastEvent: "A proposta expirou sem resposta e a contraparte procurou outra empresa." };
          if (["negociacao", "proposta", "disputa"].includes(partner.status)) {
            if (!delegated || (company.ceoTenure ?? 0) < 2) return partner;
            const strategy: PartnerStrategy = ceoStyle === "pessoas"
              ? "relacionamento"
              : ceoStyle === "eficiencia" && partner.kind === "fornecedor"
                ? "pressionar"
                : ceoStyle === "crescimento" && partner.kind === "cliente"
                  ? "pressionar"
                  : partner.status === "proposta" && (partner.proposalType === "exclusividade" || partner.personality === "inovador")
                    ? "aceitar"
                    : "equilibrio";
            const power = clamp((company.ceoReputation ?? 60) * .3 + (company.ceoTrust ?? 60) * .2 + partner.trust * .25 + company.reputation * .15 + (strategy === "pressionar" ? company.ceoAmbition ?? 50 : company.ceoLoyalty ?? 60) * .1);
            if (company.autonomy === "independente" && (nextWeek + partner.id.length) % 3 === 0) {
              const negotiated = resolvePartnerStrategy(partner, strategy, power, company.ceo ?? "CEO", nextWeek);
              weeklyNews.push({ id: Date.now() + partner.id.length * 47, week: nextWeek, category: "negocios", headline: `${company.ceo} negocia ${partner.kind === "cliente" ? "conta" : "fornecimento"} com ${partner.name}`, body: `${company.ceo} escolheu ${strategy} com poder de barganha estimado em ${Math.round(power)}%. ${negotiated.lastEvent}`, impact: negotiated.status === "disputa" ? "negativo" : "positivo" });
              ceoLastDecision = `${strategy} com ${partner.name}`;
              return negotiated;
            }
            if (!ceoProposalMessage && current.unread.length === 0 && (nextWeek + partner.id.length) % 3 === 0) ceoProposalMessage = ceoContractProposalMessage({ ...company, ceoStyle }, partner, strategy, power);
            return partner;
          }
          const weeksLeft = Math.max(0, partner.weeksLeft - 1);
          const identityTrust = partner.kind === "cliente"
            ? (publicIdentity.integridade - 50) / 180 + (publicIdentity.visao - 50) / 260
            : (publicIdentity.negociacao - 50) / 240 + (publicIdentity.prudencia - 50) / 220;
          if (partner.trust < 30 && Math.random() < 0.1 * eventPressure) {
            const disputeLevel = clamp(30 + partner.dependency * .45);
            weeklyNews.push({ id: Date.now() + partner.id.length * 73, week: nextWeek, category: "negocios", headline: `${partner.name} abre disputa contratual com ${company.name}`, body: `A confiança caiu para ${Math.round(partner.trust)}%. A contraparte contesta preço, prazo ou escopo e ameaça suspender o acordo.`, impact: "negativo" });
            return { ...partner, status: "disputa" as const, weeksLeft: 0, disputeLevel, disputeReason: partner.kind === "cliente" ? "O cliente contesta entregas e exige desconto antes de renovar." : "O fornecedor exige reajuste e ameaça interromper o fornecimento.", lastEvent: "A baixa confiança transformou a renovação em disputa contratual." };
          }
          if (partner.personality === "oportunista" && nextWeek % 8 === company.id % 8 && ["inflacao", "recessao", "credito"].includes(economyRoll.economy.cycle)) {
            const weeklyValue = Math.round(partner.weeklyValue * (partner.kind === "fornecedor" ? 1.08 : .94));
            return { ...partner, weeksLeft, weeklyValue, trust: clamp(partner.trust - 3 + identityTrust), lastEvent: partner.kind === "fornecedor" ? "A contraparte usou a crise para elevar preços." : "O cliente reduziu o contrato durante a crise." };
          }
          if (weeksLeft === 0) {
            weeklyNews.push({
              id: Date.now() + company.id + partner.id.length * 31,
              week: nextWeek,
              category: "negocios",
              headline: `${partner.name} coloca contrato com ${company.name} em renegociação`,
              body: `${partner.representative} quer rever valores e garantias. O contrato deixou de gerar efeitos até um novo acordo.`,
              impact: "neutro",
            });
            return { ...partner, weeksLeft: 0, status: "negociacao" as const, lastEvent: "Contrato venceu e aguarda uma nova negociação." };
          }
          return { ...partner, weeksLeft, trust: clamp(partner.trust + identityTrust) };
        });
        const openPartnerCount = partners.filter((partner) => partner.status !== "encerrado").length;
        if (openPartnerCount < 7 && (nextWeek + company.id) % 13 === 0) {
          const kind: BusinessPartner["kind"] = (nextWeek + company.id) % 2 === 0 ? "cliente" : "fornecedor";
          const proposal = createPartnerProposal({ ...company, partners }, nextWeek, kind);
          const proposalPower = clamp((company.ceoReputation ?? company.reputation) * .35 + proposal.trust * .3 + (company.ceoTrust ?? 60) * .2 + company.reputation * .15);
          const suggested: PartnerStrategy = ceoStyle === "crescimento" && kind === "cliente" ? "aceitar" : ceoStyle === "eficiencia" && kind === "fornecedor" ? "pressionar" : ceoStyle === "pessoas" ? "relacionamento" : "equilibrio";
          if (delegated && company.autonomy === "independente") {
            const negotiated = resolvePartnerStrategy(proposal, suggested, proposalPower, company.ceo ?? "CEO", nextWeek);
            partners = [...partners, negotiated];
            weeklyNews.push({ id: Date.now() + company.id + 2040, week: nextWeek, category: "negocios", headline: `${proposal.name} procura a ${company.name} com nova proposta`, body: `${company.ceo} negociou diretamente e escolheu ${suggested}. ${negotiated.lastEvent}`, impact: negotiated.status === "disputa" ? "negativo" : "positivo" });
          } else {
            partners = [...partners, proposal];
            weeklyNews.push({ id: Date.now() + company.id + 2050, week: nextWeek, category: "negocios", headline: `${proposal.name} apresenta proposta à ${company.name}`, body: `${proposal.representative} oferece ${kind === "cliente" ? "receita" : "fornecimento"} de ${money.format(proposal.proposedValue ?? proposal.weeklyValue)} por semana. A oferta expira em quatro semanas.`, impact: "neutro" });
            if (!ceoProposalMessage && current.unread.length === 0) ceoProposalMessage = ceoContractProposalMessage({ ...company, partners, ceoStyle, ceo: company.ceo ?? controlledExecutive }, proposal, suggested, proposalPower);
          }
        }
        return {
          ...company,
          cash: nextCash,
          customers: Math.max(1, Math.min(Math.round(commercialCapacity.customerCapacity * 1.08), company.customers + customerDelta)),
          reputation: clamp(
            company.reputation +
              newlyCompleted.length * 7 +
              (nextCash < -50000 ? -3 : 0) +
              (delegated && company.autonomy === "independente"
                ? Math.random() < 0.55
                  ? 1
                  : -1
                : 0) +
              effectValue("reputationDelta") +
              (marketingPulse.reputationDelta ?? 0) +
              productReputationImpact +
              ceoReputationBoost -
              liquidityPressure * .18 +
              (nextWeek % 4 === company.id % 4 ? structure.reputationBoost : 0),
          ),
          productRevenue,
          marketingMultiplier: runningMarketingCampaigns.length ? 1 : marketingPulse.multiplier,
          marketingPulse,
          marketingCampaigns: marketingCampaigns.map((campaign) => campaign.weeksLeft > 0 ? { ...campaign, weeksLeft: campaign.weeksLeft - 1, revealed: true } : campaign).filter((campaign) => campaign.weeksLeft > 0 || nextWeek - campaign.startedWeek <= 12),
          directors,
          facilities,
          facilityMaintenanceMode: maintenanceMode,
          employerBrand,
          rejectedCandidates: (company.rejectedCandidates ?? []).filter((candidate) => candidate.untilWeek > nextWeek),
          efficiency: Math.max(
            0.68,
            (company.efficiency ?? 1) - efficiencyGain - ceoEfficiencyGain,
          ),
          campaignWeeks: campaignGain,
          projects: nextProjects,
          employees,
          investors,
          boardSupport,
          ceo,
          ceoStyle,
          ceoTrust,
          ceoInfluence,
          ceoLoyalty,
          ceoAmbition,
          ceoReputation,
          ceoDemandCooldown,
          ceoProductCooldown,
          ceoHireCooldown,
          workforceTarget,
          ceoAllianceCompanyId,
          ceoRivalCompanyId,
          ceoTenure: delegated ? (company.ceoTenure ?? 0) + 1 : 0,
          ceoLastDecision,
          ceoHiddenIssue,
          ceoHiddenWeeks,
          ceoHistory,
          ceoMemories,
          partners,
          effects: activeEffects
            .map((effect) => ({ ...effect, weeksLeft: effect.weeksLeft - 1 }))
            .filter((effect) => effect.weeksLeft > 0),
          history: [...company.history, nextCash].slice(-20),
        };
      });

      const holdingOperations = companies.filter((company) => !company.sold && !company.bankrupt && !company.closed);
      const holdingOverhead = holdingOperations.length > 1 ? Math.round(5000 * Math.pow(holdingOperations.length - 1, 1.45)) : 0;
      if (holdingOverhead > 0) {
        const totalOperatingRevenue = Math.max(1, holdingOperations.reduce((sum, company) => sum + companyMetrics(company, economyRoll.economy).revenue, 0));
        companies = companies.map((company) => {
          if (company.sold || company.bankrupt || company.closed) return company;
          const share = companyMetrics(company, economyRoll.economy).revenue / totalOperatingRevenue;
          return { ...company, cash: company.cash - Math.round(holdingOverhead * share) };
        });
        if (nextWeek % 13 === 0) weeklyNews.push({ id: Date.now() + 2335, week: nextWeek, category: "economia", headline: `${current.holdingName} sente o custo de coordenar ${holdingOperations.length} empresas`, body: `Conselho, auditoria, sistemas compartilhados e governança consumiram ${money.format(holdingOverhead)} nesta semana. Abrir ou adquirir subsidiárias agora aumenta a complexidade da holding.`, impact: "neutro" });
      }

      let auditCases = [...(current.auditCases ?? []), ...newAuditCases].map(
        (auditCase) => {
          const companyBefore = current.companies.find(
            (company) => company.id === auditCase.companyId,
          );
          const companyAfter = companies.find(
            (company) => company.id === auditCase.companyId,
          );
          if (
            auditCase.status === "suspeita" &&
            companyBefore?.ceoHiddenIssue === auditCase.title &&
            !companyAfter?.ceoHiddenIssue
          ) {
            return {
              ...auditCase,
              status: "comprovada" as const,
              evidence: Math.max(82, auditCase.evidence),
              outcome: "O problema tornou-se público antes da conclusão da auditoria.",
            };
          }
          if (auditCase.status === "investigando") {
            const weeksLeft = Math.max(0, auditCase.weeksLeft - 1);
            const evidence = clamp(auditCase.evidence + 18 + Math.random() * 18);
            if (weeksLeft === 0) {
              const proven = evidence >= 52;
              weeklyNews.push({
                id: Date.now() + auditCase.companyId + 910,
                week: nextWeek,
                category: "negocios",
                headline: proven
                  ? `Investigação confirma: ${auditCase.title}`
                  : `Investigação sobre ${auditCase.title.toLowerCase()} é inconclusiva`,
                body: proven
                  ? `As evidências vinculam ${auditCase.suspect} às irregularidades. A holding precisa decidir a consequência.`
                  : "Os controles foram reforçados, mas não surgiram provas suficientes para responsabilização.",
                impact: proven ? "negativo" : "neutro",
              });
              return {
                ...auditCase,
                weeksLeft,
                evidence: Math.round(evidence),
                status: proven ? "comprovada" as const : "encerrada" as const,
                outcome: proven
                  ? "Irregularidade comprovada; aguardando decisão."
                  : "Investigação encerrada sem prova conclusiva.",
              };
            }
            return { ...auditCase, weeksLeft, evidence: Math.round(evidence) };
          }
          const leakChance =
            auditCase.status === "acobertada"
              ? auditCase.exposureRisk / 650
              : auditCase.status === "suspeita" && nextWeek - auditCase.openedWeek > 3
                ? auditCase.exposureRisk / 1800
                : 0;
          if (leakChance > 0 && Math.random() < leakChance) {
            companies = companies.map((company) =>
              company.id === auditCase.companyId
                ? {
                    ...company,
                    cash: company.cash - auditCase.potentialLoss,
                    reputation: clamp(company.reputation - 11),
                    boardSupport: clamp((company.boardSupport ?? 50) - 13),
                    ceoTrust: clamp((company.ceoTrust ?? 60) - 20),
                    ceoLoyalty: clamp((company.ceoLoyalty ?? 60) - 12),
                  }
                : company,
            );
            weeklyNews.push({
              id: Date.now() + auditCase.companyId + 940,
              week: nextWeek,
              category: "negocios",
              headline: `Escândalo expõe ${auditCase.title.toLowerCase()}`,
              body: `O caso envolvendo ${auditCase.suspect} chegou à imprensa. A empresa perde ${money.format(auditCase.potentialLoss)} entre multas, correções e contratos cancelados.`,
              impact: "negativo",
            });
            return {
              ...auditCase,
              status: "comprovada" as const,
              evidence: 100,
              outcome: "O caso vazou e provocou perdas públicas.",
            };
          }
          return auditCase;
        },
      );
      auditCases = auditCases
        .sort((a, b) => b.openedWeek - a.openedWeek)
        .slice(0, 30);

      let competitors = current.competitors.map((rival) => {
        if (rival.status === "fechada" || rival.status === "vendida")
          return rival;
        const shock = Math.random();
        const age = (rival.age ?? 0) + 1;
        const cycleEffect =
          economyRoll.economy.cycle === "recessao"
            ? -1.2
            : economyRoll.economy.cycle === "expansao"
              ? 1.2
              : 0;
        const personalityEffect =
          rival.personality === "agressivo"
            ? Math.random() * 4 - 1.5
            : rival.personality === "conservador"
              ? Math.random() * 1.8 - 0.4
              : rival.personality === "visionário"
                ? Math.random() * 3.5 - 1
                : Math.random() * 2.5 - 0.7;
        const partnershipEffect =
          rival.relationship === "parceiro"
            ? 1
            : rival.relationship === "rival"
              ? -0.4
              : 0;
        let change = Math.round(
          personalityEffect + cycleEffect + partnershipEffect + difficulty.rival,
        );
        let cash =
          (rival.cash ?? 180000) +
          Math.round(
            rival.score * 2100 * economyRoll.economy.demand +
              (rival.products ?? []).reduce(
                (sum, p) => sum + p.quality * 180,
                0,
              ) -
              (56000 + rival.score * 850) * economyRoll.economy.costs,
          );
        let products = (rival.products ?? []).map((product) => {
          if (Math.random() > 0.08) return product;
          const nextStage =
            product.stage === "lançamento"
              ? "crescimento"
              : product.stage === "crescimento"
                ? "maduro"
                : product.stage === "maduro"
                  ? "declínio"
                  : "declínio";
          return { ...product, stage: nextStage as typeof product.stage };
        });
        let lastDecision = rival.lastDecision ?? "Manter posição";
        let history = rival.history ?? [];
        if (Math.random() < 0.24) {
          const decisionRoll = Math.random();
          if (cash > 170000 && decisionRoll < 0.28) {
            const product = {
              id: Date.now() + rival.id,
              name: rivalProductName(rival.sector, Math.random()),
              quality: 48 + Math.round(Math.random() * 35),
              stage: "lançamento" as const,
            };
            products = [...products, product].slice(-4);
            cash -= 65000;
            change += 3;
            lastDecision = `Lançou ${product.name}`;
            history = [
              `Semana ${nextWeek}: lançou ${product.name}.`,
              ...history,
            ].slice(0, 8);
            weeklyNews.push({
              id: Date.now() + rival.id + 12,
              week: nextWeek,
              category: "mercado",
              headline: `${rival.name} lança ${product.name}`,
              body: `${rival.founder} aposta que o novo produto ampliará a participação da empresa no setor.`,
              impact: "neutro",
            });
          } else if (decisionRoll < 0.55 && cash > 70000) {
            cash -= 32000;
            change += 2;
            lastDecision = "Aumentou investimento em marca e aquisição";
            history = [
              `Semana ${nextWeek}: iniciou uma campanha de crescimento.`,
              ...history,
            ].slice(0, 8);
          } else if (cash < 80000 || decisionRoll < 0.78) {
            cash += 26000;
            change -= 1;
            lastDecision = "Cortou custos para proteger o caixa";
            history = [
              `Semana ${nextWeek}: reduziu despesas e desacelerou a expansão.`,
              ...history,
            ].slice(0, 8);
          } else {
            change += 1;
            lastDecision =
              "Contratou lideranças para profissionalizar a gestão";
            history = [
              `Semana ${nextWeek}: reforçou sua equipe executiva.`,
              ...history,
            ].slice(0, 8);
          }
        }
        const relation = clamp(
          (rival.relation ?? 0) +
            (rival.relationship === "parceiro"
              ? 0.4
              : rival.relationship === "rival"
                ? -0.35
                : 0),
          -100,
          100,
        );
        const score = clamp(rival.score + change, 4, 99);
        const status =
          score < 17 || cash < -80000
            ? ("crise" as const)
            : change > 1
              ? ("crescendo" as const)
              : ("estavel" as const);
        const crisisWeeks =
          status === "crise"
            ? (rival.crisisWeeks ?? 0) + 1
            : Math.max(0, (rival.crisisWeeks ?? 0) - 2);
        if (rival.relationship === "rival" && shock < 0.035 * difficulty.departure * eventPressure) {
          const playerCompany = companies.find(
            (c) =>
              c.sector === rival.sector && !c.sold && !c.bankrupt && !c.closed,
          );
          if (playerCompany) {
            playerCompany.customers = Math.max(
              1,
              playerCompany.customers - Math.round(2 + rival.score / 18),
            );
            weeklyNews.push({
              id: Date.now() + rival.id + 40,
              week: nextWeek,
              category: "mercado",
              headline: `${rival.name} ataca a base de clientes da ${playerCompany.name}`,
              body: "A rivalidade virou uma disputa comercial aberta, com descontos e abordagens diretas aos clientes.",
              impact: "negativo",
            });
          }
        }
        if (crisisWeeks >= 10 && shock < 0.035 && age > 28 && cash < 0) {
          weeklyNews.push({
            id: Date.now() + rival.id,
            week: nextWeek,
            category: "negocios",
            headline: `${rival.name} encerra atividades após crise de caixa`,
            body: `${rival.founder} confirmou o fechamento. Clientes e talentos já são disputados pelo mercado.`,
            impact: "negativo",
          });
          return {
            ...rival,
            status: "fechada" as const,
            score: 0,
            cash,
            crisisWeeks,
            age,
            products,
            relation,
            lastDecision: "Encerrou as operações",
            history: [
              `Semana ${nextWeek}: encerrou as atividades.`,
              ...history,
            ].slice(0, 8),
          };
        }
        if (shock < 0.012 && rival.score > 55 && age > 24) {
          const buyer =
            rivalNames[Math.floor(Math.random() * rivalNames.length)][0];
          weeklyNews.push({
            id: Date.now() + rival.id,
            week: nextWeek,
            category: "negocios",
            headline: `${rival.name} é vendida para ${buyer}`,
            body: `A aquisição muda o equilíbrio competitivo do setor e pode provocar uma onda de consolidação.`,
            impact: "neutro",
          });
          return {
            ...rival,
            status: "vendida" as const,
            score: Math.round(rival.score * 1.1),
            cash,
            crisisWeeks,
            age,
            products,
            relation,
            acquiredBy: buyer,
            lastDecision: `Foi vendida para ${buyer}`,
            history: [
              `Semana ${nextWeek}: aquisição por ${buyer}.`,
              ...history,
            ].slice(0, 8),
          };
        }
        return {
          ...rival,
          score,
          cash,
          products,
          relation,
          reputation: clamp(rival.reputation + change / 5),
          status,
          crisisWeeks,
          age,
          lastDecision,
          history,
        };
      });
      const mergerBuyers = competitors.filter(
        (r) =>
          !["fechada", "vendida"].includes(r.status) &&
          (r.cash ?? 0) > 500000 &&
          r.score > 52,
      );
      if (mergerBuyers.length && Math.random() < 0.025 * (directorBefore.mode === "escalada" ? 1.5 : eventPressure)) {
        const buyer =
          mergerBuyers[Math.floor(Math.random() * mergerBuyers.length)];
        const targets = competitors.filter(
          (r) =>
            r.id !== buyer.id &&
            r.sector === buyer.sector &&
            !["fechada", "vendida"].includes(r.status) &&
            r.score < buyer.score - 12,
        );
        const target = targets[Math.floor(Math.random() * targets.length)];
        if (target) {
          const price = Math.round(
            target.score * 9000 + Math.max(0, target.cash ?? 0) * 0.45,
          );
          competitors = competitors.map((r) =>
            r.id === buyer.id
              ? {
                  ...r,
                  cash: (r.cash ?? 0) - price,
                  score: clamp(r.score + Math.round(target.score * 0.18)),
                  products: [
                    ...(r.products ?? []),
                    ...(target.products ?? []),
                  ].slice(-5),
                  lastDecision: `Comprou ${target.name}`,
                  history: [
                    `Semana ${nextWeek}: adquiriu ${target.name}.`,
                    ...(r.history ?? []),
                  ].slice(0, 8),
                }
              : r.id === target.id
                ? {
                    ...r,
                    status: "vendida" as const,
                    acquiredBy: buyer.name,
                    mergedInto: buyer.name,
                    lastDecision: `Foi incorporada pela ${buyer.name}`,
                    history: [
                      `Semana ${nextWeek}: incorporada pela ${buyer.name}.`,
                      ...(r.history ?? []),
                    ].slice(0, 8),
                  }
                : r,
          );
          weeklyNews.push({
            id: Date.now() + buyer.id + target.id,
            week: nextWeek,
            category: "negocios",
            headline: `${buyer.name} compra e incorpora ${target.name}`,
            body: `${buyer.founder} liderou uma operação de ${money.format(price)}. Produtos e clientes passam para a empresa compradora.`,
            impact: "neutro",
          });
        }
      }
      const activeSectors = [
        ...new Set(
          companies
            .filter((c) => !c.sold && !c.bankrupt && !c.closed)
            .map((c) => c.sector),
        ),
      ];
      activeSectors.forEach((sector) => {
        const living = competitors.filter(
          (r) =>
            r.sector === sector && !["fechada", "vendida"].includes(r.status),
        );
        if (living.length < 3 && Math.random() < 0.22) {
          const entrant = generateNewCompetitor(
            sector,
            competitors,
            Date.now() + living.length,
          );
          competitors = [...competitors, entrant];
          weeklyNews.push({
            id: Date.now() + entrant.id,
            week: nextWeek,
            category: "mercado",
            headline: `${entrant.name} inicia operações no setor de ${sector.toLowerCase()}`,
            body: `${entrant.founder} afirma que encontrou espaço deixado por empresas que saíram do mercado.`,
            impact: "neutro",
          });
        }
      });

      const activeCompany = companies.find(
        (c) => c.id === current.activeCompanyId,
      )!;
      const activeMetrics = companyMetrics(activeCompany, economyRoll.economy);
      let generationArc = current.generationArc;
      const currentGeneration = current.generation ?? 2;
      const generationAlreadyTold = (current.generationArcHistory ?? []).some((arc) => arc.generation === currentGeneration);
      if (
        current.dynastyMode &&
        !current.dynastyConcluded &&
        !generationAlreadyTold &&
        (!generationArc || generationArc.generation !== currentGeneration)
      ) generationArc = createGenerationArc({ ...current, week: nextWeek, companies, competitors });
      const narrativeDirector = evolveNarrativeDirector(directorBefore, { ...current, week: nextWeek, companies, competitors, auditCases, generationArc }, weeklyNews, newStaffAlerts);
      const pendingTutorialWeek = [2, 4, 6, 8, 10, 12].find((week) => week <= nextWeek && !(current.tutorialSeenWeeks ?? []).includes(week));
      const tutorialMessage = !current.tutorialCompleted && current.week <= 12 && pendingTutorialWeek && current.unread.length === 0
        ? tutorialNarrativeMessage({ ...current, week: nextWeek, companies, competitors }, pendingTutorialWeek)
        : null;
      const directorMessage =
        !tutorialMessage &&
        nextWeek > 12 &&
        current.unread.length === 0 &&
        nextWeek - narrativeDirector.lastInterventionWeek >= 6 &&
        (narrativeDirector.mode === "recuperacao" && narrativeDirector.crisisStreak >= 2 || narrativeDirector.mode === "escalada" && narrativeDirector.quietStreak >= 3)
          ? directorInterventionMessage({ ...current, week: nextWeek, companies, competitors, narrativeDirector }, narrativeDirector)
          : null;
      const generationArcDecision =
        !tutorialMessage &&
        generationArc?.status === "ativo" &&
        nextWeek - generationArc.lastChapterWeek >= 7 &&
        current.unread.length === 0
          ? generationArcMessage({ ...current, week: nextWeek, companies, competitors, generationArc }, generationArc)
          : null;
      const dynastyMessage =
        !tutorialMessage &&
        current.dynastyMode &&
        !generationArcDecision &&
        generationArc?.status !== "ativo" &&
        nextWeek - (current.lastDynastyEventWeek ?? current.dynastyStartedWeek ?? 0) >= 7 &&
        current.unread.length === 0 &&
        Math.random() < 0.32 * eventPressure
          ? dynastyStoryMessage({ ...current, week: nextWeek, companies })
          : null;
      const familyCandidate = (current.heirs ?? [])[nextWeek % Math.max(1, (current.heirs ?? []).length)];
      const familyMessage =
        !tutorialMessage &&
        !current.founderRetired &&
        familyCandidate &&
        nextWeek >= 12 &&
        nextWeek - (current.lastFamilyEventWeek ?? 0) >= 14 &&
        current.unread.length === 0 &&
        Math.random() < 0.24 * eventPressure
          ? familyStoryMessage(familyCandidate, { ...current, week: nextWeek })
          : null;
      const personalMessage =
        !current.founderRetired &&
        !current.founderJourneyComplete &&
        nextWeek >= 13 &&
        nextWeek - (current.lastPersonalEventWeek ?? 0) >= 13 &&
        nextWeek % 3 === 1 &&
        current.unread.length === 0
          ? founderPersonalMessage({ ...current, week: nextWeek, companies })
          : null;
      const mainRival = competitors.find((competitor) => competitor.id === current.nemesisId) ?? competitors[0];
      const nemesisMessage =
        !current.founderRetired &&
        !current.founderJourneyComplete &&
        !familyMessage &&
        !personalMessage &&
        mainRival &&
        nextWeek >= 22 &&
        nextWeek % 22 === 0 &&
        current.unread.length === 0
          ? nemesisStoryMessage(mainRival, { ...current, week: nextWeek, companies, competitors })
          : null;
      const politicalCandidate = companies.find(
        (company) =>
          company.ceo !== controlledExecutive &&
          !company.sold &&
          !company.bankrupt &&
          !company.closed &&
          (company.ceoDemandCooldown ?? 0) === 0 &&
          ((company.ceoAmbition ?? 0) >= 55 ||
            (company.ceoLoyalty ?? 100) <= 42 ||
            characterMemoryScore(company.ceoMemories, nextWeek) <= -8),
      );
      const politicalMessage =
        !tutorialMessage &&
        !dynastyMessage &&
        !familyMessage &&
        !personalMessage &&
        !nemesisMessage &&
        politicalCandidate &&
        nextWeek >= 8 &&
        current.unread.length === 0 &&
        Math.random() < (0.22 + Math.max(0, -characterMemoryScore(politicalCandidate.ceoMemories, nextWeek)) / 100) * eventPressure
          ? ceoPoliticalMessage(politicalCandidate, {
              ...current,
              week: nextWeek,
              companies,
            })
          : null;
      const crisisEmployee = activeCompany.employees.find(
        (e) =>
          ((e.stress ?? 0) > 86 && (e.leaveWeeks ?? 0) === 0) ||
          (e.loyalty < 28 && (e.weeks ?? 0) > 16) ||
          (characterMemoryScore(e.memories, nextWeek) <= -14 && (e.weeks ?? 0) > 8),
      );
      const employeeMessage =
        !tutorialMessage &&
        !personalMessage &&
        !nemesisMessage &&
        !ceoProposalMessage &&
        crisisEmployee &&
        !current.unread.some((m) =>
          m.id.startsWith(`employee-${crisisEmployee.id}-`),
        ) &&
        Math.random() < (0.2 + Math.max(0, -characterMemoryScore(crisisEmployee.memories, nextWeek)) / 120) * eventPressure
          ? employeeCrisisMessage(crisisEmployee, activeCompany.id)
          : null;
      const ideaEmployee = activeCompany.employees
        .filter((employee) =>
          (employee.leaveWeeks ?? 0) === 0 &&
          employee.skill >= 42 &&
          employee.loyalty >= 32 &&
          !employee.memories?.some((memory) => memory.kind === "produto" && nextWeek - memory.week < 32),
        )
        .sort((a, b) => b.skill + b.relation / 2 - (a.skill + a.relation / 2))[0];
      const employeeIdeaMessage =
        !tutorialMessage &&
        !dynastyMessage &&
        !familyMessage &&
        !personalMessage &&
        !nemesisMessage &&
        !politicalMessage &&
        !ceoProposalMessage &&
        !employeeMessage &&
        activeCompany.ceo === controlledExecutive &&
        activeCompany.cash >= 65000 &&
        activeCompany.projects.filter((project) => project.kind === "produto" && project.status === "ativo").length === 0 &&
        ideaEmployee &&
        nextWeek >= 8 &&
        (nextWeek + activeCompany.id) % 13 === 0 &&
        current.unread.length === 0 &&
        Math.random() < .68 * (directorBefore.mode === "escalada" ? 1.25 : 1)
          ? employeeProductIdeaMessage(ideaEmployee, activeCompany, economyRoll.economy, nextWeek)
          : null;
      const narrativeMessage =
        !tutorialMessage &&
        !directorMessage &&
        !dynastyMessage &&
        !familyMessage &&
        !personalMessage &&
        !nemesisMessage &&
        !politicalMessage &&
        !ceoProposalMessage &&
        !employeeMessage &&
        !employeeIdeaMessage &&
        nextWeek >= 5 &&
        nextWeek - (current.lastNarrativeWeek ?? 0) >= 6 &&
        current.unread.length === 0 &&
        Math.random() < 0.24 * eventPressure
          ? narrativeEvent(activeCompany, {
              ...current,
              week: nextWeek,
              companies,
              competitors,
            })
          : null;

      if (crisisEmployee && Math.random() < 0.16 * eventPressure) {
        weeklyNews.push({
          id: Date.now() + 99,
          week: nextWeek,
          category: "pessoas",
          headline: `Mercado de talentos pressiona ${activeCompany.sector.toLowerCase()}`,
          body: "Profissionais experientes estão recebendo múltiplas propostas e salários subiram acima da inflação.",
          impact: "negativo",
        });
      }
      if (completedName)
        weeklyNews.push({
          id: Date.now() + 77,
          week: nextWeek,
          category: "negocios",
          headline: `${activeCompany.name} conclui projeto ${completedName}`,
          body: "A entrega aumenta a visibilidade da empresa e pode abrir novas oportunidades comerciais.",
          impact: "positivo",
        });
      const distinctWeeklyNews = dedupeNewsItems(weeklyNews, current.news);
      const pressPressure = clamp(
        distinctWeeklyNews.reduce(
          (sum, item) => sum + newsRepercussion(item).score / 8,
          0,
        ),
        -6,
        6,
      );
      const economyAfterNews: Economy = {
        ...economyRoll.economy,
        confidence: Math.round(
          clamp(economyRoll.economy.confidence + pressPressure),
        ),
      };
      let dynastyHeirs = (current.heirs ?? []).map((heir) => ({
        ...heir,
        competence: clamp(
          heir.competence +
            (heir.role === "ceo"
              ? 0.5
              : heir.role === "sucessor"
              ? 0.34
              : heir.role === "conselho"
                ? 0.28
                : heir.role === "formacao"
                  ? 0.16
                  : 0),
        ),
        readiness: clamp(
          heir.readiness +
            (heir.role === "ceo"
              ? 0.62
              : heir.role === "sucessor"
              ? 0.42
              : heir.role === "conselho"
                ? 0.34
                : heir.role === "formacao"
                  ? 0.2
                  : 0),
        ),
      }));
      let dynastyLegitimacy = current.dynastyLegitimacy ?? 100;
      let familyUnity = current.familyUnity ?? 75;
      let founderHealth = current.founderHealth ?? 100;
      let founderDeceased = current.founderDeceased ?? false;
      let founderHoldingEquity = current.founderHoldingEquity ?? 100;
      let outsideFamilyEquity = current.outsideFamilyEquity ?? 0;
      let familyFoundationEquity = current.familyFoundationEquity ?? 0;
      let formerPresidents = (current.formerPresidents ?? []).map((president) => ({ ...president }));
      if (current.dynastyMode) {
        const operating = companies.filter(
          (company) => !company.sold && !company.bankrupt && !company.closed,
        );
        const profitable = operating.filter(
          (company) => companyMetrics(company, economyAfterNews).profit >= 0,
        ).length;
        const performance = operating.length
          ? profitable / operating.length
          : 0;
        const averageResentment = dynastyHeirs.length
          ? dynastyHeirs.reduce(
              (sum, heir) => sum + (heir.resentment ?? 10),
              0,
            ) / dynastyHeirs.length
          : 0;
        familyUnity = clamp(
          familyUnity + (50 - averageResentment) / 120 - 0.08,
        );
        formerPresidents = formerPresidents.map((president) => ({
          ...president,
          relationship: clamp(president.relationship + (familyUnity - president.relationship) / 180),
          influence: president.name === current.founder && founderDeceased
            ? 0
            : clamp(president.influence + (president.status === "oposicao" && dynastyLegitimacy < 55 ? .18 : president.status === "aliado" ? -.04 : -.08)),
        }));
        const predecessorPressure = formerPresidents.reduce((sum, president) => sum + (president.status === "oposicao" ? president.influence : president.status === "aliado" ? -president.influence * .3 : 0), 0) / 120;
        dynastyLegitimacy = clamp(
          dynastyLegitimacy +
            (performance >= 0.65 ? 0.75 : performance < 0.4 ? -0.65 : 0.12) +
            (familyUnity >= 70 ? 0.15 : familyUnity < 40 ? -0.3 : 0) -
            predecessorPressure,
        );
        const legitimacyBoardEffect = (dynastyLegitimacy - 50) / 170;
        const predecessorBoardEffect = clamp(-predecessorPressure / 2, -0.65, 0.35);
        companies = companies.map((company) => {
          if (company.sold || company.bankrupt || company.closed) return company;
          const controlled = company.ceo === controlledExecutive;
          const goal = current.dynastyGoal ?? "preservar";
          return {
            ...company,
            boardSupport: clamp(
              (company.boardSupport ?? 50) + legitimacyBoardEffect + predecessorBoardEffect,
            ),
            customers:
              controlled && goal === "expandir"
                ? company.customers + (nextWeek % 2 === 0 ? 1 : 0)
                : company.customers,
            efficiency:
              controlled && goal === "preservar"
                ? Math.max(0.68, (company.efficiency ?? 1) - 0.0015)
                : company.efficiency,
            projects:
              controlled && goal === "inovar"
                ? company.projects.map((project) =>
                    project.status === "ativo"
                      ? { ...project, progress: clamp(project.progress + 0.45) }
                      : project,
                  )
                : company.projects,
            employees:
              controlled && goal === "unir"
                ? company.employees.map((employee) => ({
                    ...employee,
                    morale: clamp(employee.morale + 0.22),
                    loyalty: clamp(employee.loyalty + 0.16),
                  }))
                : company.employees,
          };
        });
        const rebellious = dynastyHeirs.find(
          (heir) =>
            heir.name !== controlledExecutive &&
            (heir.resentment ?? 0) > 82 &&
            (heir.equity ?? 0) >= 5 &&
            heir.status !== "rompido",
        );
        if (rebellious && Math.random() < 0.055) {
          dynastyHeirs = dynastyHeirs.map((heir) =>
            heir.id === rebellious.id
              ? {
                  ...heir,
                  equity: Math.max(0, (heir.equity ?? 0) - 5),
                  status: "afastado" as const,
                  support: clamp((heir.support ?? 50) - 12),
                }
              : heir,
          );
          outsideFamilyEquity = clamp(outsideFamilyEquity + 5);
          familyUnity = clamp(familyUnity - 12);
          weeklyNews.push({
            id: Date.now() + rebellious.id + 1200,
            week: nextWeek,
            category: "negocios",
            headline: `${rebellious.name} vende parte das ações da família`,
            body: "Um investidor externo entrou no capital após uma disputa entre herdeiros. O controle familiar ficou mais vulnerável.",
            impact: "negativo",
          });
        }
        if (!founderDeceased) {
          const founderAgeNext =
            (current.founderStartAge ?? 32) + Math.floor((nextWeek - 1) / 52);
          founderHealth = clamp(
            founderHealth - 0.16 - Math.max(0, founderAgeNext - 65) * 0.018,
          );
          const deathChance =
            founderHealth < 18
              ? 0.08
              : founderAgeNext >= 80
                ? 0.018
                : 0;
          if (founderHealth <= 0 || Math.random() < deathChance) {
            founderDeceased = true;
            const inheritors = dynastyHeirs.filter(
              (heir) => heir.status !== "rompido",
            );
            const leaderHeir = inheritors.find(
              (heir) => heir.name === controlledExecutive,
            );
            const others = inheritors.filter(
              (heir) => heir.name !== controlledExecutive,
            );
            const pool = founderHoldingEquity;
            if ((current.willPolicy ?? "controle") === "igualitario") {
              const share = inheritors.length ? pool / inheritors.length : 0;
              dynastyHeirs = dynastyHeirs.map((heir) =>
                inheritors.some((item) => item.id === heir.id)
                  ? { ...heir, equity: (heir.equity ?? 0) + share }
                  : heir,
              );
              familyUnity = clamp(familyUnity + 8);
            } else if ((current.willPolicy ?? "controle") === "controle") {
              const leaderShare = pool * 0.7;
              const otherShare = others.length ? (pool * 0.3) / others.length : 0;
              dynastyHeirs = dynastyHeirs.map((heir) =>
                heir.id === leaderHeir?.id
                  ? { ...heir, equity: (heir.equity ?? 0) + leaderShare }
                  : others.some((item) => item.id === heir.id)
                    ? { ...heir, equity: (heir.equity ?? 0) + otherShare, resentment: clamp((heir.resentment ?? 10) + 12) }
                    : heir,
              );
              familyUnity = clamp(familyUnity - 5);
            } else {
              if (leaderHeir)
                dynastyHeirs = dynastyHeirs.map((heir) =>
                  heir.id === leaderHeir.id
                    ? { ...heir, equity: (heir.equity ?? 0) + pool * 0.45 }
                    : heir,
                );
              const otherShare = others.length ? (pool * 0.2) / others.length : 0;
              dynastyHeirs = dynastyHeirs.map((heir) =>
                others.some((item) => item.id === heir.id)
                  ? { ...heir, equity: (heir.equity ?? 0) + otherShare }
                  : heir,
              );
              familyFoundationEquity += pool * 0.35;
              familyUnity = clamp(familyUnity + 3);
            }
            founderHoldingEquity = 0;
            weeklyNews.push({
              id: Date.now() + 1300,
              week: nextWeek,
              category: "negocios",
              headline: `${current.founder}, fundador da ${current.holdingName}, morre`,
              body: `O testamento segue a política ${current.willPolicy ?? "controle"}. A família inicia uma nova etapa sem a presença de seu fundador.`,
              impact: "negativo",
            });
          }
        }
      }

      if (founderDeceased) {
        formerPresidents = formerPresidents.map((president) => president.name === current.founder ? { ...president, alive: false, health: 0, influence: 0, lastMove: "Seu poder político tornou-se legado histórico." } : president);
      }

      let factions = syncHoldingFactions({ ...current, companies, heirs: dynastyHeirs }, companies).map((faction) => {
        const plan = current.annualPlan?.priority;
        const aligned = faction.agenda === plan ||
          (faction.agenda === "seguranca" && ["rentabilidade", "consolidacao"].includes(plan ?? "")) ||
          (faction.agenda === "retorno" && plan === "rentabilidade");
        return { ...faction, support: clamp(faction.support + (aligned ? .45 : -.08)), pressure: clamp(faction.pressure + (aligned ? -.35 : faction.power > 55 ? .25 : .05)) };
      });
      const politicalBoardDelta = factions.reduce((sum, faction) => sum + ((faction.support - 50) * faction.power) / 8500, 0);
      const activeAgendas = factions.filter((faction) => (faction.agendaWeeks ?? 0) > 0).map((faction) => faction.agenda);
      companies = companies.map((company) => company.sold || company.bankrupt || company.closed ? company : ({
        ...company,
        customers: activeAgendas.includes("crescimento") ? company.customers + 1 : company.customers,
        efficiency: activeAgendas.includes("seguranca") ? Math.max(.68, (company.efficiency ?? 1) - .0015) : company.efficiency,
        projects: activeAgendas.includes("inovacao") ? company.projects.map((project) => project.status === "ativo" ? { ...project, progress: clamp(project.progress + .45) } : project) : company.projects,
        employees: activeAgendas.includes("pessoas") ? company.employees.map((employee) => ({ ...employee, morale: clamp(employee.morale + .22), stress: clamp((employee.stress ?? 0) - .18) })) : company.employees,
        boardSupport: clamp((company.boardSupport ?? 50) + politicalBoardDelta + (activeAgendas.includes("retorno") ? .25 : 0)),
      }));
      if (activeAgendas.includes("familia")) familyUnity = clamp(familyUnity + .28);
      const hostileFaction = factions.find((faction) => faction.power >= 58 && faction.support <= 25 && faction.pressure >= 65);
      if (hostileFaction && nextWeek % 9 === 0) {
        weeklyNews.push({ id: Date.now() + 1600, week: nextWeek, category: "negocios", headline: `${hostileFaction.name} organiza oposição dentro da holding`, body: `${hostileFaction.leader} reuniu ${hostileFaction.members.length} aliados para pressionar pela agenda de ${hostileFaction.agenda}.`, impact: "negativo" });
        factions = factions.map((faction) => faction.id === hostileFaction.id ? { ...faction, lastMove: "A facção iniciou uma ofensiva contra a liderança.", pressure: clamp(faction.pressure + 8) } : faction);
      }
      let annualPlan = current.annualPlan;
      let annualReviews = current.annualReviews ?? [];
      let completedAnnualReview: AnnualReview | null = null;
      if (annualPlan && nextWeek >= annualPlan.endWeek) {
        completedAnnualReview = evaluateAnnualPlan(annualPlan, { ...current, week: nextWeek, companies, economy: economyAfterNews });
        annualReviews = [completedAnnualReview, ...annualReviews].slice(0, 8);
        weeklyNews.push({ id: Date.now() + 1700, week: nextWeek, category: "negocios", headline: `${current.holdingName} encerra o ano com ${completedAnnualReview.score}% das promessas cumpridas`, body: `${completedAnnualReview.verdict}. Conselho, mercado e funcionários agora avaliam a distância entre o discurso e a execução.`, impact: completedAnnualReview.score >= 67 ? "positivo" : "negativo" });
        annualPlan = undefined;
      }
      let generationProfile = current.generationProfile;
      if (current.dynastyMode && generationProfile) {
        companies = companies.map((company) => {
          if (company.sold || company.bankrupt || company.closed || company.ceo !== controlledExecutive) return company;
          return generationProfile.style === "crescimento"
            ? { ...company, customers: company.customers + (nextWeek % 2 === 0 ? 1 : 0), employees: company.employees.map((employee) => ({ ...employee, stress: clamp((employee.stress ?? 0) + .12) })) }
            : generationProfile.style === "eficiencia"
              ? { ...company, efficiency: Math.max(.68, (company.efficiency ?? 1) - .0018), reputation: clamp(company.reputation - (nextWeek % 12 === 0 ? 1 : 0)) }
              : generationProfile.style === "inovacao"
                ? { ...company, projects: company.projects.map((project) => project.status === "ativo" ? { ...project, progress: clamp(project.progress + .38), risk: clamp(project.risk + .08) } : project) }
                : { ...company, employees: company.employees.map((employee) => ({ ...employee, morale: clamp(employee.morale + .2), loyalty: clamp(employee.loyalty + .1), stress: clamp((employee.stress ?? 0) - .12) })) };
        });
        if (nextWeek % 52 === 0) {
          const age = generationProfile.age + 1;
          const health = clamp(generationProfile.health - Math.max(1.5, 1.5 + (age - 60) * .28));
          generationProfile = { ...generationProfile, age, health };
        }
      }
      if (current.dynastyMode && nextWeek % 52 === 0) {
        formerPresidents = formerPresidents.map((president) => {
          if (!president.alive) return president;
          const age = president.age + 1;
          const health = clamp(president.health - Math.max(2, 2 + (age - 62) * .32));
          const dies = health <= 4 || (age >= 82 && Math.random() < .18);
          if (dies) weeklyNews.push({ id: Date.now() + president.generation * 1900, week: nextWeek, category: "pessoas", headline: `${president.name}, ex-presidente da geração ${president.generation}, morre aos ${age} anos`, body: `${president.legacy} Sua morte altera o equilíbrio político e transforma influência em memória.`, impact: "negativo" });
          const publishMemoir = !dies && age >= 68 && !president.memoirPublished && Math.random() < .38;
          if (publishMemoir) weeklyNews.push({ id: Date.now() + president.generation * 1910, week: nextWeek, category: "negocios", headline: `${president.name} publica memórias sobre os anos no poder`, body: `“${president.memoir}” reacende debates sobre decisões, alianças e conflitos que a família preferia esquecer.`, impact: president.status === "oposicao" ? "negativo" : "neutro" });
          const revealSecret = publishMemoir && president.status === "oposicao" && !president.secretRevealed && Math.random() < .45;
          if (revealSecret) weeklyNews.push({ id: Date.now() + president.generation * 1920, week: nextWeek, category: "negocios", headline: `Livro de ${president.name} revela segredo da antiga gestão`, body: president.secret ?? "Um episódio omitido voltou ao centro do conselho.", impact: "negativo" });
          return { ...president, age, health, alive: !dies, influence: dies ? 0 : president.influence, memoirPublished: president.memoirPublished || publishMemoir, secretRevealed: president.secretRevealed || revealSecret, lastMove: dies ? "Seu poder tornou-se legado histórico." : revealSecret ? "Publicou um segredo que atingiu a nova geração." : publishMemoir ? "Publicou suas memórias presidenciais." : president.lastMove };
        });
      }
      let politicalArc = current.politicalArc;
      if (current.dynastyMode && politicalArc) {
        const weeksLeft = Math.max(0, politicalArc.weeksLeft - 1);
        const stage = weeksLeft <= 1 ? "votacao" as const : weeksLeft <= 3 ? "campanha" as const : "rumores" as const;
        politicalArc = { ...politicalArc, weeksLeft, stage, support: clamp(politicalArc.support + (50 - dynastyLegitimacy) / 45 + Math.random() * 3 - 1.5) };
        if (weeksLeft === 3) weeklyNews.push({ id: Date.now() + 1930, week: nextWeek, category: "negocios", headline: `${politicalArc.challenger} transforma rumores em campanha contra a presidência`, body: `A articulação já reúne apoio estimado em ${Math.round(politicalArc.support)}% do conselho. A votação se aproxima.`, impact: "negativo" });
      }
      if (current.dynastyMode && !politicalArc && nextWeek - (current.dynastyStartedWeek ?? nextWeek) >= 14) {
        const challenger = formerPresidents.filter((president) => president.alive && president.status === "oposicao" && president.influence >= 48).sort((a, b) => b.influence + b.ambition - a.influence - a.ambition)[0];
        if (challenger && (nextWeek + challenger.generation) % 17 === 0) {
          politicalArc = { id: `${challenger.generation}-${nextWeek}`, challenger: challenger.name, incumbent: controlledExecutive, startedWeek: nextWeek, weeksLeft: 6, support: clamp(challenger.influence * .55 + challenger.ambition * .2 + (100 - dynastyLegitimacy) * .25), stage: "rumores" };
          weeklyNews.push({ id: Date.now() + 1940, week: nextWeek, category: "negocios", headline: `${challenger.name} reúne antigos aliados em encontro reservado`, body: `O ex-presidente nega uma tentativa de retorno, mas sua influência de ${Math.round(challenger.influence)}% preocupa o governo atual.`, impact: "negativo" });
        }
      }
      const arcChallenger = politicalArc ? formerPresidents.find((president) => president.name === politicalArc?.challenger) : undefined;
      const politicalArcDecision = politicalArc && politicalArc.weeksLeft === 0 && arcChallenger && current.unread.length === 0
        ? politicalArcMessage({ ...current, week: nextWeek, companies, formerPresidents, politicalArc }, politicalArc, arcChallenger)
        : null;
      const leaderDeathDecision = current.dynastyMode && generationProfile && generationProfile.health <= 4 && current.unread.length === 0
        ? leaderDeathMessage({ ...current, week: nextWeek, companies, formerPresidents, generationProfile }, generationProfile)
        : null;
      let mandateReviews = current.mandateReviews ?? [];
      let lastMandateReviewWeek = current.lastMandateReviewWeek ?? current.dynastyStartedWeek ?? 0;
      if (current.dynastyMode && nextWeek - lastMandateReviewWeek >= 26) {
        const operating = companies.filter((company) => !company.sold && !company.bankrupt && !company.closed);
        const profitCompanies = operating.filter((company) => companyMetrics(company, economyAfterNews).profit >= 0).length;
        const score = Math.round(clamp((operating.length ? profitCompanies / operating.length * 35 : 0) + dynastyLegitimacy * .3 + familyUnity * .2 + current.reputation * .15));
        const verdict = score >= 78 ? "Mandato dominante" : score >= 58 ? "Mandato aprovado com ressalvas" : score >= 40 ? "Presidência sob pressão" : "Conselho perdeu confiança";
        mandateReviews = [{ generation: current.generation ?? 2, leader: controlledExecutive, week: nextWeek, score, verdict, profitCompanies, legitimacy: Math.round(dynastyLegitimacy), familyUnity: Math.round(familyUnity) }, ...mandateReviews].slice(0, 12);
        lastMandateReviewWeek = nextWeek;
        weeklyNews.push({ id: Date.now() + 1950, week: nextWeek, category: "negocios", headline: `Conselho avalia mandato de ${controlledExecutive} em ${score}%`, body: `${verdict}. ${profitCompanies} de ${operating.length} empresas estão lucrativas, legitimidade está em ${Math.round(dynastyLegitimacy)}% e união familiar em ${Math.round(familyUnity)}%.`, impact: score >= 58 ? "positivo" : "negativo" });
        if (score < 40) formerPresidents = formerPresidents.map((president) => president.alive && president.ambition >= 60 ? { ...president, status: "oposicao" as const, influence: clamp(president.influence + 7), lastMove: "Usou a avaliação ruim para questionar a presidência." } : president);
      }
      const operatingDynasty = companies.filter((company) => !company.sold && !company.bankrupt && !company.closed);
      let generationMissions = current.generationMissions ?? [];
      if (current.dynastyMode && (!generationMissions.length || generationMissions[0].generation !== (current.generation ?? 2)))
        generationMissions = createGenerationMissions({ ...current, week: nextWeek, companies, economy: economyAfterNews });
      const missionProgress = advanceGenerationMissions(generationMissions, { ...current, week: nextWeek, companies, economy: economyAfterNews, reputation: clamp(current.reputation + (completedAnnualReview ? completedAnnualReview.score >= 67 ? 4 : -4 : 0)), familyUnity });
      generationMissions = missionProgress.missions;
      const generationRewardCash = missionProgress.completed.reduce((sum, mission) => sum + mission.rewardCash, 0);
      const generationRewardLegacy = missionProgress.completed.reduce((sum, mission) => sum + mission.rewardLegacy, 0);
      missionProgress.completed.forEach((mission, index) => weeklyNews.push({ id: Date.now() + 2100 + index, week: nextWeek, category: "negocios", headline: `Meta da geração concluída: ${mission.title}`, body: `${mission.rewardTitle} conquistado. A holding recebe ${money.format(mission.rewardCash)} e ${mission.rewardLegacy} pontos de legado.`, impact: "positivo" }));
      const wealthManagementCost = personalWealthCost(current.personalCash);
      if (wealthManagementCost > 0 && nextWeek % 13 === 0) weeklyNews.push({ id: Date.now() + 2345, week: nextWeek, category: "economia", headline: `Fortuna de ${controlledExecutive} exige uma estrutura própria`, body: `Gestão patrimonial, impostos, seguros e assessoria consumiram ${money.format(wealthManagementCost)} nesta semana. Patrimônio muito alto continua valioso, mas deixou de ser gratuito.`, impact: "neutro" });
      const dynastyEndingReady = current.dynastyMode && ((current.generation ?? 2) >= 4 && nextWeek - (current.dynastyStartedWeek ?? nextWeek) >= 80 || operatingDynasty.length === 0 || 100 - outsideFamilyEquity < 15);
      const finalWeeklyNews = dedupeNewsItems(weeklyNews, current.news);
      const weeklyReport = buildWeeklyReport(current, companies, economyAfterNews, nextWeek);
      const financialEntries = buildFinancialEntries(current, companies, economyAfterNews, nextWeek);
      const decisionTraces = observeDecisionTraces(current.decisionTraces, weeklyReport, finalWeeklyNews);
      const becameJourneyReady = !current.founderJourneyReady && !current.founderJourneyComplete && nextWeek >= 130;
      let nextState: GameState = {
        ...current,
        week: nextWeek,
        chapter: Math.max(current.chapter, founderAct(nextWeek).id),
        difficultyApplied: current.difficulty ?? "executivo",
        personalCash: Math.max(0, current.personalCash + Math.round(holdingDividends * .88) + generationRewardCash - wealthManagementCost),
        survivedRecessions:
          (current.survivedRecessions ?? 0) +
          (current.economy.cycle === "recessao" &&
          economyRoll.economy.cycle !== "recessao"
            ? 1
            : 0),
        economy: economyAfterNews,
        companies,
        auditCases,
        competitors,
        rivalScore: competitors
          .filter((c) => c.status !== "fechada")
          .reduce((max, c) => Math.max(max, c.score), 0),
        heirs: dynastyHeirs,
        dynastyLegitimacy,
        familyUnity,
        founderHealth,
        founderDeceased,
        founderHoldingEquity,
        outsideFamilyEquity,
        familyFoundationEquity,
        formerPresidents,
        generationProfile,
        politicalArc,
        generationArc,
        narrativeDirector,
        generationMissions,
        mandateReviews,
        lastMandateReviewWeek,
        dynastyEndingReady,
        staffAlerts: [...newStaffAlerts, ...(current.staffAlerts ?? [])].map((alert) => {
          const alertCompany = companies.find((company) => company.id === alert.companyId);
          return !alert.resolved && alertCompany && alertCompany.employees.length > (alert.headcountAfter ?? alertCompany.employees.length) ? { ...alert, resolved: true } : alert;
        }).slice(0, 20),
        factions,
        factionHistory: hostileFaction ? [`Semana ${nextWeek}: ${hostileFaction.name} iniciou oposição.`, ...(current.factionHistory ?? [])].slice(0, 16) : current.factionHistory,
        annualPlan,
        annualReviews,
        legacy: current.legacy + generationRewardLegacy + (completedAnnualReview ? Math.round(completedAnnualReview.score / 12) : 0),
        reputation: clamp(current.reputation + (completedAnnualReview ? completedAnnualReview.score >= 67 ? 4 : -4 : 0)),
        nemesisId: current.nemesisId ?? competitors[0]?.id,
        founderPersonal: current.founderRetired ? current.founderPersonal : {
          ...(current.founderPersonal ?? { health: 82, family: 72, satisfaction: 60, ego: 38, regrets: 8 }),
          health: clamp((current.founderPersonal?.health ?? 82) - (nextWeek % 4 === 0 ? .35 : 0)),
        },
        founderJourneyReady: current.founderJourneyReady || nextWeek >= 130,
        unread: leaderDeathDecision
          ? [...current.unread, leaderDeathDecision]
          : politicalArcDecision
          ? [...current.unread, politicalArcDecision]
          : tutorialMessage
          ? [...current.unread, tutorialMessage]
          : generationArcDecision
          ? [...current.unread, generationArcDecision]
          : dynastyMessage
          ? [...current.unread, dynastyMessage]
          : familyMessage
          ? [...current.unread, familyMessage]
          : personalMessage
          ? [...current.unread, personalMessage]
          : nemesisMessage
          ? [...current.unread, nemesisMessage]
          : politicalMessage
          ? [...current.unread, politicalMessage]
          : ceoProposalMessage
          ? [...current.unread, ceoProposalMessage]
          : employeeMessage
          ? [...current.unread, employeeMessage]
          : employeeIdeaMessage
          ? [...current.unread, employeeIdeaMessage]
          : directorMessage
          ? [...current.unread, directorMessage]
          : narrativeMessage
            ? [...current.unread, narrativeMessage]
            : current.unread,
        recentNewsTopics: [
          ...finalWeeklyNews
            .map((item) => item.topic)
            .filter((topic): topic is string => Boolean(topic)),
          ...(current.recentNewsTopics ?? []),
        ].filter((topic, index, all) => all.indexOf(topic) === index).slice(0, 18),
        news: [...finalWeeklyNews, ...current.news].slice(0, 60),
        weeklyReports: [weeklyReport, ...(current.weeklyReports ?? [])].slice(0, 16),
        financialLedger: [...financialEntries, ...(current.financialLedger ?? [])].slice(0, 180),
        decisionTraces,
        log: [
          `Semana ${current.week}: ${activeMetrics.profit >= 0 ? "lucro" : "prejuízo"} de ${money.format(Math.abs(activeMetrics.profit))}.`,
          ...(completedName ? [`Projeto ${completedName} concluído.`] : []),
          ...current.log,
        ].slice(0, 12),
      };
      const achievementUnlocks = newlyUnlockedAchievements(nextState);
      if (achievementUnlocks.length) nextState = {
        ...nextState,
        achievements: [...(nextState.achievements ?? []), ...achievementUnlocks],
        news: achievementUnlocks.map((achievement, index) => ({ id: Date.now() + 2300 + index, week: nextWeek, category: "negocios" as const, headline: `Conquista desbloqueada: ${achievement.title}`, body: "Uma nova marca permanente foi adicionada à história desta holding.", impact: "positivo" as const })).concat(nextState.news).slice(0, 60),
        log: achievementUnlocks.map((achievement) => `Conquista: ${achievement.title}.`).concat(nextState.log).slice(0, 12),
      };
      if (nextWeek > 12) setTimeout(
        () => storyBeat(nextState, activeCompany, activeMetrics.valuation),
        0,
      );
      if (leaderDeathDecision)
        setTimeout(() => {
          setSelectedMessage(leaderDeathDecision);
          setDialog("inbox");
          setSpeed(0);
        }, 100);
      else if (politicalArcDecision)
        setTimeout(() => {
          setSelectedMessage(politicalArcDecision);
          setDialog("inbox");
          setSpeed(0);
        }, 100);
      else if (tutorialMessage)
        setTimeout(() => {
          setSelectedMessage(tutorialMessage);
          setDialog("inbox");
          setSpeed(0);
        }, 100);
      else if (generationArcDecision)
        setTimeout(() => {
          setSelectedMessage(generationArcDecision);
          setDialog("inbox");
          setSpeed(0);
        }, 100);
      else if (dynastyMessage)
        setTimeout(() => {
          setSelectedMessage(dynastyMessage);
          setDialog("inbox");
          setSpeed(0);
        }, 100);
      else if (familyMessage)
        setTimeout(() => {
          setSelectedMessage(familyMessage);
          setDialog("inbox");
          setSpeed(0);
        }, 100);
      else if (personalMessage)
        setTimeout(() => {
          setSelectedMessage(personalMessage);
          setDialog("inbox");
          setSpeed(0);
        }, 100);
      else if (nemesisMessage)
        setTimeout(() => {
          setSelectedMessage(nemesisMessage);
          setDialog("inbox");
          setSpeed(0);
        }, 100);
      else if (politicalMessage)
        setTimeout(() => {
          setSelectedMessage(politicalMessage);
          setDialog("inbox");
          setSpeed(0);
        }, 100);
      else if (ceoProposalMessage)
        setTimeout(() => {
          setSelectedMessage(ceoProposalMessage);
          setDialog("inbox");
          setSpeed(0);
        }, 100);
      else if (employeeMessage)
        setTimeout(() => {
          setSelectedMessage(employeeMessage);
          setDialog("inbox");
          setSpeed(0);
        }, 100);
      else if (employeeIdeaMessage)
        setTimeout(() => {
          setSelectedMessage(employeeIdeaMessage);
          setDialog("inbox");
          setSpeed(0);
        }, 100);
      else if (directorMessage)
        setTimeout(() => {
          setSelectedMessage(directorMessage);
          setDialog("inbox");
          setSpeed(0);
        }, 100);
      else if (narrativeMessage)
        setTimeout(() => {
          setSelectedMessage(narrativeMessage);
          setDialog("inbox");
          setSpeed(0);
        }, 100);
      else if (completedAnnualReview)
        setTimeout(() => {
          setDialog("annual-plan");
          setSpeed(0);
        }, 100);
      else if (becameJourneyReady)
        setTimeout(() => {
          setDialog("founder-finale");
          setSpeed(0);
        }, 100);
      return nextState;
    });
  };

  useEffect(() => {
    if (
      speed === 0 ||
      dialog ||
      game.unread.length > 0 ||
      !active ||
      active.sold ||
      active.bankrupt
    )
      return;
    const timer = window.setInterval(advanceWeek, speed === 1 ? 16000 : 6500);
    return () => window.clearInterval(timer);
  }, [speed, dialog, game.unread.length, active?.id, active?.sold, game.week]);

  const hire = (candidate: Employee) => {
    if (!active || !isCEO) return;
    const acceptance = candidateAcceptance(active, candidate);
    const onboardingCost = 2500 + (candidate.signingBonus ?? 0);
    if (active.cash < onboardingCost) return;
    if (Math.random() * 100 > acceptance) {
      const processCost = Math.min(2000, active.cash);
      setGame((state) => ({ ...state, companies: state.companies.map((company) => company.id !== active.id ? company : ({ ...company, cash: company.cash - processCost, employerBrand: clamp((company.employerBrand ?? 35) - .4), rejectedCandidates: [{ name: candidate.name, untilWeek: state.week + 8 }, ...(company.rejectedCandidates ?? [])].slice(0, 12) })), news: [{ id: Date.now(), week: state.week, category: "pessoas", headline: `${candidate.name} recusa proposta da ${active.name}`, body: `O candidato de nível ${talentTierLabels[candidate.talentTier ?? talentTierFor(candidate.skill)].toLowerCase()} avaliou salário, reputação e estrutura antes de seguir outro caminho. O processo custou ${money.format(processCost)}.`, impact: "negativo" }, ...state.news].slice(0, 60) }));
      setDialog(null);
      notify(`${candidate.name} recusou a proposta. Chance estimada era ${acceptance}%.`);
      return;
    }
    setGame((state) => evolveIdentity({
      ...state,
      companies: state.companies.map((company) => company.id !== active.id ? company : ({ ...company, cash: company.cash - onboardingCost, employerBrand: clamp((company.employerBrand ?? 35) + .6), employees: [...company.employees, { ...candidate, id: Date.now(), department: candidate.department ?? inferDepartment(candidate.role), memories: addCharacterMemory(candidate.memories, characterMemory(state.week, "contratacao", "Você apostou em mim e abriu as portas desta empresa.", "confiante", 7, 72)) }], workforceTarget: Math.max(company.workforceTarget ?? company.employees.length, company.employees.length + 1) })),
      staffAlerts: (state.staffAlerts ?? []).map((alert) => alert.companyId === active.id && !alert.resolved ? { ...alert, resolved: true } : alert),
      financialLedger: [{ id: `${state.week}-${active.id}-hire-${Date.now()}`, week: state.week, companyId: active.id, companyName: active.name, category: "equipe", label: `Contratação de ${candidate.name}`, amount: -onboardingCost, detail: `Recrutamento, integração e bônus de entrada de ${money.format(candidate.signingBonus ?? 0)}.` }, ...(state.financialLedger ?? [])].slice(0, 180),
    }, { pessoas: 1 }, `contratação de ${candidate.name}`));
    setDialog(null);
    notify(`${candidate.name} aceitou. Integração custou ${money.format(onboardingCost)}.`);
  };

  const upgradeFacility = (key: FacilityKey) => {
    if (!active || !isCEO) return;
    const currentFacility = normalizedFacilities(active)[key];
    if (currentFacility.level >= 5) return;
    const nextLevel = (currentFacility.level + 1) as FacilityLevel;
    const cost = facilityDefinitions[key].upgradeCosts[nextLevel];
    if (active.cash < cost) return;
    setGame((state) => ({
      ...state,
      companies: state.companies.map((company) => company.id !== active.id ? company : ({
        ...company,
        cash: company.cash - cost,
        facilities: { ...company.facilities, [key]: { ...currentFacility, level: nextLevel, condition: 100, lastUpgradeWeek: state.week } },
        employees: company.employees.map((employee) => ({ ...employee, morale: clamp(employee.morale + (key === "lazer" || key === "beneficios" ? 4 : 1)), loyalty: clamp(employee.loyalty + (key === "beneficios" || key === "treinamento" ? 3 : 0)) })),
      })),
      financialLedger: [{ id: `${state.week}-${active.id}-facility-${key}-${Date.now()}`, week: state.week, companyId: active.id, companyName: active.name, category: "estrutura", label: `${facilityDefinitions[key].label} · nível ${nextLevel}`, amount: -cost, detail: "Investimento físico com manutenção semanal permanente." }, ...(state.financialLedger ?? [])].slice(0, 180),
      news: [{ id: Date.now(), week: state.week, category: "negocios", headline: `${active.name} inaugura ${facilityDefinitions[key].short.toLowerCase()} de nível ${nextLevel}`, body: `A empresa investiu ${money.format(cost)}. A melhoria começa a afetar a operação imediatamente, mas cria uma nova despesa semanal de manutenção.`, impact: "positivo" }, ...state.news].slice(0, 60),
    }));
    notify(`${facilityDefinitions[key].label} chegou ao nível ${nextLevel}.`);
  };

  const changeFacilityMaintenance = (mode: FacilityMaintenanceMode) => {
    if (!active || !isCEO) return;
    updateActive((company) => ({ ...company, facilityMaintenanceMode: mode }));
    notify(`${facilityModeLabels[mode].label} selecionada.`);
  };

  const repairFacility = (key: FacilityKey) => {
    if (!active || !isCEO) return;
    const facility = normalizedFacilities(active)[key];
    if (facility.level === 0 || facility.condition >= 98) return;
    const cost = 8000 + facility.level * 6000;
    if (active.cash < cost) return;
    setGame((state) => ({
      ...state,
      companies: state.companies.map((company) => company.id !== active.id ? company : ({ ...company, cash: company.cash - cost, facilities: { ...company.facilities, [key]: { ...facility, condition: clamp(facility.condition + 35) } } })),
      financialLedger: [{ id: `${state.week}-${active.id}-repair-${key}-${Date.now()}`, week: state.week, companyId: active.id, companyName: active.name, category: "estrutura", label: `Reparo de ${facilityDefinitions[key].short.toLowerCase()}`, amount: -cost, detail: "Recuperação emergencial da condição física." }, ...(state.financialLedger ?? [])].slice(0, 180),
    }));
    notify(`${facilityDefinitions[key].short} recebeu reparos.`);
  };

  const appointDirector = (employee: Employee, area: DirectorArea, external = false) => {
    if (!active || !isCEO || (active.directors ?? []).some((director) => director.area === area)) return;
    const hiringCost = external ? 25000 + (employee.signingBonus ?? 0) : 12000;
    if (active.cash < hiringCost) return;
    const promotedSalary = Math.round(Math.max(employee.salary * (external ? 1.48 : 1.25), employee.market * 1.08) / 100) * 100;
    const appointmentId = Date.now();
    const director: CompanyDirector = { id: `director-${active.id}-${area}-${appointmentId}`, employeeId: external ? appointmentId : employee.id, name: employee.name, area, style: directorStyle(employee), competence: employee.skill, trust: clamp(employee.relation * .55 + employee.loyalty * .45), authority: external ? 42 : 50, weeks: 0, lastAction: "Assumiu a diretoria e iniciou conversas com a equipe.", origin: external ? "contratado" : "promovido" };
    setGame((state) => ({
      ...state,
      companies: state.companies.map((company) => company.id !== active.id ? company : {
        ...company,
        cash: company.cash - hiringCost,
        directors: [...(company.directors ?? []), director],
        employees: external
          ? [...company.employees, { ...employee, id: director.employeeId, salary: promotedSalary, market: promotedSalary, role: `Diretor de ${directorAreaLabels[area]}`, department: area, morale: 72, loyalty: 58, relation: 55, stress: 24, weeks: 0, memories: [characterMemory(state.week, "contratacao", `Fui contratado para liderar ${directorAreaLabels[area]} na ${company.name}.`, "confiante", 6, 75)] }]
          : company.employees.map((person) => person.id === employee.id ? { ...person, salary: promotedSalary, market: Math.max(person.market, promotedSalary), role: `Diretor de ${directorAreaLabels[area]}`, department: area, morale: clamp(person.morale + 8), loyalty: clamp(person.loyalty + 6), relation: clamp(person.relation + 7), memories: addCharacterMemory(person.memories, characterMemory(state.week, "promocao", `Você confiou em mim para dirigir ${directorAreaLabels[area]}.`, "orgulhoso", 10, 88)) } : { ...person, morale: clamp(person.morale + (person.department === area || inferDepartment(person.role) === area ? 2 : 0)) }),
      }),
      financialLedger: [{ id: `${state.week}-${active.id}-director-${Date.now()}`, week: state.week, companyId: active.id, companyName: active.name, category: "equipe", label: `${external ? "Contratação" : "Promoção"} de diretor`, amount: -hiringCost, detail: `${employee.name} assumiu ${directorAreaLabels[area]} com salário de ${money.format(promotedSalary)}.` }, ...(state.financialLedger ?? [])].slice(0, 180),
      news: [{ id: Date.now(), week: state.week, category: "pessoas", headline: `${employee.name} assume diretoria na ${active.name}`, body: `${external ? "Contratado no mercado" : "Promovido internamente"}, o novo diretor liderará ${directorAreaLabels[area].toLowerCase()}. Seu estilo ${director.style} influenciará decisões, relações e desempenho da equipe.`, impact: "positivo" }, ...state.news].slice(0, 60),
    }));
    notify(`${employee.name} assumiu ${directorAreaLabels[area]}.`);
  };

  const removeDirector = (director: CompanyDirector) => {
    if (!active || !isCEO) return;
    setGame((state) => ({ ...state, companies: state.companies.map((company) => company.id !== active.id ? company : ({ ...company, directors: (company.directors ?? []).filter((item) => item.id !== director.id), employees: company.employees.map((employee) => employee.id === director.employeeId ? { ...employee, role: `Especialista sênior · ${directorAreaLabels[director.area]}`, morale: clamp(employee.morale - 12), loyalty: clamp(employee.loyalty - 10), relation: clamp(employee.relation - 14), memories: addCharacterMemory(employee.memories, characterMemory(state.week, "promocao", `Você me retirou da diretoria de ${directorAreaLabels[director.area]}.`, "magoado", -12, 90)) } : employee) })), news: [{ id: Date.now(), week: state.week, category: "pessoas", headline: `${director.name} deixa a diretoria da ${active.name}`, body: `A destituição abriu um vazio em ${directorAreaLabels[director.area].toLowerCase()} e abalou a confiança do antigo diretor.`, impact: "negativo" }, ...state.news].slice(0, 60) }));
    notify(`${director.name} foi retirado da diretoria.`);
  };

  const dismissEmployee = (employee: Employee) => {
    if (!active || !isCEO || active.employees.length <= 1) return;
    setGame((state) => ({
      ...state,
      reputation: clamp(state.reputation - 2),
      companies: state.companies.map((company) => company.id !== active.id ? company : ({ ...company, employees: company.employees.filter((person) => person.id !== employee.id), directors: (company.directors ?? []).filter((director) => director.employeeId !== employee.id), workforceTarget: Math.max(2, (company.workforceTarget ?? company.employees.length) - 1), reputation: clamp(company.reputation - 2), employerBrand: clamp((company.employerBrand ?? 35) - (employee.skill >= 77 ? 3 : 1.5)) })),
      staffAlerts: [{ id: `staff-${active.id}-${employee.id}-${state.week}`, companyId: active.id, companyName: active.name, employeeName: employee.name, role: employee.role, reason: "desligamento", week: state.week, responsible: currentLeader, headcountAfter: active.employees.length - 1 }, ...(state.staffAlerts ?? [])].slice(0, 20),
      news: [{ id: Date.now(), week: state.week, category: "pessoas", headline: `${employee.name} é desligado da ${active.name}`, body: `${currentLeader} decidiu encerrar o vínculo de ${employee.role.toLowerCase()}. A empresa precisará decidir se elimina a posição ou busca reposição.`, impact: "negativo" }, ...state.news].slice(0, 60),
    }));
    notify(`${employee.name} foi desligado. Um alerta de equipe foi criado.`);
  };

  const negotiateSalary = () => {
    if (!salaryEmployee || !active || !isCEO) return;
    const employee = active.employees.find((e) => e.id === salaryEmployee.id);
    if (!employee) return;
    const ambitionPremium =
      employee.trait === "Competitivo" || employee.trait === "Brilhante"
        ? 0.05
        : 0;
    const loyaltyDiscount = employee.loyalty > 78 ? 0.04 : 0;
    const memoryAdjustment = -characterMemoryScore(employee.memories, game.week) / 500;
    const publicLeadershipAdjustment = ((game.leadershipIdentity?.agressividade ?? 50) - (game.leadershipIdentity?.pessoas ?? 50)) / 900;
    const minimum =
      Math.round(
        Math.max(
          employee.salary * 0.98,
          employee.market * (0.88 + ambitionPremium - loyaltyDiscount + memoryAdjustment + publicLeadershipAdjustment),
        ) / 100,
      ) * 100;
    if (salaryOffer < minimum) {
      const counter = Math.round((minimum + employee.market) / 2 / 100) * 100;
      setGame((s) => ({
        ...s,
        companies: s.companies.map((company) => company.id !== active.id ? company : ({
          ...company,
          employees: company.employees.map((item) => item.id !== employee.id ? item : ({
            ...item,
            relation: clamp(item.relation - 2),
            memories: addCharacterMemory(item.memories, characterMemory(
              s.week,
              "salario",
              `Você ofereceu ${money.format(salaryOffer)}, abaixo do valor que considerei justo.`,
              "magoado",
              -5,
              62,
            )),
          })),
        })),
      }));
      setSalaryOffer(counter);
      setNegotiationNote(
        `${employee.name} recusou e fez uma contraproposta de ${money.format(counter)}. Você pode ajustar o valor e tentar novamente.`,
      );
      return;
    }
    const increase =
      (salaryOffer - employee.salary) / Math.max(1, employee.salary);
    updateActive((c) => ({
      ...c,
      employees: c.employees.map((e) =>
        e.id !== employee.id
          ? e
          : {
              ...e,
              salary: salaryOffer,
              morale: clamp(
                e.morale + (increase > 0.08 ? 9 : increase >= 0 ? 4 : -7),
              ),
              loyalty: clamp(e.loyalty + (increase >= 0 ? 5 : -5)),
              stress: Math.max(5, (e.stress ?? 20) - (increase > 0.05 ? 5 : 1)),
              relation: clamp(e.relation + (increase > 0.08 ? 7 : increase >= 0 ? 3 : -6)),
              memories: addCharacterMemory(e.memories, characterMemory(
                game.week,
                "salario",
                increase > 0.08
                  ? `Você valorizou meu trabalho com um aumento para ${money.format(salaryOffer)}.`
                  : increase >= 0
                    ? `Chegamos a um acordo de ${money.format(salaryOffer)} após negociar.`
                    : `Aceitei ganhar ${money.format(salaryOffer)}, mas considerei a redução injusta.`,
                increase > 0.08 ? "grato" : increase >= 0 ? "confiante" : "ressentido",
                increase > 0.08 ? 10 : increase >= 0 ? 4 : -11,
                increase > 0.08 ? 82 : 70,
              )),
            },
      ),
      financialLedger: cashDelta !== 0 ? [{ id: `${s.week}-${active.id}-product-${Date.now()}`, week: s.week, companyId: active.id, companyName: active.name, category: "eventos", label: `Produto: ${managedProduct.name}`, amount: cashDelta, detail: cashDelta < 0 ? "Investimento em desenvolvimento, proteção, suporte ou correção." : "Receita extraordinária ligada aos direitos do produto." }, ...(s.financialLedger ?? [])].slice(0, 180) : s.financialLedger,
    }));
    setGame((state) => evolveIdentity(
      { ...state, financialLedger: [{ id: `${state.week}-${active.id}-development-${Date.now()}`, week: state.week, companyId: active.id, companyName: active.name, category: "eventos", label: `Desenvolvimento de ${p.name}`, amount: -actualBudget, detail: p.kind === "produto" ? `Produto de complexidade ${complexity}/5.` : "Novo projeto iniciado." }, ...(state.financialLedger ?? [])].slice(0, 180) },
      { negociacao: 2, pessoas: increase > 0.08 ? 3 : increase >= 0 ? 1 : -3, prudencia: increase < 0 ? 2 : 0 },
      `acordo salarial com ${employee.name}`,
    ));
    setDialog(null);
    setSalaryEmployee(null);
    setNegotiationNote("");
    notify(`${employee.name} aceitou ${money.format(salaryOffer)} por mês.`);
  };

  const createProject = (kind: "seguro" | "ousado" | "marca") => {
    if (!isCEO || !active) return;
    const templates = {
      seguro: {
        name: "Melhoria contínua",
        budget: 9000,
        reward: 18000,
        risk: 15,
        quality: 62,
        kind: "melhoria" as const,
        recurring: 0,
      },
      ousado: {
        name: "Produto revolucionário",
        budget: 26000,
        reward: 35000,
        risk: 58,
        quality: 48,
        kind: "produto" as const,
        recurring: 18000,
      },
      marca: {
        name: "Campanha nacional",
        budget: 18000,
        reward: 22000,
        risk: 35,
        quality: 55,
        kind: "campanha" as const,
        recurring: 0,
      },
    };
    const p = templates[kind];
    const complexity = (kind === "ousado" ? 4 : 2) as 1 | 2 | 3 | 4 | 5;
    const blueprint = productBlueprint(active?.sector ?? "Tecnologia", complexity);
    const actualBudget = p.kind === "produto" ? blueprint.developmentCost : p.budget;
    if (active.cash < actualBudget) { notify(`A empresa precisa de ${money.format(actualBudget)} para iniciar este projeto.`); return; }
    updateActive((c) => ({
      ...c,
      cash: c.cash - actualBudget,
      projects: [
        ...c.projects,
        {
          ...p,
          budget: actualBudget,
          id: Date.now(),
          progress: 0,
          status: "ativo",
          lifecycle: p.kind === "produto" ? "desenvolvimento" : undefined,
          marketStage: p.kind === "produto" ? "lancamento" : undefined,
          marketWeeks: 0,
          productPrice: c.price,
          productMarketing: 0,
          version: 1,
          patented: false,
          rightsOwned: 100,
          royaltyRevenue: 0,
          ...(p.kind === "produto" ? { complexity, ...productBlueprint(c.sector, complexity), developmentCost: actualBudget, preparation: {}, bugLevel: 0, customerSatisfaction: 70, updateNeed: 0, supportLevel: 0, feedback: [] } : {}),
        },
      ],
    }));
    setGame((state) => evolveIdentity(
      state,
      kind === "ousado" ? { visao: 3, agressividade: 2, prudencia: -1 } : kind === "seguro" ? { prudencia: 3 } : { visao: 2, agressividade: 1 },
      `início do projeto ${p.name}`,
    ));
    setDialog(null);
    notify("O projeto começou. Sua equipe agora precisa entregá-lo.");
  };

  const openProductDecision = (product: Project) => {
    if (!isCEO || product.kind !== "produto")
      return;
    setSelectedProduct(product);
    setRightsOffer(null);
    setDialog("product");
  };

  const updateManagedProduct = (changes: Partial<Project>, cashDelta = 0) => {
    if (!active || !managedProduct || !isCEO) return;
    setGame((s) => ({
      ...s,
      companies: s.companies.map((c) =>
        c.id !== active.id
          ? c
          : {
              ...c,
              cash: c.cash + cashDelta,
              projects: c.projects.map((p) =>
                p.id === managedProduct.id ? { ...p, ...changes } : p,
              ),
            },
      ),
    }));
    setSelectedProduct((p) => (p ? { ...p, ...changes } : p));
  };

  const investProductPreparation = (kind: ProductPreparation) => {
    if (!active || !managedProduct || managedProduct.status !== "ativo") return;
    const level = managedProduct.preparation?.[kind] ?? 0;
    const base = productPreparationLabels[kind];
    const cost = base.cost * (level + 1);
    if (level >= 3 || active.cash < cost) return;
    const preparation = { ...(managedProduct.preparation ?? {}), [kind]: level + 1 };
    const changes: Partial<Project> = { preparation, risk: clamp(managedProduct.risk - (kind === "piloto" ? 7 : kind === "testes" || kind === "qualidade" ? 5 : 3)), quality: clamp(managedProduct.quality + (kind === "prototipo" || kind === "qualidade" ? 3 : 1)), supportLevel: kind === "suporte" ? (managedProduct.supportLevel ?? 0) + 1 : managedProduct.supportLevel };
    updateManagedProduct(changes, -cost);
    notify(`${base.label} recebeu ${money.format(cost)}. O risco caiu, mas não desapareceu.`);
  };

  const emergencyProductFix = () => {
    if (!active || !managedProduct) return;
    const cost = Math.round(18000 + (managedProduct.bugLevel ?? 0) * 850);
    if (active.cash < cost) return;
    updateManagedProduct({ bugLevel: clamp((managedProduct.bugLevel ?? 0) - 28 - (managedProduct.preparation?.testes ?? 0) * 4), updateNeed: clamp((managedProduct.updateNeed ?? 0) - 24), customerSatisfaction: clamp((managedProduct.customerSatisfaction ?? 70) + 6), emergencyWeeks: 0 }, -cost);
    setGame((state) => ({ ...state, news: [{ id: Date.now(), week: state.week, category: "negocios", headline: `${active.name} libera correção emergencial para ${managedProduct.name}`, body: `A força-tarefa custou ${money.format(cost)}. Bugs e reclamações caíram, mas a confiança será recuperada gradualmente.`, impact: "neutro" }, ...state.news].slice(0, 60) }));
    notify("A correção emergencial foi liberada.");
  };

  const investProductSupport = () => {
    if (!active || !managedProduct) return;
    const level = managedProduct.supportLevel ?? 0;
    const cost = 15000 * (level + 1);
    if (level >= 3 || active.cash < cost) return;
    updateManagedProduct({ supportLevel: level + 1, customerSatisfaction: clamp((managedProduct.customerSatisfaction ?? 70) + 5), bugLevel: clamp((managedProduct.bugLevel ?? 0) - 4), updateNeed: clamp((managedProduct.updateNeed ?? 0) - 7) }, -cost);
    notify(`Suporte pós-venda elevado ao nível ${level + 1}.`);
  };

  const launchProductVersion = (strategy: "economica" | "equilibrada" | "robusta") => {
    if (!active || !managedProduct || managedProduct.status !== "concluido") return;
    const costs = { economica: 20000, equilibrada: 40000, robusta: 70000 };
    const cost = costs[strategy];
    if (active.cash < cost) return;
    const danger = productVersionRisk(managedProduct, strategy);
    const roll = Math.random() * 100;
    const outcome: NonNullable<Project["lastVersionOutcome"]> = roll >= danger + 18 ? "melhoria" : roll >= danger ? "ignorada" : roll < danger * .22 ? "rejeitada" : roll < danger * .52 ? "bugs" : "canibalizacao";
    const changes: Partial<Project> = outcome === "melhoria" ? { version: (managedProduct.version ?? 1) + 1, quality: clamp(managedProduct.quality + 9), marketWeeks: 6, marketStage: "crescimento", bugLevel: clamp((managedProduct.bugLevel ?? 0) - 10), updateNeed: clamp((managedProduct.updateNeed ?? 0) - 25), customerSatisfaction: clamp((managedProduct.customerSatisfaction ?? 70) + 7), recurring: Math.round((managedProduct.recurring ?? 9000) * 1.12), lastVersionOutcome: outcome } : outcome === "ignorada" ? { version: (managedProduct.version ?? 1) + 1, recurring: Math.round((managedProduct.recurring ?? 9000) * .98), lastVersionOutcome: outcome } : outcome === "bugs" ? { version: (managedProduct.version ?? 1) + 1, bugLevel: clamp((managedProduct.bugLevel ?? 0) + 26), updateNeed: clamp((managedProduct.updateNeed ?? 0) + 22), customerSatisfaction: clamp((managedProduct.customerSatisfaction ?? 70) - 9), recurring: Math.round((managedProduct.recurring ?? 9000) * .9), emergencyWeeks: 3, lastVersionOutcome: outcome } : outcome === "rejeitada" ? { version: (managedProduct.version ?? 1) + 1, customerSatisfaction: clamp((managedProduct.customerSatisfaction ?? 70) - 18), recurring: Math.round((managedProduct.recurring ?? 9000) * .8), updateNeed: clamp((managedProduct.updateNeed ?? 0) + 18), lastVersionOutcome: outcome } : { version: (managedProduct.version ?? 1) + 1, quality: clamp(managedProduct.quality + 4), recurring: Math.round((managedProduct.recurring ?? 9000) * .74), customerSatisfaction: clamp((managedProduct.customerSatisfaction ?? 70) - 5), lastVersionOutcome: outcome };
    setGame((state) => ({ ...state, companies: state.companies.map((company) => company.id !== active.id ? company : { ...company, cash: company.cash - cost, customers: Math.max(1, company.customers + (outcome === "melhoria" ? 3 : outcome === "rejeitada" ? -5 : outcome === "bugs" ? -2 : 0)), reputation: clamp(company.reputation + (outcome === "melhoria" ? 3 : outcome === "rejeitada" ? -6 : outcome === "bugs" ? -3 : 0)), projects: company.projects.map((product) => product.id === managedProduct.id ? { ...product, ...changes } : product) }), news: [{ id: Date.now(), week: state.week, category: "negocios", headline: outcome === "melhoria" ? `${managedProduct.name} acerta em nova versão` : `Nova versão de ${managedProduct.name} termina ${outcome}`, body: `A estratégia ${strategy} custou ${money.format(cost)}. O risco calculado de problema era ${Math.round(danger)}% e o mercado respondeu com ${outcome}.`, impact: outcome === "melhoria" ? "positivo" : outcome === "ignorada" ? "neutro" : "negativo" }, ...state.news].slice(0, 60), financialLedger: [{ id: `${state.week}-${active.id}-version-${Date.now()}`, week: state.week, companyId: active.id, companyName: active.name, category: "eventos", label: `Nova versão de ${managedProduct.name}`, amount: -cost, detail: `Estratégia ${strategy}; resultado: ${outcome}.` }, ...(state.financialLedger ?? [])].slice(0, 180) }));
    setSelectedProduct((product) => product ? { ...product, ...changes } : product);
    notify(`A nova versão foi ${outcome}.`);
  };

  const patentProduct = () => {
    if (
      !active ||
      !managedProduct ||
      managedProduct.patented ||
      active.cash < 45000
    )
      return;
    updateManagedProduct({ patented: true }, -45000);
    notify(
      "Patente registrada. Cópias e disputas futuras ficam mais fáceis de combater.",
    );
  };

  const licenseProduct = () => {
    if (!active || !managedProduct || managedProduct.licensee) return;
    const buyers = game.competitors.filter(
      (r) =>
        r.sector === active.sector &&
        !["fechada", "vendida"].includes(r.status),
    );
    const buyer = buyers[Math.floor(Math.random() * buyers.length)];
    if (!buyer) return;
    const upfront = Math.round(
      managedProduct.quality * 1100 + (managedProduct.patented ? 35000 : 0),
    );
    const royalty = Math.round((managedProduct.recurring ?? 9000) * 0.18);
    updateManagedProduct(
      {
        licensee: buyer.name,
        royaltyRevenue: (managedProduct.royaltyRevenue ?? 0) + royalty,
      },
      upfront,
    );
    setGame((s) => ({
      ...s,
      competitors: s.competitors.map((r) =>
        r.id === buyer.id
          ? {
              ...r,
              products: [
                ...(r.products ?? []),
                {
                  id: Date.now(),
                  name: `${managedProduct.name} — licença`,
                  quality: managedProduct.quality * 0.88,
                  stage: "lançamento" as const,
                },
              ].slice(-5),
              cash: (r.cash ?? 0) - upfront,
            }
          : r,
      ),
      news: [
        {
          id: Date.now(),
          week: s.week,
          category: "negocios",
          headline: `${active.name} licencia ${managedProduct.name} para ${buyer.name}`,
          body: `O acordo gera ${money.format(upfront)} agora e royalties estimados de ${money.format(royalty)} por semana, sem transferir a propriedade do produto.`,
          impact: "positivo",
        },
        ...s.news,
      ].slice(0, 50),
    }));
    notify(`Licença assinada com ${buyer.name}.`);
  };

  const sellPartialRights = () => {
    if (!active || !managedProduct || (managedProduct.rightsOwned ?? 100) <= 50)
      return;
    const buyer = game.competitors.find(
      (r) =>
        r.sector === active.sector &&
        !["fechada", "vendida"].includes(r.status),
    );
    if (!buyer) return;
    const soldShare = 25;
    const value = Math.round(
      productWeeklyRevenue(managedProduct) * 22 + managedProduct.quality * 700,
    );
    updateManagedProduct(
      { rightsOwned: (managedProduct.rightsOwned ?? 100) - soldShare },
      value,
    );
    setGame((s) => ({
      ...s,
      competitors: s.competitors.map((r) =>
        r.id === buyer.id
          ? {
              ...r,
              cash: (r.cash ?? 0) - value,
              relation: clamp((r.relation ?? 0) + 8, -100, 100),
            }
          : r,
      ),
      news: [
        {
          id: Date.now(),
          week: s.week,
          category: "negocios",
          headline: `${active.name} vende 25% dos direitos de ${managedProduct.name}`,
          body: `${buyer.name} entra como sócia do produto por ${money.format(value)}. Sua empresa mantém a operação e ${Math.max(0, (managedProduct.rightsOwned ?? 100) - soldShare)}% dos direitos econômicos.`,
          impact: "neutro",
        },
        ...s.news,
      ].slice(0, 50),
    }));
    notify(`25% dos direitos vendidos para ${buyer.name}.`);
  };

  const productLegalAction = (action: "acordo" | "defesa" | "processar") => {
    if (!active || !managedProduct) return;
    if (action === "acordo") {
      if (active.cash < 50000) return;
      updateManagedProduct(
        { lawsuitWeeks: 0, legalOpponent: undefined },
        -50000,
      );
      notify("Acordo judicial assinado. A disputa foi encerrada.");
      return;
    }
    const cost = action === "defesa" ? 25000 : 30000;
    if (active.cash < cost) return;
    const opponent =
      action === "processar"
        ? game.competitors.find(
            (r) =>
              r.sector === active.sector &&
              !["fechada", "vendida"].includes(r.status),
          )
        : game.competitors.find((r) => r.name === managedProduct.legalOpponent);
    const winChance =
      (managedProduct.patented ? 0.72 : 0.34) + managedProduct.quality / 500;
    const won = Math.random() < winChance;
    const award = won ? Math.round(45000 + managedProduct.quality * 1200) : 0;
    updateManagedProduct(
      { lawsuitWeeks: 0, legalOpponent: undefined },
      award - cost,
    );
    if (opponent)
      setGame((s) => ({
        ...s,
        competitors: s.competitors.map((r) =>
          r.id === opponent.id
            ? {
                ...r,
                cash: (r.cash ?? 0) - award,
                relation: -80,
                relationship: "rival" as const,
              }
            : r,
        ),
        news: [
          {
            id: Date.now(),
            week: s.week,
            category: "negocios",
            headline: won
              ? `${active.name} vence disputa sobre ${managedProduct.name}`
              : `${active.name} perde batalha judicial de propriedade intelectual`,
            body: won
              ? `A decisão reconheceu os direitos da empresa e determinou indenização de ${money.format(award)}.`
              : "A Justiça rejeitou a tese apresentada. Custas e desgaste de reputação ficam com a empresa.",
            impact: won ? "positivo" : "negativo",
          },
          ...s.news,
        ].slice(0, 50),
      }));
    notify(
      won
        ? `Vitória judicial: ${money.format(award)} em indenização.`
        : "A empresa perdeu a disputa judicial.",
    );
  };

  const discontinueProduct = () => {
    if (!active || !managedProduct) return;
    const contribution = productWeeklyRevenue(managedProduct);
    const possibleBuyers = game.competitors.filter(
      (r) =>
        r.sector === active.sector &&
        !["fechada", "vendida"].includes(r.status),
    );
    const buyer = possibleBuyers.length
      ? possibleBuyers[Math.floor(Math.random() * possibleBuyers.length)].name
      : ["Horizonte IP", "Grupo Meridian", "Orbe Participações"][
          Math.floor(Math.random() * 3)
        ];
    const offer = Math.round(
      contribution * (18 + Math.random() * 18) + managedProduct.quality * 950,
    );
    const receivesOffer = managedProduct.quality >= 58 && Math.random() < 0.58;
    updateActive((c) => ({
      ...c,
      productRevenue: Math.max(0, (c.productRevenue ?? 0) - contribution),
      projects: c.projects.map((p) =>
        p.id === managedProduct.id
          ? { ...p, lifecycle: "fora_de_linha", productMarketing: 0 }
          : p,
      ),
    }));
    if (receivesOffer) {
      setRightsOffer({ buyer, value: offer });
      notify(`${buyer} demonstrou interesse nos direitos do produto.`);
    } else {
      setDialog(null);
      setSelectedProduct(null);
      notify(
        "Produto retirado do mercado. Nenhuma proposta pelos direitos apareceu.",
      );
    }
  };

  const sellProductRights = () => {
    if (!active || !selectedProduct || !rightsOffer) return;
    const transactionCosts = Math.round(rightsOffer.value * .08 + 4000);
    const rightsNet = Math.max(0, rightsOffer.value - transactionCosts);
    setGame((s) => ({
      ...s,
      companies: s.companies.map((c) =>
        c.id !== active.id
          ? c
          : {
              ...c,
              cash: c.cash + rightsNet,
              projects: c.projects.map((p) =>
                p.id === selectedProduct.id
                  ? { ...p, lifecycle: "direitos_vendidos" }
                  : p,
              ),
            },
      ),
      news: [
        {
          id: Date.now(),
          week: s.week,
          category: "negocios",
          headline: `${active.name} vende direitos de ${selectedProduct.name} para ${rightsOffer.buyer}`,
          body: `A transação bruta de ${money.format(rightsOffer.value)} deixou ${money.format(rightsNet)} após impostos e custos jurídicos, encerrando a exploração do produto pela empresa.`,
          impact: "positivo",
        },
        ...s.news,
      ].slice(0, 50),
    }));
    setGame((state) => evolveIdentity(state, { negociacao: 3, prudencia: 2, visao: -1 }, `venda dos direitos de ${selectedProduct.name}`));
    setDialog(null);
    setSelectedProduct(null);
    setRightsOffer(null);
    notify("Direitos vendidos. O comprador agora controla o produto.");
  };

  const sellCompany = () => {
    if (!active || !metrics || !isCEO) return;
    const offer = Math.round(metrics.valuation * (0.9 + Math.random() * 0.45));
    const settlement = saleSettlement(offer);
    const buyer = [
      "Grupo Meridian",
      "Northstar Capital",
      "Horizonte Participações",
      "Fundo Aurora",
      "Vértice Global",
    ][Math.floor(Math.random() * 5)];
    setGame((s) => ({
      ...s,
      personalCash: s.personalCash + settlement.net,
      companies: s.companies.map((c) =>
        c.id === active.id ? { ...c, sold: true, buyer } : c,
      ),
      lastOffer: offer,
      chapter: Math.max(4, s.chapter),
      legacy: s.legacy + Math.round(active.reputation / 8),
      news: [
        {
          id: Date.now(),
          week: s.week,
          category: "negocios",
          headline: `${buyer} compra ${active.name} por ${compact.format(offer)}`,
          body: `Após ${money.format(settlement.taxes)} em tributos e ${money.format(settlement.advisory)} em assessoria, ${money.format(settlement.net)} chegaram ao patrimônio pessoal. Funcionários aguardam detalhes sobre a transição.`,
          impact: "neutro",
        },
        ...s.news,
      ].slice(0, 50),
    }));
    setGame((state) => evolveIdentity(state, { negociacao: 4, prudencia: 3, visao: -1 }, `venda da ${active.name}`));
    setDialog(null);
    setView("portfolio");
    notify(`Venda concluída: ${money.format(settlement.net)} líquidos.`);
  };

  const foundCompany = (sector: Sector) => {
    const cost =
      game.companies.length === 1
        ? 180000
        : 260000 + game.companies.length * 50000;
    if (game.personalCash < cost) return;
    const id = Date.now();
    const company = {
      ...newCompany(sector, id, game.week),
      cash: Math.round(cost * 0.65),
      name: companyName.trim() || sectorData[sector].company,
      ceo: currentLeader,
    };
    setGame((s) => ({
      ...s,
      personalCash: s.personalCash - cost,
      companies: [...s.companies, company],
      activeCompanyId: id,
      competitors: [...s.competitors, ...generateCompetitors(sector, id)].slice(
        -8,
      ),
      chapter: Math.max(4, s.chapter),
      log: [`Você fundou a ${company.name}.`, ...s.log],
      news: [
        {
          id: Date.now(),
          week: s.week,
          category: "negocios",
          headline: `Empreendedor retorna ao mercado com a nova ${company.name}`,
          body: `Depois de experiências anteriores, o fundador agora aposta no setor de ${sector.toLowerCase()}. Concorrentes acompanham a movimentação.`,
          impact: "positivo",
        },
        ...s.news,
      ].slice(0, 50),
    }));
    setGame((state) => evolveIdentity(state, { visao: 4, agressividade: 3, prudencia: -1 }, `abertura da ${company.name}`));
    setCompanyName("");
    setDialog(null);
    setView("escritorio");
    notify("Um novo capítulo começou.");
  };

  const declareBankruptcy = () => {
    if (!active || !isCEO || active.sold || active.bankrupt) return;
    const personalGuarantee = Math.min(
      game.personalCash,
      Math.max(0, Math.round(active.debt * 0.18)),
    );
    setGame((s) => ({
      ...s,
      personalCash: Math.max(0, s.personalCash - personalGuarantee),
      reputation: Math.max(0, s.reputation - 9),
      legacy: Math.max(0, s.legacy - 4),
      companies: s.companies.map((c) =>
        c.id !== active.id
          ? c
          : {
              ...c,
              bankrupt: true,
              cash: 0,
              customers: 0,
              reputation: 0,
              employees: [],
              projects: [],
              history: [...c.history, 0],
            },
      ),
      news: [
        {
          id: Date.now(),
          week: s.week,
          category: "negocios",
          headline: `${active.name} decreta falência após não conseguir honrar compromissos`,
          body: `A empresa encerrou operações. Credores assumirão os ativos e ${personalGuarantee > 0 ? `${money.format(personalGuarantee)} do patrimônio pessoal foi comprometido por garantias.` : "o patrimônio pessoal do fundador foi preservado."}`,
          impact: "negativo",
        },
        ...s.news,
      ].slice(0, 50),
      log: [`Falência da ${active.name} decretada.`, ...s.log],
    }));
    setGame((state) => evolveIdentity(state, { prudencia: -5, integridade: 2, agressividade: -2 }, `falência da ${active.name}`));
    setSpeed(0);
    setDialog(null);
    setView("portfolio");
    notify("A empresa encerrou. Sua carreira empresarial continua.");
  };

  const recoveryAction = (kind: "bridge" | "restructure" | "investor") => {
    if (!active || !isCEO || active.sold || active.bankrupt) return;
    setGame((s) => ({
      ...s,
      companies: s.companies.map((c) => {
        if (c.id !== active.id) return c;
        if (kind === "bridge")
          return {
            ...c,
            cash: c.cash + 130000,
            debt: c.debt + 175000,
            employees: c.employees.map((e) => ({
              ...e,
              morale: clamp(e.morale - 3),
            })),
          };
        if (kind === "investor")
          return {
            ...c,
            cash: c.cash + 220000,
            reputation: clamp(c.reputation + 4),
            employees: c.employees.map((e) => ({
              ...e,
              loyalty: clamp(e.loyalty - 4),
            })),
          };
        const sorted = [...c.employees].sort((a, b) => a.skill - b.skill);
        const dismissed = new Set(
          sorted
            .slice(0, Math.max(1, Math.floor(c.employees.length * 0.3)))
            .map((e) => e.id),
        );
        return {
          ...c,
          cash: c.cash + 45000,
          marketing: Math.round(c.marketing * 0.45),
          employees: c.employees
            .filter((e) => !dismissed.has(e.id))
            .map((e) => ({
              ...e,
              morale: clamp(e.morale - 14),
              stress: clamp((e.stress ?? 20) + 13),
            })),
        };
      }),
      reputation: kind === "investor" ? s.reputation + 2 : s.reputation,
      news: [
        {
          id: Date.now(),
          week: s.week,
          category: "negocios",
          headline:
            kind === "bridge"
              ? `${active.name} obtém crédito emergencial`
              : kind === "investor"
                ? `Investidor injeta capital na ${active.name}`
                : `${active.name} anuncia reestruturação e cortes`,
          body:
            kind === "bridge"
              ? "A empresa ganhou fôlego, mas assumiu uma dívida pesada."
              : kind === "investor"
                ? "O aporte preserva a operação, embora o fundador tenha cedido parte relevante do controle."
                : "A redução de custos melhora o caixa, mas abalou o clima interno.",
          impact: kind === "restructure" ? "negativo" : "neutro",
        },
        ...s.news,
      ].slice(0, 50),
    }));
    setGame((state) => evolveIdentity(
      state,
      kind === "restructure" ? { prudencia: 4, pessoas: -6, agressividade: 2 } : kind === "bridge" ? { prudencia: -2, agressividade: 2 } : { negociacao: 2, prudencia: 1 },
      `recuperação ${kind} na ${active.name}`,
    ));
    setDialog(null);
    notify("O caixa ganhou fôlego. O preço aparecerá nas próximas semanas.");
  };

  const acquireRival = (mode: "subsidiary" | "merge") => {
    if (!active || !targetRival || !isCEO) return;
    const price = Math.round(
      targetRival.score * 17500 + targetRival.reputation * 4200,
    );
    if (active.cash < price) return;
    const rival = targetRival;
    setGame((s) => {
      const acquiredCompany = {
        ...newCompany(rival.sector, Date.now(), s.week),
        name: rival.name,
        cash: Math.round(price * 0.08),
        customers: Math.round(rival.score * 14),
        reputation: rival.reputation,
        culture: "Integração",
        parentCompanyId: active.id,
        acquisitionPrice: price,
        origin: "adquirida" as const,
        ceo: s.playerExecutive ?? s.founder,
        productRevenue: (rival.products ?? []).reduce(
          (sum, product) => sum + Math.round(product.quality * 115),
          0,
        ),
        projects: (rival.products ?? []).map((product) => ({
          id: Date.now() + product.id,
          name: product.name,
          progress: 100,
          quality: product.quality,
          budget: 0,
          reward: 0,
          risk: 12,
          status: "concluido" as const,
          kind: "produto" as const,
          recurring: Math.round(product.quality * 115),
          lifecycle: "mercado" as const,
          marketStage:
            product.stage === "lançamento"
              ? ("lancamento" as const)
              : product.stage === "crescimento"
                ? ("crescimento" as const)
                : product.stage === "maduro"
                  ? ("maturidade" as const)
                  : ("declinio" as const),
          marketWeeks:
            product.stage === "lançamento"
              ? 1
              : product.stage === "crescimento"
                ? 8
                : product.stage === "maduro"
                  ? 20
                  : 34,
          productPrice: sectorData[rival.sector].price,
          productMarketing: 0,
          version: 1,
          patented: false,
          rightsOwned: 100,
          royaltyRevenue: 0,
        })),
      };
      return {
        ...s,
        activeCompanyId: s.activeCompanyId,
        holdingName: s.holdingName || `Grupo ${s.founder}`,
        competitors: s.competitors.map((r) =>
          r.id === rival.id
            ? {
                ...r,
                status: "vendida" as const,
                score: Math.round(r.score * 0.65),
                acquiredBy: s.holdingName,
                lastDecision: `Foi adquirida pela ${s.holdingName}`,
                history: [
                  `Semana ${s.week}: aquisição pela ${s.holdingName}.`,
                  ...(r.history ?? []),
                ].slice(0, 8),
              }
            : r,
        ),
        companies:
          mode === "subsidiary"
            ? [
                ...s.companies.map((c) =>
                  c.id === active.id ? { ...c, cash: c.cash - price } : c,
                ),
                acquiredCompany,
              ]
            : s.companies.map((c) =>
                c.id !== active.id
                  ? c
                  : {
                      ...c,
                      cash: c.cash - price,
                      customers: c.customers + acquiredCompany.customers,
                      reputation: clamp(
                        c.reputation + Math.round(rival.reputation * 0.18),
                      ),
                      employees: [
                        ...c.employees,
                        ...acquiredCompany.employees.map((e) => ({
                          ...e,
                          id: Date.now() + e.id,
                          morale: clamp(e.morale - 7),
                          stress: clamp((e.stress ?? 20) + 12),
                        })),
                      ],
                    },
              ),
        reputation: s.reputation + 5,
        legacy: s.legacy + 7,
        news: [
          {
            id: Date.now(),
            week: s.week,
            category: "negocios",
            headline: `${active.name} compra ${rival.name} por ${compact.format(price)}`,
            body:
              mode === "subsidiary"
                ? "A antiga concorrente continuará operando como empresa independente dentro do grupo."
                : "As operações serão incorporadas, criando oportunidades e uma difícil integração de equipes.",
            impact: "positivo",
          },
          ...s.news,
        ].slice(0, 50),
      };
    });
    setGame((state) => evolveIdentity(state, { agressividade: 5, visao: 3, negociacao: 2, prudencia: -2 }, `aquisição da ${rival.name}`));
    setTargetRival(null);
    setDialog(null);
    setView(mode === "subsidiary" ? "portfolio" : "escritorio");
    notify("Aquisição concluída. Agora começa a integração.");
  };

  const acceptCapital = (
    provider: CapitalProvider,
    plan: "conservador" | "agressivo",
  ) => {
    if (!active || !isCEO || active.sold || active.bankrupt) return;
    const valuation = companyMetrics(active, game.economy).valuation;
    const bank = provider.kind === "banco";
    const investment = bank
      ? Math.max(160000, Math.round(valuation * 0.18))
      : Math.max(
          220000,
          Math.round(valuation * (plan === "agressivo" ? 0.34 : 0.22)),
        );
    const equity = bank
      ? 0
      : Math.min(
          38,
          Math.max(
            8,
            Math.round((investment / (valuation + investment)) * 100),
          ),
        );
    const target =
      plan === "agressivo"
        ? ("valor" as const)
        : provider.kind === "banco"
          ? ("lucro" as const)
          : ("receita" as const);
    const currentMetric =
      target === "valor"
        ? valuation
        : target === "receita"
          ? (metrics?.revenue ?? 0)
          : Math.max(10000, metrics?.profit ?? 0);
    const targetValue = Math.round(
      currentMetric * (plan === "agressivo" ? 1.65 : 1.3),
    );
    setGame((s) => ({
      ...s,
      companies: s.companies.map((c) =>
        c.id !== active.id
          ? c
          : {
              ...c,
              cash: c.cash + investment,
              debt: bank ? c.debt + Math.round(investment * 1.28) : c.debt,
              founderEquity: Math.max(5, (c.founderEquity ?? 100) - equity),
              boardSupport: clamp(
                (c.boardSupport ?? 82) + (provider.patience - 50) / 5,
              ),
              investors: bank
                ? c.investors
                : [
                    ...(c.investors ?? []),
                    {
                      providerId: provider.id,
                      name: provider.name,
                      representative: provider.representative,
                      equity,
                      boardSeats:
                        plan === "agressivo" || provider.control > 65 ? 1 : 0,
                      support: provider.patience,
                      invested: investment,
                      deadline: s.week + (plan === "agressivo" ? 7 : 11),
                      target,
                      targetValue,
                      lastReview: s.week,
                    },
                  ],
            },
      ),
      news: [
        {
          id: Date.now(),
          week: s.week,
          category: "negocios",
          headline: bank
            ? `${active.name} fecha linha de crédito com ${provider.name}`
            : `${provider.name} investe ${compact.format(investment)} na ${active.name}`,
          body: bank
            ? "O contrato preserva o controle do fundador, mas inclui juros, garantias e obrigações financeiras."
            : `${provider.representative} passa a acompanhar a gestão${plan === "agressivo" ? " com assento no conselho e metas agressivas" : ""}.`,
          impact: "positivo",
        },
        ...s.news,
      ].slice(0, 50),
    }));
    setGame((state) => evolveIdentity(
      state,
      bank || plan === "conservador" ? { prudencia: 3, negociacao: 1 } : { agressividade: 3, visao: 2, prudencia: -1 },
      `captação com ${provider.name}`,
    ));
    setDialog(null);
    notify(
      bank
        ? "Crédito liberado. O banco acompanhará seu caixa."
        : "Aporte concluído. Agora você responde a novos sócios.",
    );
  };

  const boardAction = (
    action: "dividend" | "buyback" | "campaign" | "return",
  ) => {
    if (!active) return;
    setGame((s) => ({
      ...s,
      personalCash:
        action === "dividend"
          ? s.personalCash +
            Math.max(
              0,
              Math.round(
                active.cash * 0.04 * ((active.founderEquity ?? 100) / 100),
              ),
            )
          : s.personalCash,
      ceoComebacks:
        action === "return" ? (s.ceoComebacks ?? 0) + 1 : s.ceoComebacks,
      companies: s.companies.map((c) => {
        if (c.id !== active.id) return c;
        if (action === "dividend")
          return {
            ...c,
            cash: c.cash - Math.max(0, Math.round(c.cash * 0.08)),
            boardSupport: clamp((c.boardSupport ?? 50) + 8),
            investors: (c.investors ?? []).map((i) => ({
              ...i,
              support: clamp(i.support + 8),
            })),
          };
        if (action === "buyback")
          return {
            ...c,
            cash: c.cash - 120000,
            founderEquity: Math.min(100, (c.founderEquity ?? 100) + 6),
            boardSupport: clamp((c.boardSupport ?? 50) - 5),
            investors: (c.investors ?? []).map((i) => ({
              ...i,
              equity: Math.max(0, i.equity - 3),
              support: clamp(i.support - 7),
            })),
          };
        if (action === "campaign")
          return {
            ...c,
            cash: c.cash - 35000,
            boardSupport: clamp((c.boardSupport ?? 50) + 14),
            investors: (c.investors ?? []).map((i) => ({
              ...i,
              support: clamp(i.support + 11),
            })),
          };
        return {
          ...c,
          ceo: s.playerExecutive ?? s.founder,
          boardSupport: 42,
          cash: c.cash - 80000,
          investors: (c.investors ?? []).map((i) => ({
            ...i,
            support: clamp(i.support - 4),
          })),
        };
      }),
      news: [
        {
          id: Date.now(),
          week: s.week,
          category: "negocios",
          headline:
            action === "return"
              ? `${s.playerExecutive ?? s.founder} retoma comando da ${active.name}`
              : `Conselho da ${active.name} aprova nova deliberação`,
          body:
            action === "dividend"
              ? "Acionistas receberam dividendos e reduziram a pressão sobre a gestão."
              : action === "buyback"
                ? "A recompra aumentou a participação da liderança familiar, mas consumiu caixa relevante."
                : action === "campaign"
                  ? "A liderança iniciou uma rodada de reuniões para reconstruir apoio político."
                  : "Após articular votos e apresentar um plano, a geração atual voltou à cadeira de CEO.",
          impact: action === "return" ? "positivo" : "neutro",
        },
        ...s.news,
      ].slice(0, 50),
    }));
    setDialog(null);
    notify("A decisão do conselho mudou o equilíbrio de poder.");
  };

  const openHoldingCompany = (company: Company) => {
    setHoldingCompanyId(company.id);
    setHoldingTab("ceo");
    setTransferTargetId(
      game.companies.find(
        (c) => c.id !== company.id && !c.sold && !c.bankrupt && !c.closed,
      )?.id ?? null,
    );
    setTransferAmount(50000);
    setDialog("holding-company");
  };

  const updateHoldingCompany = (changes: Partial<Company>) => {
    if (!holdingCompany) return;
    setGame((s) => ({
      ...s,
      companies: s.companies.map((c) =>
        c.id === holdingCompany.id ? { ...c, ...changes } : c,
      ),
    }));
  };

  const appointCompanyCEO = (name: string) => {
    if (!holdingCompany) return;
    if (holdingCompany.ceo !== currentLeader && holdingCompany.ceo !== name && (holdingCompany.ceoInfluence ?? 0) > 78 && (holdingCompany.boardSupport ?? 0) < 55) {
      notify(`${holdingCompany.ceo} tem apoio político suficiente para bloquear a troca. Reconstrua apoio no conselho.`);
      return;
    }
    const executive = executives.find((item) => item.name === name);
    const familyExecutive = heirs.find((item) => item.name === name);
    setGame((s) => ({
      ...s,
      heirs: (s.heirs ?? []).map((heir) =>
        heir.name === name && familyExecutive
          ? {
              ...heir,
              role: "ceo" as const,
              competence: clamp(heir.competence + 4),
              readiness: clamp(heir.readiness + 7),
              history: [
                `Semana ${s.week}: assumiu como CEO da ${holdingCompany.name}.`,
                ...heir.history,
              ].slice(0, 8),
              memories: addCharacterMemory(
                heir.memories,
                characterMemory(
                  s.week,
                  "sucessao",
                  `Você me confiou a gestão da ${holdingCompany.name}.`,
                  "orgulhoso",
                  10,
                  88,
                ),
              ),
            }
          : heir.name === holdingCompany.ceo && heir.role === "ceo"
            ? { ...heir, role: "conselho" as const }
            : heir,
      ),
      companies: s.companies.map((c) =>
        c.id !== holdingCompany.id
          ? c
          : {
              ...c,
              ceo: name,
              ceoStyle: executive?.style ?? familyExecutive?.style ?? c.ceoStyle,
              boardSupport: familyExecutive
                ? clamp((c.boardSupport ?? 50) + (familyExecutive.readiness - 45) / 4)
                : c.boardSupport,
              ceoTrust: name === (s.playerExecutive ?? s.founder) ? 100 : 65,
              ceoInfluence: name === (s.playerExecutive ?? s.founder) ? 10 : 18,
              ceoLoyalty: name === (s.playerExecutive ?? s.founder) ? 100 : (executive?.loyalty ?? (familyExecutive ? clamp(familyExecutive.bond * .62 + familyExecutive.readiness * .38) : 65)),
              ceoAmbition: name === (s.playerExecutive ?? s.founder) ? 25 : (executive?.ambition ?? familyExecutive?.ambition ?? 55),
              ceoReputation:
                name === (s.playerExecutive ?? s.founder) ? 65 : (executive?.reputation ?? familyExecutive?.competence ?? 60),
              ceoEquity: name === (s.playerExecutive ?? s.founder) ? 0 : c.ceoEquity ?? 0,
              ceoAllianceCompanyId: undefined,
              ceoRivalCompanyId: undefined,
              ceoDemandCooldown: 8,
              ceoProductCooldown: 4,
              ceoTenure: 0,
              ceoHiddenIssue: undefined,
              ceoHiddenWeeks: 0,
              ceoLastDecision:
                name === (s.playerExecutive ?? s.founder)
                  ? "A liderança da geração reassumiu a gestão direta"
                  : `${name} iniciou seu mandato`,
              ceoHistory: [
                `Semana ${s.week}: ${name} assumiu como CEO.`,
                ...(c.ceoHistory ?? []),
              ].slice(0, 8),
              ceoMemories: name === (s.playerExecutive ?? s.founder) ? [] : [
                characterMemory(
                  s.week,
                  "reconhecimento",
                  `Você me confiou o comando da ${c.name}.`,
                  "orgulhoso",
                  9,
                  84,
                ),
              ],
            },
      ),
      news: [
        {
          id: Date.now(),
          week: s.week,
          category: "negocios",
          headline: `${name} assume como CEO da ${holdingCompany.name}`,
          body: executive
            ? `${executive.label}: ${executive.profile}`
            : familyExecutive
              ? `A nova geração assume com perfil de ${familyExecutive.style} e ${Math.round(familyExecutive.readiness)}% de prontidão.`
            : "O fundador voltou à gestão direta da empresa.",
          impact: "neutro",
        },
        ...s.news,
      ].slice(0, 50),
    }));
    notify(
      name === currentLeader
        ? "Você reassumiu a gestão direta."
        : `${name} recebeu metas e autonomia operacional.`,
    );
  };

  const ceoOversightAction = (action: "auditoria" | "conselho") => {
    if (!holdingCompany) return;
    const cost = action === "auditoria" ? 20000 : 35000;
    if (holdingCompany.cash < cost) return;
    const foundIssue = action === "auditoria" && Boolean(holdingCompany.ceoHiddenIssue);
    setGame((s) => ({
      ...s,
      companies: s.companies.map((c) => c.id !== holdingCompany.id ? c : ({
        ...c,
        cash: c.cash - cost - (foundIssue ? 28000 : 0),
        ceoTrust: clamp((c.ceoTrust ?? 60) + (foundIssue ? -12 : action === "auditoria" ? 2 : 0)),
        ceoInfluence: clamp((c.ceoInfluence ?? 20) - (foundIssue ? 10 : action === "conselho" ? 7 : 1)),
        ceoLoyalty: clamp((c.ceoLoyalty ?? 60) - (foundIssue ? 8 : action === "conselho" ? 6 : 2)),
        boardSupport: clamp((c.boardSupport ?? 50) + (action === "conselho" ? 14 : foundIssue ? 5 : 1)),
        ceoLastDecision: foundIssue ? `Auditoria revelou: ${c.ceoHiddenIssue}` : c.ceoLastDecision,
        ceoMemories: addCharacterMemory(c.ceoMemories, characterMemory(
          s.week,
          foundIssue ? "conflito" : "poder",
          foundIssue
            ? "Você descobriu por auditoria o problema que eu não revelei."
            : action === "conselho"
              ? "Você articulou o conselho para limitar minha influência."
              : "Você auditou meus relatórios mesmo sem encontrar irregularidades.",
          foundIssue || action === "conselho" ? "ressentido" : "cauteloso",
          foundIssue ? -13 : action === "conselho" ? -10 : -3,
          foundIssue ? 96 : 78,
        )),
        ceoHiddenIssue: foundIssue ? undefined : c.ceoHiddenIssue,
        ceoHiddenWeeks: foundIssue ? 0 : c.ceoHiddenWeeks,
      })),
      auditCases: (s.auditCases ?? []).map((item) =>
        foundIssue &&
        item.companyId === holdingCompany.id &&
        item.status === "suspeita"
          ? {
              ...item,
              status: "comprovada" as const,
              evidence: Math.max(item.evidence, 78),
              outcome: "A auditoria de relatórios confirmou a irregularidade.",
            }
          : item,
      ),
      news: [{
        id: Date.now(), week: s.week, category: "negocios",
        headline: foundIssue ? `Auditoria antecipa problema na ${holdingCompany.name}` : action === "conselho" ? `Fundador reorganiza apoio no conselho da ${holdingCompany.name}` : "Auditoria não encontra irregularidades relevantes",
        body: foundIssue ? "A holding descobriu o problema antes que o impacto aumentasse, mas precisará pagar pela correção." : action === "conselho" ? "Reuniões com acionistas reduziram a autonomia política do CEO e fortaleceram o fundador." : "Os controles foram revisados e a confiança nos relatórios melhorou.",
        impact: foundIssue ? "negativo" : "neutro",
      }, ...s.news].slice(0, 50),
    }));
    notify(foundIssue ? "A auditoria encontrou um problema oculto." : action === "conselho" ? "Seu apoio político aumentou." : "Auditoria concluída sem problemas relevantes.");
  };

  const recognizeCompanyCEO = () => {
    if (!holdingCompany || holdingCompany.ceo === currentLeader || holdingCompany.cash < 25000) return;
    setGame((s) => ({
      ...s,
      companies: s.companies.map((c) =>
        c.id === holdingCompany.id
          ? {
              ...c,
              cash: c.cash - 25000,
              ceoLoyalty: clamp((c.ceoLoyalty ?? 60) + 12),
              ceoReputation: clamp((c.ceoReputation ?? 60) + 7),
              ceoInfluence: clamp((c.ceoInfluence ?? 20) + 4),
              ceoLastDecision: "Foi promovido a sócio executivo da holding",
              ceoDemandCooldown: Math.max(c.ceoDemandCooldown ?? 0, 5),
              ceoMemories: addCharacterMemory(c.ceoMemories, characterMemory(
                s.week,
                "reconhecimento",
                "Você reconheceu meus resultados e me promoveu a sócio executivo.",
                "orgulhoso",
                14,
                94,
              )),
            }
          : c,
      ),
      news: [{
        id: Date.now(), week: s.week, category: "pessoas",
        headline: `${holdingCompany.ceo} é promovido na ${s.holdingName}`,
        body: "O reconhecimento fortalece a reputação e a lealdade do executivo, mas também amplia sua influência política.",
        impact: "positivo",
      }, ...s.news].slice(0, 50),
    }));
    notify(`${holdingCompany.ceo} foi promovido a sócio executivo.`);
  };

  const auditCaseAction = (
    caseId: string,
    action: "interna" | "externa" | "afastar" | "denunciar" | "acobertar",
  ) => {
    const auditCase = (game.auditCases ?? []).find((item) => item.id === caseId);
    if (!auditCase) return;
    const company = game.companies.find((item) => item.id === auditCase.companyId);
    if (!company) return;
    const cost =
      action === "interna"
        ? 20000
        : action === "externa"
          ? 55000
          : action === "afastar"
            ? 30000
            : action === "denunciar"
              ? 15000
              : 0;
    if (company.cash < cost) return;
    if (action === "afastar" && auditCase.evidence < 42) {
      notify("Ainda não há evidência suficiente para afastar o executivo.");
      return;
    }
    if (action === "denunciar" && auditCase.evidence < 65) {
      notify("A denúncia exige pelo menos 65% de evidências.");
      return;
    }
    setGame((s) => {
      const currentCase = (s.auditCases ?? []).find((item) => item.id === caseId)!;
      const externalEvidence = clamp(currentCase.evidence + 52);
      const recovered =
        action === "denunciar"
          ? Math.round(currentCase.potentialLoss * 0.28)
          : 0;
      const headline =
        action === "interna"
          ? `Comitê interno investiga ${currentCase.title.toLowerCase()}`
          : action === "externa"
            ? `Auditoria independente entra na ${company.name}`
            : action === "afastar"
              ? `${company.ceo} é afastado durante investigação`
              : action === "denunciar"
                ? `${s.holdingName} entrega provas às autoridades`
                : `Holding decide acobertar suspeita na ${company.name}`;
      return {
        ...s,
        companies: s.companies.map((item) =>
          item.id !== company.id
            ? item
            : {
                ...item,
                cash: item.cash - cost + recovered,
                ceo:
                  action === "afastar" || action === "denunciar"
                    ? s.playerExecutive ?? s.founder
                    : item.ceo,
                ceoStyle:
                  action === "afastar" || action === "denunciar"
                    ? "eficiencia"
                    : item.ceoStyle,
                ceoTrust:
                  action === "afastar" || action === "denunciar"
                    ? 100
                    : clamp((item.ceoTrust ?? 60) - (action === "acobertar" ? 0 : 4)),
                ceoLoyalty:
                  action === "acobertar"
                    ? clamp((item.ceoLoyalty ?? 60) + 16)
                    : action === "afastar" || action === "denunciar"
                      ? 100
                      : clamp((item.ceoLoyalty ?? 60) - 5),
                ceoInfluence:
                  action === "afastar" || action === "denunciar"
                    ? 10
                    : clamp((item.ceoInfluence ?? 20) - (action === "externa" ? 8 : 3)),
                boardSupport: clamp(
                  (item.boardSupport ?? 50) +
                    (action === "denunciar"
                      ? 9
                      : action === "afastar"
                        ? 4
                        : action === "acobertar"
                          ? -5
                          : 2),
                ),
                reputation: clamp(
                  item.reputation +
                    (action === "denunciar" ? 5 : action === "acobertar" ? -1 : 0),
                ),
                ceoHiddenIssue:
                  action === "denunciar" || action === "afastar"
                    ? undefined
                    : item.ceoHiddenIssue,
                ceoHiddenWeeks:
                  action === "denunciar" || action === "afastar"
                    ? 0
                    : item.ceoHiddenWeeks,
                ceoLastDecision:
                  action === "afastar" || action === "denunciar"
                    ? "O fundador assumiu durante a crise de integridade"
                    : item.ceoLastDecision,
              },
        ),
        auditCases: (s.auditCases ?? []).map((item) =>
          item.id !== caseId
            ? item
            : action === "interna"
              ? {
                  ...item,
                  status: "investigando" as const,
                  weeksLeft: 2,
                  evidence: clamp(item.evidence + 8),
                  exposureRisk: clamp(item.exposureRisk - 8),
                  outcome: "Comitê interno coletando documentos e depoimentos.",
                }
              : action === "externa"
                ? {
                    ...item,
                    status:
                      externalEvidence >= 65
                        ? "comprovada" as const
                        : "investigando" as const,
                    weeksLeft: externalEvidence >= 65 ? 0 : 1,
                    evidence: externalEvidence,
                    exposureRisk: clamp(item.exposureRisk - 18),
                    outcome:
                      externalEvidence >= 65
                        ? "Auditoria independente encontrou evidências materiais."
                        : "Auditores externos estão concluindo a apuração.",
                  }
                : action === "acobertar"
                  ? {
                      ...item,
                      status: "acobertada" as const,
                      exposureRisk: clamp(item.exposureRisk + 18),
                      outcome: "O caso foi abafado. Um vazamento futuro terá impacto maior.",
                    }
                  : {
                      ...item,
                      status:
                        action === "denunciar"
                          ? "encerrada" as const
                          : "comprovada" as const,
                      evidence:
                        action === "denunciar" ? 100 : item.evidence,
                      outcome:
                        action === "denunciar"
                          ? `Caso denunciado; ${money.format(recovered)} recuperados.`
                          : "Executivo afastado preventivamente.",
                    },
        ),
        news: [
          {
            id: Date.now(),
            week: s.week,
            category: "negocios",
            headline,
            body:
              action === "acobertar"
                ? "A decisão protege o caixa no curto prazo, mas documentos e testemunhas podem levar o caso à imprensa mais adiante."
                : `A holding investiu ${money.format(cost)} na resposta. Evidências atuais: ${Math.round(action === "externa" ? externalEvidence : currentCase.evidence)}%.`,
            impact: action === "denunciar" ? "positivo" : action === "acobertar" ? "negativo" : "neutro",
          },
          ...s.news,
        ].slice(0, 50),
      };
    });
    setGame((state) => evolveIdentity(
      state,
      action === "acobertar"
        ? { integridade: -9, prudencia: -2 }
        : action === "denunciar"
          ? { integridade: 8, agressividade: 1 }
          : action === "externa"
            ? { integridade: 4, prudencia: 2 }
            : { integridade: 2, prudencia: 1 },
      `decisão de integridade: ${action}`,
    ));
    notify(
      action === "acobertar"
        ? "O caso foi abafado, mas o risco de vazamento aumentou."
        : action === "denunciar"
          ? "As provas foram entregues e parte das perdas foi recuperada."
          : "A decisão de integridade foi registrada.",
    );
  };

  const heirDevelopmentAction = (
    heirId: number,
    action: "educacao" | "mentoria" | "conselho" | "sucessor",
  ) => {
    const heir = heirs.find((item) => item.id === heirId);
    if (!heir) return;
    const cost = action === "educacao" ? 90000 : action === "mentoria" ? 30000 : action === "conselho" ? 50000 : 0;
    if (game.personalCash < cost) return;
    if (action === "conselho" && heir.competence < 48) {
      notify("Esse herdeiro precisa de pelo menos 48 de competência para entrar no conselho.");
      return;
    }
    setGame((s) => ({
      ...s,
      personalCash: s.personalCash - cost,
      chosenSuccessorId: action === "sucessor" ? heirId : s.chosenSuccessorId,
      heirs: (s.heirs ?? []).map((item) => {
        if (item.id !== heirId) {
          if (action !== "sucessor" || item.generation !== heir.generation) return item;
          return {
            ...item,
            role: item.role === "sucessor" ? "conselho" as const : item.role,
            resentment: clamp((item.resentment ?? 8) + 7),
            memories: addCharacterMemory(item.memories, characterMemory(
              s.week,
              "familia",
              `Você escolheu ${heir.name} como sucessor em vez de mim.`,
              "magoado",
              -8,
              88,
            )),
          };
        }
        return {
              ...item,
              competence: clamp(
                item.competence +
                  (action === "educacao" ? 14 : action === "mentoria" ? 5 : action === "conselho" ? 6 : 0),
              ),
              readiness: clamp(
                item.readiness +
                  (action === "educacao" ? 9 : action === "mentoria" ? 11 : action === "conselho" ? 12 : 0),
              ),
              bond: clamp(item.bond + (action === "mentoria" ? 12 : action === "educacao" ? 4 : 2)),
              ambition: clamp(item.ambition + (action === "conselho" ? 8 : 2)),
              role:
                action === "sucessor"
                  ? "sucessor"
                  : action === "conselho"
                    ? "conselho"
                    : "formacao",
              history: [
                `Semana ${s.week}: ${action === "educacao" ? "iniciou formação executiva" : action === "mentoria" ? "passou a ser mentorado pelo fundador" : action === "conselho" ? "entrou no conselho como observador" : "foi indicado como sucessor"}.`,
                ...item.history,
              ].slice(0, 6),
              memories: addCharacterMemory(item.memories, characterMemory(
                s.week,
                action === "sucessor" ? "familia" : "reconhecimento",
                action === "educacao"
                  ? "Você investiu na minha formação executiva."
                  : action === "mentoria"
                    ? "Você reservou tempo para me orientar pessoalmente."
                    : action === "conselho"
                      ? "Você me deu uma oportunidade dentro do conselho."
                      : "Você me escolheu para carregar o legado da família.",
                action === "sucessor" ? "orgulhoso" : "grato",
                action === "sucessor" ? 16 : action === "mentoria" ? 12 : 9,
                action === "sucessor" ? 100 : 84,
              )),
            };
      }),
      successionHistory: [
        `Semana ${s.week}: ${heir.name} — ${action}.`,
        ...(s.successionHistory ?? []),
      ].slice(0, 10),
    }));
    notify(
      action === "sucessor"
        ? `${heir.name} foi indicado como sucessor oficial.`
        : "A preparação do herdeiro avançou.",
    );
  };

  const retireFounder = () => {
    if (
      !chosenSuccessor ||
      chosenSuccessor.readiness < 60 ||
      game.week < 40 ||
      game.founderRetired ||
      activeCompanies.length === 0
    )
      return;
    setGame((s) => ({
      ...s,
      founderRetired: true,
      retiredWeek: s.week,
      playerExecutive: chosenSuccessor.name,
      dynastyMode: true,
      generation: 2,
      dynastyStartedWeek: s.week,
      dynastyLegitimacy: clamp(38 + chosenSuccessor.readiness * 0.38),
      dynastyGoal:
        chosenSuccessor.style === "crescimento"
          ? "expandir"
          : chosenSuccessor.style === "inovacao"
            ? "inovar"
            : chosenSuccessor.style === "pessoas"
              ? "unir"
              : "preservar",
      familyUnity: 72,
      founderHealth: 92,
      founderHoldingEquity: 50,
      outsideFamilyEquity: 0,
      formerPresidents: [
        formerPresidentProfile(s, s.founder, 1, 1, s.week, "crescimento"),
        ...(s.formerPresidents ?? []).filter((president) => president.name !== s.founder),
      ],
      lastDynastyTransition: createDynastyTransition(s, s.founder, chosenSuccessor.name, 2),
      generationProfile: generationProfileFor(chosenSuccessor.name, 2, chosenSuccessor.style, s.week, chosenSuccessor.startAge + Math.round(s.week / 52)),
      lastMandateReviewWeek: s.week,
      legacy: s.legacy + 15 + Math.round(lifeGoalProgress / 10),
      companies: s.companies.map((company) =>
        !company.sold &&
        !company.bankrupt &&
        !company.closed &&
        company.ceo === s.founder
          ? {
              ...company,
              ceo: chosenSuccessor.name,
              ceoStyle: chosenSuccessor.style,
              ceoTrust: 62,
              ceoLoyalty: 90,
              ceoInfluence: 34,
              ceoAmbition: chosenSuccessor.ambition,
              ceoReputation: chosenSuccessor.competence,
              ceoTenure: 0,
              autonomy: "supervisionada",
              ceoLastDecision: "Assumiu a empresa durante a sucessão familiar",
              ceoHistory: [
                `Semana ${s.week}: ${chosenSuccessor.name} assumiu após a aposentadoria do fundador.`,
                ...(company.ceoHistory ?? []),
              ].slice(0, 8),
            }
          : company,
      ),
      heirs: (s.heirs ?? []).map((heir) =>
        heir.id === chosenSuccessor.id
          ? {
              ...heir,
              role: "sucessor" as const,
              readiness: clamp(heir.readiness + 8),
              equity: 35,
              support: 78,
              resentment: 4,
            }
          : {
              ...heir,
              equity: 15,
              support: clamp((heir.support ?? 65) - 12),
              resentment: clamp((heir.resentment ?? 10) + 20),
            },
      ),
      successionHistory: [
        `Semana ${s.week}: ${s.founder} se aposentou e entregou a sucessão a ${chosenSuccessor.name}.`,
        ...(s.successionHistory ?? []),
      ].slice(0, 10),
      dynastyHistory: [
        `Geração 2: ${chosenSuccessor.name} recebeu o comando de ${s.founder}.`,
        ...(s.dynastyHistory ?? []),
      ],
      news: [
        {
          id: Date.now(),
          week: s.week,
          category: "negocios",
          headline: `${s.founder} anuncia aposentadoria da ${s.holdingName}`,
          body: `${chosenSuccessor.name} assume a liderança da nova geração. O fundador permanece como símbolo e acionista do grupo.`,
          impact: "positivo",
        },
        ...s.news,
      ].slice(0, 50),
    }));
    setDialog("dynasty-transition");
    setView("portfolio");
    setSpeed(0);
    notify(`A nova geração começou sob a liderança de ${chosenSuccessor.name}.`);
  };

  const familyCouncilAction = (
    action: "dividendos" | "reconciliar" | "recomprar" | "governanca",
  ) => {
    if (!game.dynastyMode) return;
    const cost =
      action === "dividendos"
        ? 100000
        : action === "reconciliar"
          ? 50000
          : action === "recomprar"
            ? 200000
            : 80000;
    if (game.personalCash < cost) return;
    if (action === "recomprar" && (game.outsideFamilyEquity ?? 0) < 5) return;
    setGame((s) => ({
      ...s,
      personalCash: s.personalCash - cost,
      familyUnity: clamp(
        (s.familyUnity ?? 70) +
          (action === "dividendos"
            ? 9
            : action === "reconciliar"
              ? 14
              : action === "governanca"
                ? 6
                : 2),
      ),
      dynastyLegitimacy: clamp(
        (s.dynastyLegitimacy ?? 50) +
          (action === "governanca" ? 10 : action === "recomprar" ? 5 : 2),
      ),
      outsideFamilyEquity:
        action === "recomprar"
          ? Math.max(0, (s.outsideFamilyEquity ?? 0) - 5)
          : s.outsideFamilyEquity,
      founderHoldingEquity:
        action === "recomprar"
          ? (s.founderHoldingEquity ?? 0) + 5
          : s.founderHoldingEquity,
      heirs: (s.heirs ?? []).map((heir) => ({
        ...heir,
        support: clamp(
          (heir.support ?? 60) +
            (action === "dividendos" ? 10 : action === "reconciliar" ? 8 : 3),
        ),
        resentment: clamp(
          (heir.resentment ?? 10) -
            (action === "reconciliar" ? 15 : action === "dividendos" ? 8 : 4),
        ),
        memories: addCharacterMemory(heir.memories, characterMemory(
          s.week,
          "familia",
          action === "dividendos"
            ? "Você ouviu a família e aprovou dividendos para todos."
            : action === "reconciliar"
              ? "Você escolheu mediação quando a família estava se afastando."
              : action === "recomprar"
                ? "Você priorizou recuperar o controle da família sobre a holding."
                : "Você criou regras para impedir que disputas pessoais dominem a empresa.",
          action === "reconciliar" ? "grato" : "confiante",
          action === "reconciliar" ? 10 : 6,
          action === "reconciliar" ? 88 : 72,
        )),
      })),
      dynastyHistory: [
        `Semana ${s.week}: o conselho familiar aprovou ${action}.`,
        ...(s.dynastyHistory ?? []),
      ].slice(0, 14),
      news: [
        {
          id: Date.now(),
          week: s.week,
          category: "negocios",
          headline:
            action === "recomprar"
              ? `${s.holdingName} recompra ações vendidas fora da família`
              : `Conselho familiar da ${s.holdingName} aprova nova política`,
          body: `A decisão de ${action} custou ${money.format(cost)} e alterou o equilíbrio entre controle, paz familiar e legitimidade.`,
          impact: "neutro",
        },
        ...s.news,
      ].slice(0, 50),
    }));
    notify("A decisão do conselho familiar foi executada.");
  };

  const formerPresidentAction = (name: string, action: "aproximar" | "conselho" | "limitar") => {
    const cost = action === "aproximar" ? 30000 : action === "conselho" ? 80000 : 60000;
    if (game.personalCash < cost) return;
    setGame((state) => ({
      ...state,
      personalCash: state.personalCash - cost,
      familyUnity: clamp((state.familyUnity ?? 70) + (action === "aproximar" ? 7 : action === "conselho" ? 3 : -8)),
      dynastyLegitimacy: clamp((state.dynastyLegitimacy ?? 50) + (action === "limitar" ? 6 : action === "aproximar" ? 2 : -2)),
      formerPresidents: (state.formerPresidents ?? []).map((president) => president.name !== name ? president : ({
        ...president,
        relationship: clamp(president.relationship + (action === "aproximar" ? 14 : action === "conselho" ? 7 : -16)),
        influence: clamp(president.influence + (action === "conselho" ? 12 : action === "limitar" ? -14 : 2)),
        status: action === "aproximar" ? "aliado" as const : action === "conselho" ? "neutro" as const : "oposicao" as const,
        lastMove: action === "aproximar" ? `Reconciliou-se com ${currentLeader}.` : action === "conselho" ? "Recebeu uma cadeira formal no conselho estratégico." : "Perdeu poderes formais e começou a organizar resistência.",
      })),
      dynastyHistory: [`Semana ${state.week}: ${currentLeader} decidiu ${action} a influência de ${name}.`, ...(state.dynastyHistory ?? [])].slice(0, 16),
    }));
    notify("A relação com o ex-presidente mudou.");
  };

  const introduceNextGeneration = () => {
    if (!game.dynastyMode || dynastyTenure < 40 || nextGenerationCandidates.length) return;
    const generation = (game.generation ?? 2) + 1;
    const descendants = createNextGeneration(currentLeader, generation);
    setGame((s) => ({
      ...s,
      heirs: [...(s.heirs ?? []), ...descendants],
      familyUnity: clamp((s.familyUnity ?? 70) + 4),
      dynastyHistory: [
        `Geração ${generation}: novos descendentes entraram no plano sucessório.`,
        ...(s.dynastyHistory ?? []),
      ],
      news: [
        {
          id: Date.now(),
          week: s.week,
          category: "pessoas",
          headline: `${s.holdingName} apresenta a geração ${generation} ao conselho`,
          body: `${descendants.map((heir) => heir.name).join(" e ")} iniciam sua formação para o futuro da dinastia.`,
          impact: "neutro",
        },
        ...s.news,
      ].slice(0, 50),
    }));
    notify("A próxima geração entrou no plano de sucessão.");
  };

  const advanceDynastyGeneration = () => {
    if (
      !game.dynastyMode ||
      !selectedNextLeader ||
      selectedNextLeader.readiness < 60 ||
      dynastyTenure < 80
    )
      return;
    const formerLeader = currentLeader;
    setGame((s) => ({
      ...s,
      playerExecutive: selectedNextLeader.name,
      generation: (s.generation ?? 2) + 1,
      dynastyStartedWeek: s.week,
      dynastyLegitimacy: clamp(38 + selectedNextLeader.readiness * 0.4),
      dynastyGoal:
        selectedNextLeader.style === "crescimento"
          ? "expandir"
          : selectedNextLeader.style === "inovacao"
            ? "inovar"
            : selectedNextLeader.style === "pessoas"
            ? "unir"
            : "preservar",
      formerPresidents: [
        formerPresidentProfile(
          s,
          formerLeader,
          s.generation ?? 2,
          s.dynastyStartedWeek ?? s.retiredWeek ?? 1,
          s.week,
          (s.heirs ?? []).find((heir) => heir.name === formerLeader)?.style ?? "crescimento",
        ),
        ...(s.formerPresidents ?? []).filter((president) => president.name !== formerLeader),
      ],
      lastDynastyTransition: createDynastyTransition(s, formerLeader, selectedNextLeader.name, (s.generation ?? 2) + 1),
      generationProfile: generationProfileFor(selectedNextLeader.name, (s.generation ?? 2) + 1, selectedNextLeader.style, s.week, selectedNextLeader.startAge + Math.round(dynastyTenure / 52)),
      lastMandateReviewWeek: s.week,
      politicalArc: undefined,
      companies: s.companies.map((company) =>
        !company.sold &&
        !company.bankrupt &&
        !company.closed &&
        company.ceo === formerLeader
          ? {
              ...company,
              ceo: selectedNextLeader.name,
              ceoStyle: selectedNextLeader.style,
              ceoTrust: 65,
              ceoLoyalty: 90,
              ceoInfluence: 32,
              ceoReputation: selectedNextLeader.competence,
              ceoTenure: 0,
              ceoLastDecision: `Assumiu na transição para a geração ${(s.generation ?? 2) + 1}`,
            }
          : company,
      ),
      heirs: (s.heirs ?? []).map((heir) =>
        heir.id === selectedNextLeader.id
          ? { ...heir, role: "sucessor" as const, support: 78, resentment: 3 }
          : heir.name === formerLeader
            ? { ...heir, role: "conselho" as const }
            : heir,
      ),
      chosenSuccessorId: selectedNextLeader.id,
      dynastyHistory: [
        `Geração ${(s.generation ?? 2) + 1}: ${selectedNextLeader.name} recebeu o comando de ${formerLeader}.`,
        ...(s.dynastyHistory ?? []),
      ],
      news: [
        {
          id: Date.now(),
          week: s.week,
          category: "negocios",
          headline: `${selectedNextLeader.name} assume a geração ${(s.generation ?? 2) + 1} da ${s.holdingName}`,
          body: `${formerLeader} deixa a liderança executiva após preparar uma nova sucessão familiar.`,
          impact: "positivo",
        },
        ...s.news,
      ].slice(0, 50),
    }));
    setSpeed(0);
    setDialog("dynasty-transition");
    notify(`A geração ${(game.generation ?? 2) + 1} começou.`);
  };

  const transferBetweenCompanies = () => {
    if (
      !holdingCompany ||
      !transferTargetId ||
      transferAmount <= 0 ||
      transferAmount > 100000 ||
      holdingCompany.cash < transferAmount
    )
      return;
    const target = game.companies.find((c) => c.id === transferTargetId);
    if (!target) return;
    setGame((s) => ({
      ...s,
      companies: s.companies.map((c) =>
        c.id === holdingCompany.id
          ? { ...c, cash: c.cash - transferAmount }
          : c.id === target.id
            ? { ...c, cash: c.cash + transferAmount }
            : c,
      ),
      financialLedger: [
        { id: `${s.week}-${holdingCompany.id}-transfer-out-${Date.now()}`, week: s.week, companyId: holdingCompany.id, companyName: holdingCompany.name, category: "transferencia", label: `Transferência para ${target.name}`, amount: -transferAmount, detail: "Capital movimentado dentro da holding." },
        { id: `${s.week}-${target.id}-transfer-in-${Date.now()}`, week: s.week, companyId: target.id, companyName: target.name, category: "transferencia", label: `Aporte recebido de ${holdingCompany.name}`, amount: transferAmount, detail: "Capital recebido de outra empresa do grupo." },
        ...(s.financialLedger ?? []),
      ].slice(0, 180),
      news: [
        {
          id: Date.now(),
          week: s.week,
          category: "negocios",
          headline: `${s.holdingName} transfere capital para ${target.name}`,
          body: `${holdingCompany.name} enviou ${money.format(transferAmount)} para reforçar a operação da empresa irmã.`,
          impact: "neutro",
        },
        ...s.news,
      ].slice(0, 50),
    }));
    notify(`${money.format(transferAmount)} transferidos para ${target.name}.`);
  };

  const holdingCapitalAction = (kind: "aporte" | "dividendo" | "servicos") => {
    if (!holdingCompany) return;
    if (kind === "aporte") {
      const amount = Math.min(transferAmount, game.personalCash);
      if (amount <= 0) return;
      setGame((s) => ({
        ...s,
        personalCash: s.personalCash - amount,
        companies: s.companies.map((c) =>
          c.id === holdingCompany.id ? { ...c, cash: c.cash + amount } : c,
        ),
      }));
      notify(
        `A holding aportou ${money.format(amount)} na ${holdingCompany.name}.`,
      );
      return;
    }
    if (kind === "dividendo") {
      const holdingMetrics = companyMetrics(holdingCompany, game.economy);
      const amount = Math.min(
        Math.round(holdingCompany.cash * 0.08),
        Math.max(0, holdingCompany.cash - holdingMetrics.requiredReserve),
      );
      if (amount <= 0) return;
      const dividendTax = Math.round(amount * .12);
      setGame((s) => ({
        ...s,
        personalCash: s.personalCash + amount - dividendTax,
        companies: s.companies.map((c) =>
          c.id === holdingCompany.id
            ? {
                ...c,
                cash: c.cash - amount,
                boardSupport: clamp((c.boardSupport ?? 50) + 4),
              }
            : c,
        ),
      }));
      notify(`${money.format(amount - dividendTax)} líquidos distribuídos ao fundador.`);
      return;
    }
    const enabling = !holdingCompany.sharedServices;
    if (enabling && holdingCompany.cash < 25000) return;
    updateHoldingCompany({
      sharedServices: enabling,
      cash: holdingCompany.cash - (enabling ? 25000 : 0),
    });
    notify(
      enabling
        ? "Serviços compartilhados ativados: implantação custou R$ 25 mil."
        : "A empresa deixou a estrutura compartilhada.",
    );
  };

  const sellHoldingCompany = () => {
    if (!holdingCompany) return;
    const offer = Math.round(
      companyMetrics(holdingCompany, game.economy).valuation *
        (0.88 + Math.random() * 0.3),
    );
    const settlement = saleSettlement(offer);
    const buyer = [
      "Grupo Meridian",
      "Aurora Partners",
      "Vértice Global",
      "Orbe Participações",
    ][Math.floor(Math.random() * 4)];
    setGame((s) => ({
      ...s,
      personalCash: s.personalCash + settlement.net,
      companies: s.companies.map((c) =>
        c.id === holdingCompany.id ? { ...c, sold: true, buyer } : c,
      ),
      news: [
        {
          id: Date.now(),
          week: s.week,
          category: "negocios",
          headline: `${s.holdingName} vende ${holdingCompany.name}`,
          body: `${buyer} pagou ${money.format(offer)}. Tributos e assessoria consumiram ${money.format(settlement.taxes + settlement.advisory)}, deixando ${money.format(settlement.net)} líquidos.`,
          impact: "neutro",
        },
        ...s.news,
      ].slice(0, 50),
    }));
    setDialog(null);
    setHoldingCompanyId(null);
    notify(`Empresa vendida por ${money.format(settlement.net)} líquidos.`);
  };

  const mergeHoldingCompany = () => {
    if (!holdingCompany || !transferTargetId) return;
    const target = game.companies.find((c) => c.id === transferTargetId);
    if (!target) return;
    setGame((s) => ({
      ...s,
      companies: s.companies.map((c) =>
        c.id === target.id
          ? {
              ...c,
              cash: c.cash + Math.max(0, holdingCompany.cash),
              customers: c.customers + holdingCompany.customers,
              productRevenue:
                (c.productRevenue ?? 0) + (holdingCompany.productRevenue ?? 0),
              employees: [
                ...c.employees,
                ...holdingCompany.employees.map((e) => ({
                  ...e,
                  id: Date.now() + e.id,
                  morale: clamp(e.morale - 6),
                })),
              ],
              projects: [
                ...c.projects,
                ...holdingCompany.projects.map((p) => ({
                  ...p,
                  id: Date.now() + p.id,
                })),
              ],
            }
          : c.id === holdingCompany.id
            ? {
                ...c,
                closed: true,
                mergedInto: target.name,
                cash: 0,
                employees: [],
                projects: [],
              }
            : c,
      ),
      news: [
        {
          id: Date.now(),
          week: s.week,
          category: "negocios",
          headline: `${holdingCompany.name} é incorporada pela ${target.name}`,
          body: "Clientes, produtos, caixa e equipes passam a operar sob uma única empresa do grupo.",
          impact: "neutro",
        },
        ...s.news,
      ].slice(0, 50),
    }));
    setDialog(null);
    setHoldingCompanyId(null);
    notify(`A operação foi incorporada pela ${target.name}.`);
  };

  const closeHoldingCompany = () => {
    if (!holdingCompany) return;
    const closureCost = Math.min(
      Math.max(0, holdingCompany.cash),
      holdingCompany.employees.reduce((sum, e) => sum + e.salary, 0),
    );
    setGame((s) => ({
      ...s,
      reputation: Math.max(0, s.reputation - 3),
      companies: s.companies.map((c) =>
        c.id === holdingCompany.id
          ? {
              ...c,
              closed: true,
              cash: Math.max(0, c.cash - closureCost),
              employees: [],
              projects: [],
            }
          : c,
      ),
      news: [
        {
          id: Date.now(),
          week: s.week,
          category: "negocios",
          headline: `${holdingCompany.name} encerra operação por decisão do grupo`,
          body: `A holding pagou ${money.format(closureCost)} em desligamentos e encerrou a empresa sem processo de falência.`,
          impact: "negativo",
        },
        ...s.news,
      ].slice(0, 50),
    }));
    setDialog(null);
    setHoldingCompanyId(null);
    notify("Operação encerrada voluntariamente.");
  };

  const openRivalProfile = (rival: Competitor) => {
    setSelectedRivalId(rival.id);
    setDialog("rival");
  };

  const rivalRelationshipAction = (
    action: "aproximar" | "parceria" | "rivalidade" | "paz",
  ) => {
    if (
      !active ||
      !selectedRival ||
      active.sold ||
      active.bankrupt ||
      active.closed
    )
      return;
    if (action === "aproximar") {
      if (active.cash < 12000) return;
      setGame((s) => ({
        ...s,
        companies: s.companies.map((c) =>
          c.id === active.id
            ? {
                ...c,
                cash: c.cash - 12000,
                reputation: clamp(c.reputation + 1),
              }
            : c,
        ),
        competitors: s.competitors.map((r) =>
          r.id === selectedRival.id
            ? {
                ...r,
                relation: clamp((r.relation ?? 0) + 20, -100, 100),
                lastDecision: `Abriu diálogo com ${active.name}`,
                history: [
                  `Semana ${s.week}: iniciou conversas com ${active.name}.`,
                  ...(r.history ?? []),
                ].slice(0, 8),
              }
            : r,
        ),
      }));
      notify("A relação melhorou após uma rodada de conversas.");
      return;
    }
    if (action === "parceria") {
      if (active.cash < 22000) return;
      const acceptance =
        (selectedRival.relation ?? 0) +
        (selectedRival.personality === "diplomático"
          ? 25
          : selectedRival.personality === "agressivo"
            ? -20
            : 5) +
        Math.random() * 35;
      const accepted = acceptance >= 25;
      setGame((s) => ({
        ...s,
        companies: s.companies.map((c) =>
          c.id === active.id
            ? {
                ...c,
                cash: c.cash - 22000,
                customers: accepted
                  ? Math.round(c.customers * 1.04)
                  : c.customers,
                reputation: clamp(c.reputation + (accepted ? 3 : 0)),
              }
            : c,
        ),
        competitors: s.competitors.map((r) =>
          r.id === selectedRival.id
            ? accepted
              ? {
                  ...r,
                  cash: (r.cash ?? 0) + 22000,
                  relation: 62,
                  relationship: "parceiro" as const,
                  lastDecision: `Firmou parceria com ${active.name}`,
                  history: [
                    `Semana ${s.week}: anunciou parceria comercial com ${active.name}.`,
                    ...(r.history ?? []),
                  ].slice(0, 8),
                }
              : {
                  ...r,
                  relation: clamp((r.relation ?? 0) - 12, -100, 100),
                  lastDecision: `Recusou parceria com ${active.name}`,
                  history: [
                    `Semana ${s.week}: recusou uma proposta da ${active.name}.`,
                    ...(r.history ?? []),
                  ].slice(0, 8),
                }
            : r,
        ),
        news: [
          {
            id: Date.now(),
            week: s.week,
            category: "negocios",
            headline: accepted
              ? `${active.name} e ${selectedRival.name} anunciam parceria`
              : `${selectedRival.name} rejeita proposta da ${active.name}`,
            body: accepted
              ? "As empresas compartilharão canais comerciais e oportunidades sem abandonar suas marcas."
              : `${selectedRival.founder} afirmou que os interesses estratégicos ainda são diferentes.`,
            impact: accepted ? "positivo" : "neutro",
          },
          ...s.news,
        ].slice(0, 50),
      }));
      notify(
        accepted
          ? "Parceria aceita. As duas empresas ganharam acesso a novos clientes."
          : "A proposta foi recusada.",
      );
      return;
    }
    if (action === "paz") {
      if (active.cash < 18000) return;
      setGame((s) => ({
        ...s,
        companies: s.companies.map((c) =>
          c.id === active.id ? { ...c, cash: c.cash - 18000 } : c,
        ),
        competitors: s.competitors.map((r) =>
          r.id === selectedRival.id
            ? {
                ...r,
                relation: 0,
                relationship: "neutro" as const,
                lastDecision: `Aceitou uma trégua com ${active.name}`,
                history: [
                  `Semana ${s.week}: encerrou a rivalidade aberta com ${active.name}.`,
                  ...(r.history ?? []),
                ].slice(0, 8),
              }
            : r,
        ),
      }));
      notify("A rivalidade foi encerrada por um acordo de não agressão.");
      return;
    }
    setGame((s) => ({
      ...s,
      companies: s.companies.map((c) =>
        c.id === active.id ? { ...c, reputation: clamp(c.reputation + 2) } : c,
      ),
      competitors: s.competitors.map((r) =>
        r.id === selectedRival.id
          ? {
              ...r,
              relation: -65,
              relationship: "rival" as const,
              lastDecision: `Entrou em confronto com ${active.name}`,
              history: [
                `Semana ${s.week}: começou uma rivalidade pública com ${active.name}.`,
                ...(r.history ?? []),
              ].slice(0, 8),
            }
          : r,
      ),
      news: [
        {
          id: Date.now(),
          week: s.week,
          category: "mercado",
          headline: `${active.name} desafia publicamente ${selectedRival.name}`,
          body: "A disputa por clientes e talentos passa a ser tratada como uma rivalidade empresarial aberta.",
          impact: "negativo",
        },
        ...s.news,
      ].slice(0, 50),
    }));
    notify(
      "Rivalidade declarada. Espere respostas comerciais nas próximas semanas.",
    );
  };

  const activeMessage = selectedMessage ?? game.unread[0];

  if (!game.started) return <StartScreen onStart={start} />;

  return (
    <main className="story-game">
      <header className="game-hud">
        <button
          className="wordmark"
          onClick={() =>
            navigateToView(operationalAccess ? "escritorio" : "portfolio")
          }
        >
          <b>CEO</b>
          <span>UMA HISTÓRIA DE NEGÓCIOS</span>
        </button>
        <div className="chapter">
          <small>CAPÍTULO {game.chapter}</small>
          <strong>{chapterTitle}</strong>
        </div>
        <div className="hud-stats">
          <div>
            <small>DATA</small>
            <b>{gameDate}</b>
          </div>
          <div>
            <small>ECONOMIA</small>
            <b className={`cycle-${game.economy.cycle}`}>
              {game.economy.cycle.toUpperCase()}
            </b>
          </div>
          <div>
            <small>PATRIMÔNIO</small>
            <b>{compact.format(empireValue)}</b>
          </div>
          <button className="hud-cash-button" onClick={() => setDialog("finance")}>
            <small>CAIXA {active?.name ?? "DO GRUPO"}</small>
            <b>{compact.format(active?.cash ?? groupCash)}</b>
          </button>
          <button className="inbox-button" onClick={() => setDialog("inbox")}>
            Mensagens {game.unread.length > 0 && <i>{game.unread.length}</i>}
          </button>
          <button className="difficulty-button" onClick={() => setDialog("difficulty")}>Ritmo: {difficultyProfiles[game.difficulty ?? "executivo"].title}</button>
          <button className={`report-button ${latestActiveReport?.severity ?? ""}`} disabled={!game.weeklyReports?.length} onClick={() => {
            setSelectedReportWeek(game.weeklyReports?.[0]?.week ?? null);
            setReportCompanyId(game.activeCompanyId);
            setDialog("weekly-report");
          }}>
            Conselho da semana {latestActiveReport?.severity === "critico" && <i>!</i>}
          </button>
          <div className="time-controls" aria-label="Velocidade do tempo">
            <button
              className={speed === 0 ? "active" : ""}
              onClick={() => setSpeed(0)}
            >
              Ⅱ
            </button>
            <button
              className={speed === 1 ? "active" : ""}
              onClick={() => setSpeed(1)}
            >
              ▶
            </button>
            <button
              className={speed === 2 ? "active" : ""}
              onClick={() => setSpeed(2)}
            >
              ▶▶
            </button>
          </div>
          <button
            className="advance-button"
            onClick={advanceWeek}
            disabled={!active || active.sold || active.bankrupt}
          >
            + 1 semana
          </button>
        </div>
      </header>

      <nav className="game-nav">
        {(
          [
            ["escritorio", "Escritório"],
            ["pessoas", "Pessoas"],
            ["projetos", "Projetos"],
            ["cidade", "Mercado"],
            ["noticias", "Noticiário"],
            ["jornada", "Jornada"],
            ["portfolio", "Meu grupo"],
          ] as [View, string][]
        ).map(([id, label]) => {
          const operationalView = [
            "escritorio",
            "pessoas",
            "projetos",
            "cidade",
          ].includes(id);
          return (
            <button
              key={id}
              disabled={operationalView && !operationalAccess}
              title={
                operationalView && !operationalAccess
                  ? "Escolha uma empresa em operação no seu grupo."
                  : undefined
              }
              className={view === id ? "active" : ""}
              onClick={() => navigateToView(id)}
            >
              {label}
            </button>
          );
        })}
        <button className="help-link" onClick={() => setDialog("help")}>
          ?
        </button>
      </nav>
      {game.news[0] && (
        <button
          className={`news-ticker ${game.news[0].impact}`}
          onClick={() => navigateToView("noticias")}
        >
          <span>PLANTÃO</span>
          <b>{game.news[0].headline}</b>
          <small>Ver noticiário ›</small>
        </button>
      )}
      {!!pendingStaffAlerts.length && <div className="staff-alert-bar"><div><small>VAGA ABERTA · {pendingStaffAlerts[0].reason === "demissao" ? "PEDIDO DE DEMISSÃO" : "DESLIGAMENTO"}</small><b>{pendingStaffAlerts[0].employeeName} deixou a {pendingStaffAlerts[0].companyName}</b><span>{pendingStaffAlerts[0].role} · reposição sob responsabilidade de {pendingStaffAlerts[0].responsible}</span></div><button onClick={() => openStaffReplacement(pendingStaffAlerts[0])}>{game.companies.find((company) => company.id === pendingStaffAlerts[0].companyId)?.ceo === currentLeader ? "Abrir mercado de talentos" : "Cobrar CEO responsável"}</button>{pendingStaffAlerts.length > 1 && <i>+{pendingStaffAlerts.length - 1} vagas</i>}</div>}

      {view === "escritorio" && active && operationalAccess && (
        <section className="office-stage">
          <div className="office-image" />
          <div className="office-shade" />
          <div className="scene-title">
            <small>
              {active.sector} · {active.name}
            </small>
            <h1>
              {active.bankrupt
                ? "O escritório ficou vazio. A história, não."
                : active.sold
                  ? "As luzes continuam acesas — mas já não são suas."
                  : game.week < 4
                    ? "Toda empresa começa com uma promessa."
                    : game.week < 10
                      ? "Agora há gente demais contando com você."
                      : "Chegou a hora de decidir o tamanho da sua ambição."}
            </h1>
            <p>
              {active.bankrupt
                ? "A falência encerrou esta empresa, mas você ainda pode reconstruir sua carreira."
                : active.sold
                  ? "Você pode levar o que aprendeu e abrir uma nova empresa."
                  : `Caixa de ${money.format(active.cash)} · ${active.customers} clientes · cultura ${active.culture.toLowerCase()}.`}
            </p>
            {!active.sold && !active.bankrupt && (
              <p
                className={`ceo-status ${active.ceo === currentLeader ? "founder" : "removed"}`}
              >
                {active.ceo === currentLeader
                  ? `${currentLeader} é o personagem controlado e ocupa o cargo de CEO.`
                  : `${active.ceo} ocupa o cargo de CEO. Você permanece acionista com ${Math.round(active.founderEquity ?? 100)}%.`}
              </p>
            )}
          </div>
          {!active.sold && !active.bankrupt && isCEO && (
            <>
              <button
                className="hotspot phone"
                onClick={() => setDialog("inbox")}
              >
                <i>{game.unread.length || "✓"}</i>
                <span>Telefone e mensagens</span>
              </button>
              <button
                className="hotspot team"
                onClick={() => navigateToView("pessoas")}
              >
                <i>{active.employees.length}</i>
                <span>Conversar com a equipe</span>
              </button>
              <button
                className="hotspot board"
                onClick={() => navigateToView("projetos")}
              >
                <i>
                  {active.projects.filter((p) => p.status === "ativo").length}
                </i>
                <span>Quadro de projetos</span>
              </button>
              <button
                className="hotspot city"
                onClick={() => navigateToView("cidade")}
              >
                <i>↗</i>
                <span>Observar o mercado</span>
              </button>
              <button className="hotspot facilities" onClick={() => setDialog("facilities")}>
                <i>{facilityKeys.reduce((sum, key) => sum + (active.facilities?.[key]?.level ?? 0), 0)}</i>
                <span>Investir na estrutura</span>
              </button>
            </>
          )}
          <aside className="week-brief">
            <span>ESTA SEMANA</span>
            <div>
              <small>Receita provável</small>
              <b>{money.format(metrics?.revenue ?? 0)}</b>
            </div>
            <div>
              <small>Produtos recorrentes</small>
              <b>{money.format(active.productRevenue ?? 0)}/sem.</b>
            </div>
            <div>
              <small>Resultado provável</small>
              <b className={(metrics?.profit ?? 0) < 0 ? "bad" : "good"}>
                {money.format(metrics?.profit ?? 0)}
              </b>
            </div>
            <div>
              <small>Clima da equipe</small>
              <b>{Math.round(metrics?.morale ?? 0)}%</b>
            </div>
            <div>
              <small>Apoio do conselho</small>
              <b className={(active.boardSupport ?? 50) < 35 ? "bad" : "good"}>
                {Math.round(active.boardSupport ?? 50)}%
              </b>
            </div>
            <div>
              <small>{metrics?.scaleProfile.label ?? "Escala"} · capital de giro</small>
              <b className={(metrics?.cashCoverage ?? 1) < .7 ? "bad" : (metrics?.cashCoverage ?? 1) >= 1 ? "good" : ""}>{Math.max(0, Math.round((metrics?.cashCoverage ?? 1) * 100))}% de {money.format(metrics?.requiredReserve ?? 0)}</b>
            </div>
            <div>
              <small>Estrutura física</small>
              <b>{Math.round(activeFacilitySummary?.averageCondition ?? 100)}% · {money.format(activeFacilitySummary?.weeklyMaintenance ?? 0)}/sem.</b>
            </div>
            {(active.effects?.length ?? 0) > 0 && (
              <div className="active-consequences">
                <small>CONSEQUÊNCIAS ATIVAS</small>
                {active.effects?.map((effect) => (
                  <span className={effect.tone} key={effect.id}>
                    <b>{effect.name}</b>
                    <em>{effect.weeksLeft} sem.</em>
                  </span>
                ))}
              </div>
            )}
            {(active.investors?.length ?? 0) > 0 && (
              <button
                className="board-button"
                onClick={() => setDialog("board")}
              >
                Abrir conselho ({active.investors?.length})
              </button>
            )}
            <button className="explain-week-button" disabled={!game.weeklyReports?.length} onClick={() => {
              setSelectedReportWeek(game.weeklyReports?.[0]?.week ?? null);
              setReportCompanyId(active.id);
              setDialog("weekly-report");
            }}>Ver sugestão da semana{latestActiveReport?.severity === "critico" ? " · atenção" : ""}</button>
            {!active.sold && !active.bankrupt && isCEO && (
              <div className="emergency-actions">
                <button onClick={() => setDialog("recovery")}>
                  Recuperação
                </button>
                <button onClick={() => setDialog("bankruptcy")}>
                  Falência
                </button>
              </div>
            )}
          </aside>
        </section>
      )}

      {view === "pessoas" && active && operationalAccess && (
        <section className="game-page people-page">
          <PageIntro
            kicker="A EMPRESA É FEITA DE GENTE"
            title="O que eles não dizem na reunião."
            text={isCEO ? "Cada pessoa tem ambições, limites e uma relação diferente com você. Dinheiro resolve algumas coisas — nunca todas." : `${currentLeader} preside a holding, mas ${active.ceo} é o CEO desta empresa. O controle direto fica com ele; use Meu Grupo para supervisionar ou reassuma o cargo.`}
            action={
              <button disabled={!isCEO} onClick={() => setDialog("hire")}>
                Conhecer candidatos
              </button>
            }
          />
          <section className="company-directors">
            <header>
              <div>
                <small>ESTRUTURA DE LIDERANÇA</small>
                <h2>Diretoria da empresa</h2>
                <p>Cada diretor lidera uma área e altera decisões semanais. Competência ajuda a operação; baixa confiança pode criar resistência e piorar resultados.</p>
              </div>
              <button disabled={!isCEO || (active.directors ?? []).length >= 4} onClick={() => setDialog("directors")}>Nomear diretor</button>
            </header>
            <div className="director-board">
              {(Object.keys(directorAreaLabels) as DirectorArea[]).map((area) => {
                const director = (active.directors ?? []).find((item) => item.area === area);
                return <article className={director ? "occupied" : "vacant"} key={area}>
                  <small>{directorAreaLabels[area].toUpperCase()}</small>
                  {director ? <>
                    <h3>{director.name}</h3>
                    <p>Estilo {director.style} · {director.origin === "promovido" ? "talento interno" : "contratado no mercado"}</p>
                    <div><span>Competência <b>{Math.round(director.competence)}</b></span><span>Confiança <b>{Math.round(director.trust)}</b></span><span>Autoridade <b>{Math.round(director.authority)}</b></span></div>
                    <em>{director.lastAction}</em>
                  </> : <>
                    <h3>Cadeira vaga</h3>
                    <p>A área funciona sem liderança especializada e não oferece bônus à empresa.</p>
                    <button disabled={!isCEO} onClick={() => { setDirectorArea(area); setDialog("directors"); }}>Preencher vaga</button>
                  </>}
                </article>;
              })}
            </div>
          </section>
          <div className="people-grid">
            {active.employees.map((e) => (
              <article className="person-card" key={e.id}>
                <div
                  className="portrait"
                  style={{ "--person": e.color } as React.CSSProperties}
                >
                  <span>{e.initials}</span>
                  <i style={{ height: `${e.morale}%` }} />
                </div>
                <div className="person-copy">
                  <small>{e.role}</small>
                  <h2>{e.name}</h2>
                  <p>“{e.ambition}.”</p>
                  <div className="traits">
                    <span>{directorAreaLabels[e.department ?? inferDepartment(e.role)]}</span>
                    <span>{talentTierLabels[e.talentTier ?? talentTierFor(e.skill)]} · competência {Math.round(e.skill)}</span>
                    <span>{e.trait}</span>
                    <span>Lealdade {Math.round(e.loyalty)}</span>
                    <span>Relação {Math.round(e.relation)}</span>
                    <span className={(e.stress ?? 0) > 78 ? "stress-high" : ""}>
                      Estresse {Math.round(e.stress ?? 0)}
                    </span>
                    <span>
                      {e.leaveWeeks
                        ? `Afastado: ${e.leaveWeeks} sem.`
                        : `${e.weeks ?? 0} semanas na empresa`}
                    </span>
                  </div>
                  <div className={`character-opinion ${characterOpinion(e.memories, game.week).tone}`}>
                    <small>COMO ME VÊ</small>
                    <b>{characterOpinion(e.memories, game.week).label}</b>
                    <span>Memória emocional {characterMemoryScore(e.memories, game.week) > 0 ? "+" : ""}{Math.round(characterMemoryScore(e.memories, game.week))}</span>
                  </div>
                  {!!e.memories?.length && <div className="character-memories">
                    <small>LEMBRANÇAS</small>
                    {e.memories.slice(0, 2).map((memory) => <p className={memory.value >= 0 ? "positive" : "negative"} key={memory.id}><i>{memory.feeling}</i> “{memory.text}” <span>semana {memory.week}</span></p>)}
                  </div>}
                </div>
                <div className="person-actions">
                  <b>
                    {money.format(e.salary)}
                    <small>/mês · mercado {money.format(e.market)}</small>
                  </b>
                  <button
                    disabled={!isCEO}
                    onClick={() => {
                      setSalaryEmployee(e);
                      setSalaryOffer(e.salary);
                      setNegotiationNote("");
                      setDialog("salary");
                    }}
                  >
                    Negociar
                  </button>
                  <button className="danger-action" disabled={!isCEO || active.employees.length <= 1} onClick={() => dismissEmployee(e)}>Demitir</button>
                </div>
              </article>
            ))}
          </div>
        </section>
      )}

      {view === "projetos" && active && operationalAccess && (
        <section className="game-page">
          <PageIntro
            kicker="ONDE A EMPRESA APOSTA O FUTURO"
            title="Ideias custam dinheiro. Atrasos custam confiança."
            text="Projetos avançam a cada semana de acordo com a competência, moral e pressão da equipe."
            action={
              <button disabled={!isCEO} onClick={() => setDialog("project")}>
                Iniciar projeto
              </button>
            }
          />
          <div className="project-wall">
            {active.projects.map((p) => (
              <article
                className={`project-note ${p.status} lifecycle-${p.lifecycle ?? "desenvolvimento"}`}
                key={p.id}
              >
                <span>
                  {p.status === "concluido"
                    ? p.kind === "produto" && p.lifecycle === "fora_de_linha"
                      ? "FORA DE LINHA"
                      : p.kind === "produto" &&
                          p.lifecycle === "direitos_vendidos"
                        ? "DIREITOS VENDIDOS"
                        : p.kind === "produto"
                          ? (p.marketStage ?? "lancamento").toUpperCase()
                          : "ENTREGUE"
                    : `RISCO ${p.risk}%`}
                </span>
                <h2>{p.name}</h2>
                <p>
                  {p.status === "concluido"
                    ? p.kind === "produto"
                      ? p.lifecycle === "fora_de_linha"
                        ? "A produção e as vendas foram encerradas. O produto permanece no arquivo da empresa."
                        : p.lifecycle === "direitos_vendidos"
                          ? "A exploração comercial agora pertence a outra empresa."
                          : `Produto no mercado e gerando aproximadamente ${money.format(p.recurring ?? 0)} por semana antes dos ajustes econômicos.`
                      : p.kind === "melhoria"
                        ? "Melhoria incorporada: os custos operacionais ficaram menores."
                        : p.kind === "campanha"
                          ? "Campanha concluída: a aquisição de clientes ficará fortalecida temporariamente."
                          : "Contrato entregue e pagamento recebido."
                    : p.risk > 50
                      ? "A equipe acredita, mas o caminho está cheio de incerteza."
                      : "O plano está claro. A execução decidirá o resultado."}
                </p>
                <div className="project-progress">
                  <i style={{ width: `${p.progress}%` }} />
                </div>
                <div className="project-meta">
                  <b>
                    {p.kind === "produto" && p.status === "concluido"
                      ? `v${p.version ?? 1}`
                      : `${Math.round(p.progress)}% pronto`}
                  </b>
                  <b>Qualidade {Math.round(p.quality)}</b>
                  {p.kind === "produto" && <b>Complexidade {p.complexity ?? 3}/5</b>}
                  <b>
                    {p.kind === "produto"
                      ? `${compact.format(productWeeklyRevenue(p))}/sem.`
                      : `${compact.format(p.reward)} entrega`}
                  </b>
                </div>
                {p.kind === "produto" && (p.status === "ativo" || p.lifecycle === "mercado") && (
                    <button
                      className="product-manage"
                      disabled={!isCEO}
                      onClick={() => openProductDecision(p)}
                    >
                      {p.status === "ativo" ? "Preparar produto" : "Gerenciar produto"}
                    </button>
                  )}
              </article>
            ))}
          </div>
        </section>
      )}

      {view === "cidade" && active && operationalAccess && (
        <section className="market-scene game-page">
          <PageIntro
            kicker="A CIDADE NÃO PARA"
            title="Enquanto você decide, o mercado se move."
            text="Concorrentes contratam, copiam, crescem e fracassam. Sua reputação abre portas — ou cria inimigos."
          />
          <div className={`economy-banner ${game.economy.cycle}`}>
            <div>
              <small>CICLO ECONÔMICO ATUAL</small>
              <h2>
                {game.economy.cycle === "expansao"
                  ? "Economia em expansão"
                  : game.economy.cycle === "recessao"
                    ? "Recessão"
                    : game.economy.cycle === "inflacao"
                      ? "Inflação elevada"
                      : game.economy.cycle === "credito"
                        ? "Crise de crédito"
                        : "Mercado estável"}
              </h2>
              {game.economy.nextCycle && (
                <strong className="economic-warning">
                  Previsão: transição para {game.economy.nextCycle} em{" "}
                  {game.economy.weeksLeft} semanas
                </strong>
              )}
            </div>
            <p>
              Demanda {Math.round(game.economy.demand * 100)}% · custos{" "}
              {Math.round(game.economy.costs * 100)}% · juros{" "}
              {(game.economy.interest * 100).toFixed(1)}% por semana
            </p>
          </div>
          <section className="market-identity">
            <div className="identity-profile"><small>SUA IDENTIDADE NO MERCADO</small><h3>{leadershipTitle}</h3><p>{leadershipDescription}</p><span>Formada pelas decisões de {currentLeader}, não por uma escolha inicial.</span></div>
            <div className="identity-dimensions">
              {(Object.entries(game.leadershipIdentity ?? initialLeadershipIdentity) as [IdentityDimension, number][]).map(([key, value]) => <div key={key}><span>{key}</span><b>{Math.round(value)}</b><i><em style={{ width: `${value}%` }} /></i></div>)}
            </div>
            <div className="identity-history"><small>O MERCADO LEMBRA</small>{(game.identityHistory ?? []).slice(0, 3).map((moment, index) => <p key={`${moment.week}-${index}`}><b>S{moment.week}</b>{moment.reason}</p>)}</div>
          </section>
          <section className="commercial-network">
            <header><div><small>GRANDES CONTAS E FORNECIMENTO</small><h3>Contratos que podem sustentar — ou sufocar — a empresa</h3></div><p>Clientes entram no faturamento semanal. Fornecedores entram nos custos. Confiança, dependência e prazo mudam o poder de negociação.</p></header>
            <div className="partner-grid">
              {(active.partners ?? []).map((partner) => <article className={`${partner.kind} ${partner.status}`} key={partner.id}>
                <header><span>{partner.kind}</span><small>{partner.status}</small></header><h4>{partner.name}</h4><p>{partner.representative} · perfil {partner.personality}</p>
                <div className="partner-value"><small>{partner.status === "proposta" ? "VALOR PROPOSTO" : partner.kind === "cliente" ? "RECEITA SEMANAL" : "CUSTO SEMANAL"}</small><b>{money.format(partner.proposedValue ?? partner.weeklyValue)}</b></div>
                <div className="partner-stats"><span>Confiança <b>{Math.round(partner.trust)}%</b></span><span>Dependência <b>{Math.round(partner.dependency)}%</b></span><span>{partner.status === "proposta" ? "Expira" : "Prazo"} <b>{partner.status === "proposta" ? `S${partner.proposalExpiresWeek}` : `${partner.weeksLeft} sem.`}</b></span></div>
                {partner.status === "disputa" && <strong className="contract-fight">DISPUTA {Math.round(partner.disputeLevel ?? 0)}%</strong>}<em>{partner.lastEvent}</em><button disabled={!isCEO} onClick={() => { setSelectedPartnerId(partner.id); setDialog("partner"); }}>{!isCEO ? `Sob gestão de ${active.ceo}` : partner.status === "proposta" ? "Analisar proposta" : ["negociacao", "disputa"].includes(partner.status) ? "Renegociar contrato" : "Gerir relação"}</button>
              </article>)}
            </div>
          </section>
          <div className="market-map">
            {game.competitors
              .filter((r) => r.sector === active.sector)
              .sort(
                (a, b) =>
                  Number(["vendida", "fechada"].includes(a.status)) -
                    Number(["vendida", "fechada"].includes(b.status)) ||
                  b.score - a.score,
              )
              .slice(0, 3)
              .map((rival, index) => {
                const acquisitionPrice = Math.round(
                  rival.score * 17500 + rival.reputation * 4200,
                );
                return (
                  <article
                    className={`rival-building rival-${rival.status}`}
                    key={rival.id}
                  >
                    <span>
                      {index === 0
                        ? "RIVAL EM DESTAQUE"
                        : rival.status.toUpperCase()}
                    </span>
                    <h2>{rival.name}</h2>
                    <div className="building-score">
                      <b>{rival.score}</b>
                      <small>força de mercado</small>
                    </div>
                    <p>
                      {rival.founder}, perfil {rival.personality}, aposta em{" "}
                      {rival.strategy.toLowerCase()}.
                    </p>
                    <div className="rival-summary">
                      <small>
                        Caixa estimado <b>{compact.format(rival.cash ?? 0)}</b>
                      </small>
                      <small>
                        Produtos <b>{rival.products?.length ?? 0}</b>
                      </small>
                      <small>
                        Relação{" "}
                        <b
                          className={`relation-${rival.relationship ?? "neutro"}`}
                        >
                          {rival.relationship ?? "neutro"}
                        </b>
                      </small>
                    </div>
                    <div className="rival-card-actions">
                      <button onClick={() => openRivalProfile(rival)}>
                        Conhecer empresa
                      </button>
                      {!["vendida", "fechada"].includes(rival.status) && (
                        <button
                          className="buy-rival"
                          disabled={!isCEO || active.cash < acquisitionPrice}
                          onClick={() => {
                            setTargetRival(rival);
                            setDialog("acquire");
                          }}
                        >
                          Comprar {compact.format(acquisitionPrice)}
                        </button>
                      )}
                    </div>
                  </article>
                );
              })}
            <article className="your-building">
              <span>SUA EMPRESA</span>
              <h2>{active.name}</h2>
              <div className="building-score">
                <b>{Math.round(active.reputation)}</b>
                <small>reputação</small>
              </div>
              <p>
                {active.customers} clientes acompanham o que você fará a seguir.
              </p>
            </article>
            <article className="investor-building">
              <span>CAPITAL E PODER</span>
              <h2>Distrito Financeiro</h2>
              <p>
                Bancos oferecem crédito. Fundos oferecem capital — e passam a
                ter opinião sobre seu cargo.
              </p>
              <button
                onClick={() => setDialog("capital")}
                disabled={!isCEO || active.sold || active.bankrupt}
              >
                Buscar capital
              </button>
              <button
                onClick={() => setDialog("sell")}
                disabled={
                  !isCEO ||
                  !metrics ||
                  metrics.valuation < 500000 ||
                  active.sold
                }
              >
                Sondar compradores
              </button>
            </article>
          </div>
          <div className="strategy-ribbon">
            <label>
              <span>Preço</span>
              <b>{money.format(active.price)}</b>
              <input
                type="range"
                min={active.sector === "Agência" ? 1800 : 50}
                max={active.sector === "Agência" ? 12000 : 900}
                step={active.sector === "Agência" ? 200 : 10}
                value={active.price}
                onChange={(e) =>
                  updateActive((c) => ({ ...c, price: Number(e.target.value) }))
                }
              />
            </label>
            <label>
              <span>Presença semanal da marca</span>
              <b>{money.format(active.marketing)}</b>
              <input
                type="range"
                min="0"
                max="15000"
                step="1000"
                value={active.marketing}
                onChange={(e) =>
                  updateActive((c) => ({
                    ...c,
                    marketing: Number(e.target.value),
                  }))
                }
              />
              <small>Manutenção contínua. Campanhas maiores são apostas separadas.</small>
            </label>
            <div>
              <span>Valor estimado</span>
              <b>{compact.format(metrics?.valuation ?? 0)}</b>
              <small>O comprador pode oferecer mais — ou menos.</small>
            </div>
          </div>
          <section className="marketing-campaign-strip">
            <header>
              <div><small>MARKETING COM RISCO REAL</small><h3>Campanhas estratégicas</h3><p>Escolha público, objetivo e produto. O dinheiro é comprometido no lançamento e o mercado reage durante duas a seis semanas.</p></div>
              <button disabled={!isCEO || active.cash < 5000 || (active.marketingCampaigns ?? []).filter((campaign) => campaign.weeksLeft > 0).length >= 2} onClick={() => { setCampaignProductId(marketableProducts[0]?.id); setDialog("marketing"); }}>Planejar campanha</button>
            </header>
            {(active.marketingCampaigns ?? []).filter((campaign) => campaign.weeksLeft > 0).length > 0 ? <div className="active-campaign-list">
              {(active.marketingCampaigns ?? []).filter((campaign) => campaign.weeksLeft > 0).map((campaign) => <article key={campaign.id} className={campaign.revealed ? campaign.outcome : "pending"}>
                <small>{marketingObjectiveLabels[campaign.objective]} · {marketingAudienceLabels[campaign.audience]}</small>
                <b>{campaign.name}</b>
                <div><span>{campaign.weeksLeft} semana{campaign.weeksLeft === 1 ? "" : "s"} restante{campaign.weeksLeft === 1 ? "" : "s"}</span><strong>{campaign.revealed ? marketingOutcomeLabels[campaign.outcome] : "aguardando reação"}</strong></div>
                <i style={{ width: `${Math.round((campaign.duration - campaign.weeksLeft) / campaign.duration * 100)}%` }} />
              </article>)}
            </div> : <p className="no-active-campaign">Nenhuma campanha estratégica ativa. A empresa depende da presença semanal, reputação e indicação.</p>}
          </section>
        </section>
      )}

      {view === "noticias" && (
        <section className="game-page newspaper-page">
          <PageIntro
            kicker="GAZETA DOS NEGÓCIOS"
            title="O mundo não espera sua próxima decisão."
            text={`A edição mostra somente as semanas ${recentNewsStartWeek} a ${game.week}. Notícias antigas continuam influenciando personagens e mercado sem ocupar esta página.`}
          />
          <header className="newspaper-masthead">
            <div>
              <b>GAZETA</b>
              <span>DOS NEGÓCIOS</span>
            </div>
            <small>
              {gameDate} · EDIÇÃO {game.week}
            </small>
            <strong>
              Humor: {game.economy.confidence >= 72 ? "otimista" : game.economy.confidence <= 42 ? "tenso" : "cauteloso"} · {game.economy.confidence}/100
            </strong>
          </header>
          <div className="news-window-note"><b>ÚLTIMAS 3 SEMANAS</b><span>{recentNews.length} matérias nesta edição · {Math.max(0, game.news.length - recentNews.length)} arquivadas automaticamente</span></div>
          {recentNews.length ? (
            <div className="news-grid">
              {recentNews.map((item, index) => {
                const repercussion = newsRepercussion(item);
                return (
                  <article
                    className={`${item.impact} ${index === 0 ? "lead-story" : ""}`}
                    key={item.id}
                  >
                    <small>{item.category.toUpperCase()} · SEMANA {item.week}</small>
                    <div className="news-byline">
                      <b>{item.source ?? "Redação Gazeta"}</b>
                      <span>{item.scope ?? "mercado"}{item.region ? ` · ${item.region}` : ""}</span>
                    </div>
                    <h2>{item.headline}</h2>
                    <p>{item.body}</p>
                    {!!item.tags?.length && <div className="news-tags">{item.tags.slice(0, 3).map((tag) => <span key={tag}>#{tag}</span>)}</div>}
                    <div className="news-pulse">
                      <b>{repercussion.score > 0 ? "+" : ""}{repercussion.score}</b>
                      <div><small>REAÇÃO {repercussion.intensity.toUpperCase()}</small><p>{repercussion.marketReaction}</p></div>
                    </div>
                    <blockquote>“{repercussion.comments[0].text}” <small>— {repercussion.comments[0].name}</small></blockquote>
                    <button className="news-open" onClick={() => { setSelectedNews(item); setDialog("news-detail"); }}>
                      Ver repercussão e comentários
                    </button>
                  </article>
                );
              })}
            </div>
          ) : (
            <div className="empty-news">
              Nenhum fato novo nas últimas três semanas. Coloque o tempo em movimento.
            </div>
          )}
        </section>
      )}

      {view === "jornada" && (
        <section className="game-page journey-page">
          <PageIntro
            kicker="MODO HISTÓRIA"
            title={game.dynastyMode ? `Geração ${game.generation}: ${currentLeader}` : `A jornada de ${game.founder}`}
            text={game.founderJourneyComplete ? `${game.founder} já possui um final: ${endingDetails[projectedFounderEnding].title}. A empresa pode continuar, mas a trajetória principal foi concluída.` : `${game.holdingName} nasceu de uma aposta. A campanha do fundador termina por volta da semana 130 e suas escolhas decidirão qual final será escrito.`}
            action={<button onClick={() => setDialog(game.dynastyMode ? "dynasty" : game.founderJourneyReady ? "founder-finale" : "legacy")}>{game.dynastyMode ? "Abrir Modo Dinastia" : game.founderJourneyReady ? "Finalizar fundador" : "Vida e sucessão"}</button>}
          />
          {!game.dynastyMode && <div className="founder-campaign-card">
            <div className="campaign-progress-ring"><b>{founderJourneyProgress}%</b><span>da jornada</span></div>
            <div className="campaign-current-act"><small>ATO {currentFounderAct.id} DE 6 · SEMANAS {currentFounderAct.start}–{currentFounderAct.end}</small><h2>{currentFounderAct.title}</h2><p>{currentFounderAct.description}</p><div><i style={{ width: `${founderJourneyProgress}%` }} /></div><span>{game.founderJourneyComplete ? "Jornada concluída" : game.week >= 130 ? "Seu final está disponível" : `Faltam ${130 - game.week} semanas para o encerramento máximo`}</span></div>
            <aside><small>PRÓXIMO MARCO</small><b>{nextJourneyMission?.title ?? "O final do fundador"}</b><p>{nextJourneyMission?.objective ?? endingDetails[projectedFounderEnding].description}</p>{game.founderJourneyReady && !game.founderJourneyComplete && <button onClick={() => setDialog("founder-finale")}>Escrever o final</button>}</aside>
          </div>}
          {!game.dynastyMode && <div className="founder-act-road">{founderActs.map((act) => <article className={`${currentFounderAct.id === act.id ? "current" : ""} ${game.week > act.end ? "passed" : ""}`} key={act.id}><b>{act.id}</b><span>{act.title}</span><small>S{act.start}–{act.end}</small></article>)}</div>}
          {!game.dynastyMode && <div className="founder-story-cast">
            <section className="helena-comment"><small>HELENA DIZ</small><p>{mentorComment(game).replace("Helena: ", "")}</p></section>
            <section className="nemesis-card"><small>RIVAL PRINCIPAL</small><h3>{nemesis?.name ?? "O mercado"}</h3><p>{nemesis ? `${nemesis.founder} · ${nemesis.personality} · relação ${nemesis.relationship ?? "neutro"}` : "Sua rivalidade ainda será escolhida."}</p><span>{nemesis?.lastDecision ?? "Observando sua primeira decisão."}</span></section>
            <section className="founder-personal-score"><small>A PESSOA ATRÁS DO CARGO</small><div>{Object.entries(founderPersonal).map(([key, value]) => <span className={key === "regrets" ? "regret" : ""} key={key}>{founderPersonalLabels[key as keyof FounderPersonal]}<b>{Math.round(value)}</b></span>)}</div></section>
          </div>}
          <div className="journey-summary">
            <div>
              <small>CAPÍTULO ATUAL</small>
              <b>{Math.min(6, Math.max(1, game.chapter))}</b>
              <span>{chapterTitle}</span>
            </div>
            <div>
              <small>MISSÕES CONCLUÍDAS</small>
              <b>
                {game.completedMissions?.length ?? 0}/{missions.length}
              </b>
              <span>Legado {game.legacy}</span>
            </div>
            <div>
              <small>PRÓXIMA RECOMPENSA</small>
              <b>
                {compact.format(
                  nextJourneyMission?.rewardCash ?? 0,
                )}
              </b>
              <span>Patrimônio pessoal</span>
            </div>
            <div>
              <small>VIDA DO FUNDADOR</small>
              <b>{founderAge} anos</b>
              <span>{game.founderRetired ? "Aposentado" : `${lifeGoalProgress}% do objetivo de vida`}</span>
            </div>
          </div>
          <div className="mission-road">
            {missions.map((mission, index) => {
              const completed = (game.completedMissions ?? []).includes(
                mission.id,
              );
              const unlocked = game.week >= (mission.unlockWeek ?? 1);
              const progress = Math.min(mission.target, mission.progress(game));
              const percent = Math.round((progress / mission.target) * 100);
              return (
                <article
                  className={`${completed ? "completed" : ""} ${!unlocked ? "locked" : ""}`}
                  key={mission.id}
                >
                  <div className="mission-chapter">
                    <span>CAPÍTULO {mission.chapter}</span>
                    <b>{completed ? "✓" : index + 1}</b>
                  </div>
                  <div className="mission-copy">
                    <small>
                      {completed
                        ? "MISSÃO CONCLUÍDA"
                        : unlocked
                          ? "MISSÃO ATUAL"
                          : "BLOQUEADA"}
                    </small>
                    <h2>{mission.title}</h2>
                    <p>{mission.story}</p>
                    <strong>{mission.objective}</strong>
                    {unlocked && (
                      <>
                        <div className="mission-progress">
                          <i style={{ width: `${percent}%` }} />
                        </div>
                        <div className="mission-progress-label">
                          <span>
                            {mission.target >= 100000
                              ? compact.format(progress)
                              : progress}{" "}
                            /{" "}
                            {mission.target >= 100000
                              ? compact.format(mission.target)
                              : mission.target}
                          </span>
                          <b>{percent}%</b>
                        </div>
                      </>
                    )}
                  </div>
                  <div className="mission-reward">
                    <small>RECOMPENSA</small>
                    <b>{money.format(mission.rewardCash)}</b>
                    <span>+{mission.rewardLegacy} legado</span>
                  </div>
                </article>
              );
            })}
          </div>
        </section>
      )}

      {view === "portfolio" && (
        <section className="game-page">
          <PageIntro
            kicker="SUA HOLDING"
            title={game.holdingName ?? `Grupo ${game.founder}`}
            text={`Patrimônio pessoal: ${money.format(game.personalCash)}. Controladoras, subsidiárias e empresas fundadas formam uma história que pode sobreviver a cada negócio.`}
            action={<div className="page-actions">
              {game.dynastyMode && <button onClick={() => setDialog("dynasty")}>Conselho da dinastia</button>}
              <button onClick={() => setDialog("factions")}>Mapa de poder</button>
              <button onClick={() => setDialog("annual-plan")}>{game.annualPlan ? "Plano anual" : "Definir plano anual"}</button>
              <button onClick={() => setDialog("new-company")}>Abrir nova empresa</button>
            </div>}
          />
          <div className="holding-banner">
            <div>
              <small>ESTRUTURA SOCIETÁRIA</small>
              <h2>{game.holdingName ?? `Grupo ${game.founder}`}</h2>
              <p>
                Nomeie executivos, movimente capital, cobre dividendos e decida
                quais operações merecem continuar no grupo.
              </p>
            </div>
            <div>
              <b>
                {
                  game.companies.filter(
                    (c) => !c.sold && !c.bankrupt && !c.closed,
                  ).length
                }
              </b>
              <span>empresas ativas</span>
            </div>
            <div>
              <b>
                {
                  game.companies.filter(
                    (c) =>
                      c.parentCompanyId && !c.sold && !c.bankrupt && !c.closed,
                  ).length
                }
              </b>
              <span>subsidiárias</span>
            </div>
          </div>
          <div className="holding-politics-overview">
            <section><header><small>FORÇAS INTERNAS</small><h3>A holding tem grupos, não apenas cargos</h3></header><div>{(game.factions ?? []).slice().sort((a, b) => b.power - a.power).slice(0, 3).map((faction) => <button onClick={() => { setSelectedFactionId(faction.id); setDialog("factions"); }} key={faction.id}><span>{faction.name}</span><b>{Math.round(faction.power)} poder</b><i className={faction.support < 35 ? "bad" : "good"}>{Math.round(faction.support)} apoio</i></button>)}</div></section>
            <section className="annual-plan-overview"><header><small>COMPROMISSO ANUAL</small><h3>{game.annualPlan?.title ?? "Nenhuma promessa definida"}</h3></header>{game.annualPlan ? <><p>Semana {game.week} de {game.annualPlan.endWeek} · prioridade {game.annualPlan.priority}</p><div><i style={{ width: `${annualTimeProgress}%` }} /></div><span>{annualTimeProgress}% do ano transcorrido</span></> : <><p>Sem um plano, as facções disputam prioridades sem uma referência pública.</p><button onClick={() => setDialog("annual-plan")}>Escolher direção para 52 semanas</button></>}</section>
          </div>
          <div className="org-chart">
            <div className="org-founder">
              <small>{game.dynastyMode ? `DINASTIA · GERAÇÃO ${game.generation ?? 2}` : "FUNDADOR E PRESIDENTE DA HOLDING"}</small>
              <b>{game.dynastyMode ? currentLeader : game.founder}</b>
              <span>{game.dynastyMode ? `Fundador: ${game.founder} · ${game.founderDeceased ? "falecido" : "presidente honorário"}` : game.holdingName ?? `Grupo ${game.founder}`}</span>
            </div>
            <div className="org-trunk" />
            <div className="org-companies">
              {game.companies
                .filter((c) => !c.sold && !c.bankrupt && !c.closed)
                .map((c) => {
                  const allied = game.companies.find(
                    (peer) => peer.id === c.ceoAllianceCompanyId,
                  );
                  const rival = game.companies.find(
                    (peer) => peer.id === c.ceoRivalCompanyId,
                  );
                  return (
                    <button key={c.id} onClick={() => openHoldingCompany(c)}>
                      <small>{c.parentCompanyId ? "SUBSIDIÁRIA" : "CONTROLADA"}</small>
                      <strong>{c.name}</strong>
                      <b>{c.ceo}</b>
                      <span>
                        Lealdade {Math.round(c.ceoLoyalty ?? 100)} · Ambição{" "}
                        {Math.round(c.ceoAmbition ?? 25)}
                      </span>
                      {allied && <em className="alliance">Aliado de {allied.ceo}</em>}
                      {rival && <em className="rivalry">Rival de {rival.ceo}</em>}
                    </button>
                  );
                })}
            </div>
          </div>
          <div className="empire-line">
            {game.companies.map((c, index) => {
              const cm = companyMetrics(c, game.economy);
              const parent = game.companies.find(
                (parentCompany) => parentCompany.id === c.parentCompanyId,
              );
              return (
                <article
                  className={`${c.sold || c.bankrupt || c.closed ? "sold" : ""} ${c.parentCompanyId ? "subsidiary" : "controller"}`}
                  key={c.id}
                >
                  <div className="timeline-dot">
                    {c.parentCompanyId ? "↳" : index + 1}
                  </div>
                  <span>
                    {c.bankrupt
                      ? "FALÊNCIA"
                      : c.sold
                        ? "VENDIDA"
                        : c.closed
                          ? "ENCERRADA"
                          : c.parentCompanyId
                            ? "SUBSIDIÁRIA"
                            : "CONTROLADA"}
                  </span>
                  <h2>{c.name}</h2>
                  <p>
                    {c.sector} ·{" "}
                    {c.origin === "adquirida"
                      ? `adquirida por ${compact.format(c.acquisitionPrice ?? 0)}`
                      : `fundada na semana ${c.founded}`}
                    {parent ? ` · vinculada à ${parent.name}` : ""}
                    {c.buyer ? ` · comprada por ${c.buyer}` : ""}
                    {c.mergedInto ? ` · incorporada pela ${c.mergedInto}` : ""}
                  </p>
                  <div className="company-governance">
                    <small>
                      CEO <b>{c.ceo}</b>
                    </small>
                    <small>
                      Gestão <b>{c.autonomy ?? "centralizada"}</b>
                    </small>
                    <small>
                      Dividendos <b>{c.dividendRate ?? 0}%</b>
                    </small>
                  </div>
                  <strong>
                    {c.bankrupt || c.closed
                      ? "Operação encerrada"
                      : c.sold
                        ? "Somente histórico"
                        : compact.format(cm.valuation)}
                  </strong>
                  {!c.sold && !c.bankrupt && !c.closed && (
                    <div className="company-card-actions">
                      <button onClick={() => openHoldingCompany(c)}>
                        Gerir empresa
                      </button>
                      <button
                        onClick={() => {
                          setGame((s) => ({ ...s, activeCompanyId: c.id }));
                          setView("escritorio");
                        }}
                      >
                        Assumir comando
                      </button>
                    </div>
                  )}
                </article>
              );
            })}
            <article className="future-company">
              <div className="timeline-dot">?</div>
              <span>PRÓXIMO CAPÍTULO</span>
              <h2>O que você vai construir agora?</h2>
              <button onClick={() => setDialog("new-company")}>
                Fundar empresa
              </button>
            </article>
          </div>
          <div className="legacy-strip">
            <div>
              <small>EMPRESAS CRIADAS</small>
              <b>{game.companies.length}</b>
            </div>
            <div>
              <small>VENDAS REALIZADAS</small>
              <b>{game.companies.filter((c) => c.sold).length}</b>
            </div>
            <div>
              <small>REPUTAÇÃO DO FUNDADOR</small>
              <b>{game.reputation + game.legacy}</b>
            </div>
            <div>
              <small>VALOR DO GRUPO</small>
              <b>{compact.format(empireValue)}</b>
            </div>
          </div>
        </section>
      )}

      {dialog === "founder-finale" && (
        <GameModal onClose={() => setDialog(null)} wide>
          <div className="founder-finale-room">
            <header>
              <div>
                <small>{game.founderJourneyComplete ? "ÁLBUM DA CARREIRA" : "O ÚLTIMO CAPÍTULO"}</small>
                <h2>{endingDetails[projectedFounderEnding].title}</h2>
                <p>{endingDetails[projectedFounderEnding].description}</p>
              </div>
              <div className="finale-seal">
                <b>{game.founderJourneyComplete ? "FIM" : Math.max(0, 130 - game.week)}</b>
                <span>{game.founderJourneyComplete ? `semana ${game.founderEndingWeek ?? game.week}` : "semanas restantes"}</span>
              </div>
            </header>

            <section className="founder-verdict">
              <div>
                <small>COMO O MERCADO LEMBRA</small>
                <h3>{game.founder}</h3>
                <blockquote>“{mentorComment(game).replace("Helena: ", "")}”</blockquote>
              </div>
              <div className="founder-final-stats">
                <span><small>IMPÉRIO</small><b>{compact.format(empireValue)}</b></span>
                <span><small>EMPRESAS</small><b>{game.companies.length}</b></span>
                <span><small>VENDIDAS</small><b>{game.companies.filter((company) => company.sold).length}</b></span>
                <span><small>FALÊNCIAS</small><b>{game.companies.filter((company) => company.bankrupt).length}</b></span>
                <span><small>PRODUTOS</small><b>{game.companies.reduce((total, company) => total + (company.projects ?? []).filter((project) => project.kind === "produto").length, 0)}</b></span>
                <span><small>LEGADO</small><b>{game.legacy}</b></span>
              </div>
            </section>

            {!game.founderJourneyComplete ? (
              <section className="legacy-probability-room">
                <header><small>FUTUROS POSSÍVEIS</small><h3>O que poderá acontecer depois de você?</h3><p>As chances refletem família, sucessão, integridade, empresas, conselho e decisões acumuladas. Ao concluir, um futuro será sorteado uma única vez e ficará registrado neste save.</p></header>
                <div className="legacy-probability-grid">
                  {(["duradouro", "ambivalente", "ruptura"] as FounderLegacyPath[]).map((path) => (
                    <article className={path} key={path}>
                      <b>{founderLegacyProbabilities[path]}%</b>
                      <span>{legacyPathDetails[path].title}</span>
                      <p>{legacyPathDetails[path].description}</p>
                    </article>
                  ))}
                </div>
                <footer><span>Essas porcentagens ainda podem mudar</span><b>Suas decisões finais continuam importando.</b></footer>
              </section>
            ) : founderLegacyOutcome && (
              <section className={`legacy-outcome-room ${founderLegacyOutcome.impactTone}`}>
                <header>
                  <div><small>EPÍLOGO DA PRIMEIRA GERAÇÃO · CHANCE ORIGINAL {founderLegacyOutcome.probability}%</small><h3>{founderLegacyOutcome.title}</h3></div>
                  <strong>{founderLegacyOutcome.impactScore > 0 ? "+" : ""}{founderLegacyOutcome.impactScore}</strong>
                </header>
                <blockquote>“{founderLegacyOutcome.narrative}”</blockquote>
                <div className="legacy-outcome-stats">
                  <span><small>ÚLTIMA GERAÇÃO</small><b>{founderLegacyOutcome.generation}</b></span>
                  <span><small>VALOR MOVIMENTADO</small><b>{compact.format(founderLegacyOutcome.financialValue)}</b></span>
                  <span><small>PESSOAS IMPACTADAS</small><b>{founderLegacyOutcome.peopleImpacted.toLocaleString("pt-BR")}</b></span>
                  <span><small>MEMÓRIA HISTÓRICA</small><b>{founderLegacyOutcome.impactTone}</b></span>
                </div>
                <footer>{founderLegacyOutcome.drivers.map((driver) => <span key={driver}>{driver}</span>)}</footer>
              </section>
            )}

            <section className="founder-life-balance">
              {(Object.entries(founderPersonal) as [keyof FounderPersonal, number][]).map(([key, value]) => (
                <div className={key === "regrets" ? "regret" : ""} key={key}>
                  <span>{founderPersonalLabels[key]}</span><b>{Math.round(value)}</b><i><em style={{ width: `${value}%` }} /></i>
                </div>
              ))}
            </section>

            <section className="career-album">
              <header><small>MOMENTOS QUE DEFINIRAM A JORNADA</small><h3>Não foi apenas uma planilha</h3></header>
              <div>
                {(game.careerMoments ?? []).slice(-10).reverse().map((moment, index) => (
                  <article className={moment.tone} key={`${moment.week}-${moment.title}-${index}`}>
                    <b>S{moment.week}</b><span><strong>{moment.title}</strong>{moment.detail}</span>
                  </article>
                ))}
                {!(game.careerMoments ?? []).length && <p className="career-empty">As escolhas mais pessoais da carreira aparecerão aqui conforme as semanas avançarem.</p>}
              </div>
            </section>

            <footer className="founder-finale-actions">
              {!game.founderJourneyComplete ? (
                <>
                  <p>Concluir registra este final para {game.founder}. A holding não acaba: você ainda poderá continuar no mundo aberto ou preparar a sucessão.</p>
                  <button className="finale-primary" disabled={!game.founderJourneyReady} onClick={completeFounderJourney}>Concluir a jornada de {game.founder}</button>
                  <button onClick={() => setDialog(null)}>Ainda não. Quero mudar meu destino.</button>
                </>
              ) : (
                <>
                  <p>A história principal terminou, mas o império permanece vivo. Continue administrando ou entregue o comando à próxima geração.</p>
                  <button className="finale-primary" onClick={() => setDialog(null)}>Continuar no mundo aberto</button>
                  <button onClick={() => setDialog(game.dynastyMode ? "dynasty" : "legacy")}>{game.dynastyMode ? "Ver a dinastia" : "Preparar sucessão"}</button>
                </>
              )}
            </footer>
          </div>
        </GameModal>
      )}

      {dialog === "factions" && selectedFaction && active && (
        <GameModal onClose={() => setDialog(null)} wide>
          <div className="faction-room">
            <header><div><small>POLÍTICA DA HOLDING</small><h2>Quem realmente sustenta seu poder?</h2><p>Facções reúnem CEOs, funcionários, herdeiros e investidores. Poder alto com apoio baixo pode virar oposição, pressão no conselho ou tentativa de mudança de comando.</p></div><b>{(game.factions ?? []).filter((faction) => faction.support < 35).length}<span>grupos em oposição</span></b></header>
            <nav>{(game.factions ?? []).map((faction) => <button className={`${selectedFaction.id === faction.id ? "active" : ""} ${faction.support < 35 ? "hostile" : ""}`} onClick={() => setSelectedFactionId(faction.id)} key={faction.id}><b>{faction.name}</b><span>{faction.agenda} · poder {Math.round(faction.power)}</span></button>)}</nav>
            <section className="faction-profile"><div className="faction-main"><small>AGENDA: {selectedFaction.agenda.toUpperCase()}</small><h3>{selectedFaction.name}</h3><p>Liderada por <b>{selectedFaction.leader}</b>. {selectedFaction.lastMove}</p><div className="faction-members"><small>MEMBROS VISÍVEIS</small>{selectedFaction.members.map((member) => <span key={member}>{member}</span>)}</div></div><div className="faction-meters"><div><span>Poder</span><b>{Math.round(selectedFaction.power)}%</b><i><em style={{ width: `${selectedFaction.power}%` }} /></i></div><div><span>Apoio a você</span><b>{Math.round(selectedFaction.support)}%</b><i><em style={{ width: `${selectedFaction.support}%` }} /></i></div><div><span>Pressão</span><b>{Math.round(selectedFaction.pressure)}%</b><i><em style={{ width: `${selectedFaction.pressure}%` }} /></i></div>{(selectedFaction.agendaWeeks ?? 0) > 0 && <p>Agenda aprovada por mais {selectedFaction.agendaWeeks} semanas.</p>}</div></section>
            <section className="faction-actions"><button disabled={active.cash < 30000} onClick={() => factionAction("negociar")}><b>Negociar apoio · R$ 30 mil</b><span>Abre diálogo, reduz pressão e melhora apoio sem entregar toda a agenda.</span></button><button onClick={() => factionAction("agenda")}><b>Aprovar agenda por 8 semanas</b><span>Concede benefícios de {selectedFaction.agenda}, mas fortalece politicamente o grupo.</span></button><button className="danger" onClick={() => factionAction("confrontar")}><b>Confrontar a facção</b><span>Fortalece sua autoridade imediata, mas cria oposição e aumenta pressão.</span></button></section>
            <footer className="faction-chronicle"><small>CRÔNICA POLÍTICA</small>{(game.factionHistory ?? []).slice(0, 6).map((entry, index) => <p key={`${entry}-${index}`}>{entry}</p>)}</footer>
          </div>
        </GameModal>
      )}
      {dialog === "annual-plan" && (
        <GameModal onClose={() => setDialog(null)} wide>
          <div className="annual-room">
            <header><div><small>PLANEJAMENTO E PRESTAÇÃO DE CONTAS</small><h2>{game.annualPlan?.title ?? "Que promessa guiará o próximo ano?"}</h2><p>O plano dura 52 semanas. Mercado, conselho, facções e funcionários compararão o discurso inicial com os resultados finais.</p></div>{game.annualPlan && <b>{annualTimeProgress}%<span>do ano concluído</span></b>}</header>
            {!game.annualPlan ? <section className="annual-choices">{(Object.entries(annualPlanDetails) as [AnnualPriority, { title: string; promises: string[] }][]).map(([priority, details]) => <button className={annualPriorityChoice === priority ? "active" : ""} onClick={() => setAnnualPriorityChoice(priority)} key={priority}><small>{priority}</small><h3>{details.title}</h3>{details.promises.map((promise) => <span key={promise}>✓ {promise}</span>)}</button>)}</section> : <section className="active-annual-plan"><div className="annual-progress"><span><i style={{ width: `${annualTimeProgress}%` }} /></span><b>Termina na semana {game.annualPlan.endWeek}</b></div><div className="annual-promises">{game.annualPlan.promises.map((promise, index) => <article key={promise}><small>PROMESSA {index + 1}</small><b>{promise}</b></article>)}</div><div className="annual-live-numbers"><div><small>FATURAMENTO</small><b>{compact.format(currentAnnualSnapshot.revenue)}</b><span>início {compact.format(game.annualPlan.baseline.revenue)}</span></div><div><small>CAIXA DO GRUPO</small><b>{compact.format(currentAnnualSnapshot.cash)}</b><span>início {compact.format(game.annualPlan.baseline.cash)}</span></div><div><small>CLIENTES</small><b>{currentAnnualSnapshot.customers}</b><span>início {game.annualPlan.baseline.customers}</span></div><div><small>MORAL / ESTRESSE</small><b>{Math.round(currentAnnualSnapshot.morale)} / {Math.round(currentAnnualSnapshot.stress)}</b><span>médias atuais</span></div></div></section>}
            {!game.annualPlan && <button className="start-annual-plan" onClick={startAnnualPlan}>Assumir estas promessas por 52 semanas</button>}
            {!!game.annualReviews?.length && <section className="annual-reviews"><header><small>RETROSPECTIVAS</small><h3>O mercado não esquece promessas</h3></header>{game.annualReviews.map((review) => <article key={review.year}><div><small>ANO {review.year} · {review.priority}</small><b>{review.score}%</b><span>{review.verdict}</span></div><section>{review.results.map((result) => <p className={result.achieved ? "achieved" : "failed"} key={result.label}><i>{result.achieved ? "✓" : "×"}</i><b>{result.label}</b><span>{result.detail}</span></p>)}</section><footer><span>Melhor decisão: <b>{review.bestDecision}</b></span><span>Pior decisão: <b>{review.worstDecision}</b></span></footer></article>)}</section>}
          </div>
        </GameModal>
      )}
      {dialog === "partner" && selectedPartner && active && (
        <GameModal onClose={() => { setDialog(null); setSelectedPartnerId(null); }} wide>
          <div className="partner-room">
            <header><div><small>{selectedPartner.kind.toUpperCase()} ESTRATÉGICO · {selectedPartner.status.toUpperCase()}</small><h2>{selectedPartner.name}</h2><p>{selectedPartner.representative} negocia com perfil {selectedPartner.personality}. Sua identidade como {leadershipTitle.toLowerCase()} influencia a confiança e a força do acordo.</p></div><b>{money.format(selectedPartner.proposedValue ?? selectedPartner.weeklyValue)}<span>{selectedPartner.status === "proposta" ? "valor proposto" : selectedPartner.kind === "cliente" ? "receita" : "custo"}/semana</span></b></header>
            <div className="partner-negotiation-facts"><div><small>CONFIANÇA</small><b>{Math.round(selectedPartner.trust)}%</b></div><div><small>DEPENDÊNCIA</small><b>{Math.round(selectedPartner.dependency)}%</b></div><div><small>CONTRATO</small><b>{selectedPartner.weeksLeft} sem.</b></div><div><small>PODER EFETIVO AGORA</small><b>{Math.round(clamp((game.leadershipIdentity?.negociacao ?? 50) * .45 + (game.leadershipIdentity?.integridade ?? 50) * .2 + selectedPartner.trust * .35 - selectedPartnerEarlyPenalty - (selectedPartner.failedRenegotiations ?? 0) * 8))}%</b></div></div>
            {selectedPartner.status === "disputa" && <div className="contract-dispute-room"><small>CONFLITO CONTRATUAL · NÍVEL {Math.round(selectedPartner.disputeLevel ?? 0)}%</small><p>{selectedPartner.disputeReason}</p></div>}<p className="partner-last-event">“{selectedPartner.lastEvent}”{selectedPartner.lastNegotiatedBy && <small> Última negociação: {selectedPartner.lastNegotiatedBy}</small>}</p>
            {selectedPartnerEarly && <div className="early-negotiation-warning"><small>RENEGOCIAÇÃO PREMATURA · PENALIDADE −{Math.round(selectedPartnerEarlyPenalty)} PONTOS</small><p>O contrato ainda possui {selectedPartner.weeksLeft} semanas. Reabrir agora pode reduzir confiança, iniciar uma disputa ou provocar rescisão.</p></div>}
            {selectedPartnerCooldown > 0 && <div className="early-negotiation-warning cooldown"><small>MESA FECHADA</small><p>A contraparte só aceitará uma nova tentativa em {selectedPartnerCooldown} semana{selectedPartnerCooldown === 1 ? "" : "s"}.</p></div>}
            <section className="partner-decisions">
              {selectedPartner.status === "proposta" && <button disabled={selectedPartnerCooldown > 0} onClick={() => partnerAction("aceitar")}><b>Aceitar proposta</b><span>{selectedPartner.proposedWeeks} semanas · ativa imediatamente a nova conta ou fornecimento.</span></button>}
              <button disabled={selectedPartnerCooldown > 0} onClick={() => partnerAction("renovar")}><b>{selectedPartnerEarly ? "Tentar renegociar antes do prazo" : "Renovar com equilíbrio"}</b><span>{selectedPartnerEarly ? "Alto risco · poder reduzido pelo tempo restante" : "18 semanas · pequeno reajuste contratual"}.</span></button>
              <button disabled={selectedPartnerCooldown > 0} onClick={() => partnerAction("pressionar")}><b>Pressionar por condições melhores</b><span>{selectedPartner.kind === "cliente" ? "+10% de receita" : "−9% de custo"} se funcionar; pode causar disputa ou rescisão.</span></button>
              <button disabled={active.cash < 20000 || selectedPartnerCooldown > 0 || selectedRelationshipCooldown > 0} onClick={() => partnerAction("relacionamento")}><b>Investir na relação · R$ 20 mil</b><span>{selectedRelationshipCooldown > 0 ? `Disponível novamente em ${selectedRelationshipCooldown} semanas` : "Ganho decrescente de confiança · cooldown de 6 semanas"}.</span></button>
              <button className="danger" onClick={() => partnerAction("encerrar")}><b>Encerrar contrato</b><span>Remove imediatamente receita ou custo e pode afetar reputação.</span></button>
            </section>
          </div>
        </GameModal>
      )}
      {dialog === "weekly-report" && selectedWeeklyReport && (
        <GameModal onClose={() => setDialog(null)} wide>
          <div className="weekly-advice-room">
            <header className="weekly-advice-title">
              <div className="advisor-avatar">HD</div>
              <div><small>TRÊS CARTÕES · SEMANA {selectedWeeklyReport.week}</small><h2>{selectedWeeklyReport.headline}</h2><p>Helena filtrou toda a holding e trouxe apenas o problema mais urgente, a melhor oportunidade e uma recomendação prática.</p></div>
              <span className={`report-severity ${selectedWeeklyReport.companies.some((company) => company.severity === "critico") ? "critico" : selectedWeeklyReport.companies.some((company) => company.severity === "atencao") ? "atencao" : "normal"}`}>{weeklyDigest.length} cartões</span>
            </header>
            <section className="advisor-quote"><b>Helena:</b> “Eu li os números. Você só precisa escolher onde agir — ou quando não mexer em nada.”</section>
            <section className={`narrative-moment ${game.narrativeDirector?.mode ?? "equilibrio"}`}><div><small>MOMENTO DA HISTÓRIA</small><h3>{narrativeModeLabels[game.narrativeDirector?.mode ?? "equilibrio"]}</h3><p>{game.narrativeDirector?.lastReason ?? "Problemas e oportunidades estão em equilíbrio."}</p></div><b>{Math.round(game.narrativeDirector?.tension ?? 30)}<span>tensão</span></b></section>
            <section className="weekly-advice-grid">
              {weeklyDigest.map((advice) => <article className={advice.tone} key={`${advice.companyId}-${advice.title}`}><small>{advice.kind === "urgente" ? "PROBLEMA URGENTE" : advice.kind === "oportunidade" ? "OPORTUNIDADE" : "RECOMENDAÇÃO DO ASSESSOR"} · {advice.companyName}</small><h3>{advice.title}</h3><p>{advice.detail}</p><button onClick={() => followWeeklyAdvice(advice, advice.companyId)}>{advice.actionLabel}</button></article>)}
            </section>
            {!!selectedWeekDecisionTraces.length && <section className="causal-timeline">
              <header><div><small>LINHA DE CAUSA E CONSEQUÊNCIA</small><h3>Por que isso está acontecendo?</h3></div><p>O jogo relaciona os efeitos atuais às decisões que ainda estão repercutindo. Economia e outras escolhas também podem influenciar o resultado.</p></header>
              <div>{selectedWeekDecisionTraces.map((trace) => {
                const observations = trace.observations.filter((item) => item.week === selectedWeeklyReport.week);
                return <article key={trace.id}>
                  <div className="causal-origin"><b>S{trace.week}</b><span><small>DECISÃO DE {trace.actor.toUpperCase()}</small><strong>{trace.decision}</strong><em>{trace.title}{trace.companyName ? ` · ${trace.companyName}` : ""}</em></span></div>
                  <p>{trace.result}</p>
                  <div className="causal-impacts">{trace.impacts.map((impact, index) => <span className={impact.tone} key={`${impact.label}-${index}`}>{impact.tone === "positivo" ? "+" : impact.tone === "negativo" ? "−" : "·"} {impact.label}</span>)}</div>
                  {observations.length ? <div className="causal-observations"><small>EFEITO OBSERVADO NA SEMANA {selectedWeeklyReport.week}</small>{observations.map((observation) => <span className={observation.tone} key={`${observation.indicator}-${observation.week}`}><b>{observation.label}</b><i>{observation.delta > 0 ? "+" : ""}{observation.format === "money" ? money.format(observation.delta) : `${observation.delta.toFixed(1)}${observation.format === "percent" ? " p.p." : ""}`}</i></span>)}</div> : <div className="causal-waiting">O efeito ainda está sendo observado.</div>}
                  <footer><span>Continua por até <b>{Math.max(0, trace.expiresWeek - selectedWeeklyReport.week)} semanas</b></span>{!!trace.affectedCharacters.length && <span>Memória: <b>{trace.affectedCharacters.join(", ")}</b></span>}{!!trace.derivedNewsIds.length && <span><b>{trace.derivedNewsIds.length}</b> notícia{trace.derivedNewsIds.length === 1 ? "" : "s"} derivada{trace.derivedNewsIds.length === 1 ? "" : "s"}</span>}</footer>
                </article>;
              })}</div>
            </section>}
            <footer className="weekly-advice-footer"><span>Economia: <b>{selectedWeeklyReport.economyAfter}</b></span><span>Confiança do mercado: <b>{selectedWeeklyReport.confidenceAfter}/100</b></span><button onClick={() => setDialog(null)}>Entendi. Voltar ao jogo.</button></footer>
          </div>
        </GameModal>
      )}
      {dialog === "difficulty" && (
        <GameModal onClose={() => setDialog(null)} wide>
          <div className="difficulty-room"><header><small>DIFICULDADE DA HISTÓRIA</small><h2>Escolha quanto o mundo perdoa seus erros</h2><p>Você pode alterar o ritmo durante o save. A dificuldade muda estresse, demissões, margens econômicas, agressividade dos concorrentes e recompensas das próximas gerações.</p></header><div>{(Object.keys(difficultyProfiles) as GameDifficulty[]).map((level) => <button className={(game.difficulty ?? "executivo") === level ? "active" : ""} onClick={() => setGame((state) => ({ ...state, difficulty: level }))} key={level}><small>{level === "relaxado" ? "MAIS TEMPO" : level === "executivo" ? "EQUILIBRADO" : "SEM PIEDADE"}</small><h3>{difficultyProfiles[level].title}</h3><p>{difficultyProfiles[level].description}</p><span>{level === "relaxado" ? "−28% estresse · rivais menos agressivos" : level === "executivo" ? "Regras e recompensas padrão" : "+28% estresse · crises e rivais mais fortes"}</span></button>)}</div><footer><button onClick={() => setDialog(null)}>Continuar a história</button></footer></div>
        </GameModal>
      )}
      {dialog === "inbox" && (
        <GameModal onClose={() => setDialog(null)} wide>
          <div className="inbox-layout">
            <aside>
              <small>CAIXA DE ENTRADA</small>
              <h2>Conversas</h2>
              {game.unread.length === 0 ? (
                <p className="empty">Nada urgente. Aproveite o silêncio.</p>
              ) : (
                game.unread.map((m) => (
                  <button
                    className={activeMessage?.id === m.id ? "active" : ""}
                    key={m.id}
                    onClick={() => setSelectedMessage(m)}
                  >
                    <Avatar initials={m.initials} color={m.color} />
                    <span>
                      <b>{m.from}</b>
                      <small>{m.subject}</small>
                    </span>
                    <i />
                  </button>
                ))
              )}
            </aside>
            <section>
              {activeMessage ? (
                <>
                  <div className="message-author">
                    <Avatar
                      initials={activeMessage.initials}
                      color={activeMessage.color}
                    />
                    <div>
                      <b>{activeMessage.from}</b>
                      <small>{activeMessage.role}</small>
                    </div>
                  </div>
                  <h2>{activeMessage.subject}</h2>
                  <p>{activeMessage.body}</p>
                  <div className="dialog-choices">
                    {activeMessage.choices.map((c) => (
                      <button
                        className={c.tone ?? ""}
                        key={c.label}
                        onClick={() => chooseMessage(c)}
                      >
                        {c.label}
                        <span>{c.hint ?? "Você descobrirá as consequências depois."}</span>
                      </button>
                    ))}
                  </div>
                </>
              ) : (
                <div className="no-message">
                  <b>✓</b>
                  <h2>Sem mensagens pendentes</h2>
                  <p>Viva mais uma semana para a história continuar.</p>
                </div>
              )}
            </section>
          </div>
        </GameModal>
      )}

      {dialog === "salary" && salaryEmployee && (
        <GameModal
          onClose={() => {
            setDialog(null);
            setSalaryEmployee(null);
            setNegotiationNote("");
          }}
        >
          <ModalTitle
            label="NEGOCIAÇÃO SALARIAL"
            title={`Conversa com ${salaryEmployee.name}`}
            text={`${salaryEmployee.name} recebe ${money.format(salaryEmployee.salary)} por mês. A referência de mercado é ${money.format(salaryEmployee.market)}, mas personalidade, lealdade, cargo e momento da empresa influenciam a decisão.`}
          />
          <div className="salary-negotiation">
            <label>
              <span>Sua proposta mensal</span>
              <b>{money.format(salaryOffer)}</b>
              <input
                type="range"
                min={Math.max(
                  1800,
                  Math.round((salaryEmployee.salary * 0.75) / 100) * 100,
                )}
                max={Math.round((salaryEmployee.market * 1.35) / 100) * 100}
                step="100"
                value={salaryOffer}
                onChange={(e) => {
                  setSalaryOffer(Number(e.target.value));
                  setNegotiationNote("");
                }}
              />
            </label>
            <div className="salary-reference">
              <span>
                Atual <b>{money.format(salaryEmployee.salary)}</b>
              </span>
              <span>
                Mercado <b>{money.format(salaryEmployee.market)}</b>
              </span>
              <span>
                Impacto semanal <b>{money.format(salaryOffer / 4.33)}</b>
              </span>
            </div>
            {negotiationNote && (
              <p className="counter-offer">{negotiationNote}</p>
            )}
            <button className="modal-primary" onClick={negotiateSalary}>
              Fazer proposta
            </button>
          </div>
        </GameModal>
      )}
      {dialog === "facilities" && active && activeFacilitySummary && (
        <GameModal wide onClose={() => setDialog(null)}>
          <div className="facility-room">
          <ModalTitle
            label="ESTRUTURA DA EMPRESA"
            title="O crescimento precisa caber em algum lugar."
            text="Cada melhoria tem investimento inicial, manutenção semanal e condição própria. Cortar manutenção libera caixa agora, mas desgasta o patrimônio e aumenta o risco de interrupções."
          />
          <section className="facility-overview">
            <div><small>CONDIÇÃO MÉDIA</small><b>{Math.round(activeFacilitySummary.averageCondition)}%</b><span>{activeFacilitySummary.averageCondition >= 82 ? "Estrutura saudável" : activeFacilitySummary.averageCondition >= 58 ? "Desgaste administrável" : "Risco operacional elevado"}</span></div>
            <div><small>MANUTENÇÃO SEMANAL</small><b>{money.format(activeFacilitySummary.weeklyMaintenance)}</b><span>{facilityModeLabels[activeFacilitySummary.mode].label}</span></div>
            <div><small>NÍVEIS CONSTRUÍDOS</small><b>{facilityKeys.reduce((sum, key) => sum + activeFacilitySummary.facilities[key].level, 0)}/35</b><span>Quanto maior a estrutura, maior o custo fixo</span></div>
          </section>
          <section className="maintenance-policy">
            <header><small>POLÍTICA DE MANUTENÇÃO</small><h3>Quanto você quer preservar?</h3></header>
            <div>{(Object.keys(facilityModeLabels) as FacilityMaintenanceMode[]).map((mode) => <button className={activeFacilitySummary.mode === mode ? "active" : ""} disabled={!isCEO} key={mode} onClick={() => changeFacilityMaintenance(mode)}><b>{facilityModeLabels[mode].label}</b><span>{Math.round(facilityModeLabels[mode].multiplier * 100)}% do custo-base</span><p>{facilityModeLabels[mode].detail}</p></button>)}</div>
          </section>
          <div className="facility-grid">
            {facilityKeys.map((key) => {
              const definition = facilityDefinitions[key];
              const facility = activeFacilitySummary.facilities[key];
              const nextLevel = Math.min(5, facility.level + 1) as FacilityLevel;
              const nextCost = definition.upgradeCosts[nextLevel];
              const maintenanceNow = Math.round(definition.weeklyMaintenance[facility.level] * facilityModeLabels[activeFacilitySummary.mode].multiplier);
              const maintenanceNext = Math.round(definition.weeklyMaintenance[nextLevel] * facilityModeLabels[activeFacilitySummary.mode].multiplier);
              const effects: Record<FacilityKey, string[]> = {
                escritorio: ["moral", "reputação", "capacidade"], equipamentos: ["projetos", "eficiência", "qualidade"], lazer: ["menos estresse", "clima"], beneficios: ["retenção", "lealdade", "recuperação"], treinamento: ["competência", "qualidade", "projetos"], seguranca: ["menos incidentes", "qualidade", "confiança"], infraestrutura: ["capacidade", "eficiência", "escala"],
              };
              return <article className={`facility-card condition-${facility.condition < 45 ? "bad" : facility.condition < 70 ? "warning" : "good"}`} key={key}>
                <header><small>{definition.short.toUpperCase()}</small><b>NÍVEL {facility.level}</b></header>
                <h3>{definition.label}</h3>
                <p>{definition.description}</p>
                <div className="facility-effects">{effects[key].map((effect) => <span key={effect}>{effect}</span>)}</div>
                <div className="facility-condition"><span><i style={{ width: `${facility.condition}%` }} /></span><b>{Math.round(facility.condition)}% condição</b></div>
                <dl><div><dt>Manutenção atual</dt><dd>{money.format(maintenanceNow)}/sem.</dd></div><div><dt>Incidentes</dt><dd>{facility.incidents}</dd></div>{facility.level < 5 && <div><dt>Após melhoria</dt><dd>{money.format(maintenanceNext)}/sem.</dd></div>}</dl>
                <div className="facility-actions">
                  {facility.level > 0 && facility.condition < 98 && <button className="facility-repair" disabled={!isCEO || active.cash < 8000 + facility.level * 6000} onClick={() => repairFacility(key)}><span>Reparar +35%</span><b>{money.format(8000 + facility.level * 6000)}</b></button>}
                  {facility.level < 5 ? <button disabled={!isCEO || active.cash < nextCost} onClick={() => upgradeFacility(key)}><span>Elevar ao nível {nextLevel}</span><b>{money.format(nextCost)}</b></button> : <strong className="facility-max">ESTRUTURA NO NÍVEL MÁXIMO</strong>}
                </div>
              </article>;
            })}
          </div>
          </div>
        </GameModal>
      )}
      {dialog === "directors" && active && (
        <GameModal onClose={() => setDialog(null)}>
          <ModalTitle
            label="DIRETORIA EXECUTIVA"
            title="Quem transforma sua estratégia em rotina?"
            text="Promova alguém da equipe ou contrate uma liderança externa. Diretores influenciam a área toda semana e também podem falhar, perder confiança ou enfrentar resistência."
          />
          <div className="director-area-tabs">
            {(Object.keys(directorAreaLabels) as DirectorArea[]).map((area) => <button className={directorArea === area ? "active" : ""} key={area} onClick={() => setDirectorArea(area)}>{directorAreaLabels[area]}</button>)}
          </div>
          {(() => {
            const currentDirector = (active.directors ?? []).find((item) => item.area === directorArea);
            const internalCandidates = active.employees
              .filter((employee) => !(active.directors ?? []).some((director) => director.employeeId === employee.id))
              .sort((a, b) => b.skill + b.loyalty * .25 - (a.skill + a.loyalty * .25))
              .slice(0, 5);
            const externalCandidates = createLaborMarket(active.sector, active.id + 37, game.week, active.employees.map((employee) => employee.name), 7, active)
              .sort((a, b) => b.skill - a.skill)
              .slice(0, 4);
            return currentDirector ? <section className="current-director-detail">
              <small>{directorAreaLabels[directorArea].toUpperCase()}</small>
              <h3>{currentDirector.name}</h3>
              <p>{currentDirector.lastAction}</p>
              <div><span>Competência <b>{Math.round(currentDirector.competence)}</b></span><span>Confiança <b>{Math.round(currentDirector.trust)}</b></span><span>Autoridade <b>{Math.round(currentDirector.authority)}</b></span></div>
              <button className="danger-action" disabled={!isCEO} onClick={() => { removeDirector(currentDirector); setDialog(null); }}>Destituir diretor</button>
            </section> : <div className="director-candidate-columns">
              <section>
                <header><small>PROMOÇÃO INTERNA · CUSTO R$ 12 MIL</small><h3>Quem já conhece a casa</h3></header>
                <div className="director-candidates">{internalCandidates.map((candidate) => <button disabled={!isCEO || active.cash < 12000} key={candidate.id} onClick={() => { appointDirector(candidate, directorArea); setDialog(null); }}>
                  <Avatar initials={candidate.initials} color={candidate.color} /><span><b>{candidate.name}</b><small>{candidate.role} · estilo {directorStyle(candidate)}</small><em>Competência {candidate.skill} · lealdade {Math.round(candidate.loyalty)}</em></span><strong>{money.format(Math.round(Math.max(candidate.salary * 1.25, candidate.market * 1.08) / 100) * 100)}</strong>
                </button>)}</div>
              </section>
              <section>
                <header><small>BUSCA EXTERNA · R$ 25 MIL + BÔNUS</small><h3>Experiência nova, confiança por construir</h3></header>
                <div className="director-candidates">{externalCandidates.map((candidate) => <button disabled={!isCEO || active.cash < 25000 + (candidate.signingBonus ?? 0)} key={candidate.id} onClick={() => { appointDirector(candidate, directorArea, true); setDialog(null); }}>
                  <Avatar initials={candidate.initials} color={candidate.color} /><span><b>{candidate.name}</b><small>{candidate.role} · estilo {directorStyle(candidate)}</small><em>Competência {candidate.skill} · adaptação inicial</em></span><strong>{money.format(Math.round(Math.max(candidate.salary * 1.48, candidate.market * 1.08) / 100) * 100)}</strong>
                </button>)}</div>
              </section>
            </div>;
          })()}
        </GameModal>
      )}
      {dialog === "hire" && (
        <GameModal onClose={() => setDialog(null)}>
          <ModalTitle
            label="MERCADO DE TALENTOS"
            title="Uma contratação muda o grupo."
            text={`A lista é própria do setor e da região da ${active?.name ?? "empresa"}, com novos perfis a cada duas semanas. Talentos melhores observam reputação, estrutura, benefícios, clima e porte antes de aceitar uma conversa.`}
          />
          {active && (() => { const attraction = employerAttraction(active); return <section className="talent-market-summary"><div><small>MARCA EMPREGADORA</small><b>{attraction.score}/100</b><span>{attraction.label}</span></div><div><small>CLIMA PERCEBIDO</small><b>{attraction.morale}%</b><span>Estresse médio {attraction.stress}%</span></div><div><small>FAIXA MAIS PROVÁVEL</small><b>{attraction.score >= 82 ? "Sênior e elite" : attraction.score >= 62 ? "Pleno e sênior" : attraction.score >= 42 ? "Júnior e pleno" : "Iniciante e júnior"}</b><span>Melhore benefícios, treinamento e reputação para avançar</span></div></section>; })()}
          <div className="hire-list">
            {(active ? createLaborMarket(active.sector, active.id, game.week, active.employees.map((employee) => employee.name), 10, active) : [])
              .map((c) => { const acceptance = active ? candidateAcceptance(active, c) : 0; const onboarding = 2500 + (c.signingBonus ?? 0); return (
                <button disabled={!active || active.cash < onboarding} key={c.name} onClick={() => hire(c)}>
                  <Avatar initials={c.initials} color={c.color} />
                  <span>
                    <b>{c.name}</b>
                    <small>
                      {c.role} · {c.trait} · {talentTierLabels[c.talentTier ?? talentTierFor(c.skill)]}
                    </small>
                    <em>“{c.ambition}.”</em>
                    <i className={`candidate-chance ${acceptance < 50 ? "low" : acceptance >= 80 ? "high" : ""}`}>{acceptance}% de chance de aceitar · competência {c.skill}</i>
                  </span>
                  <strong>{money.format(c.salary)}<small>/mês<br />+ {money.format(onboarding)} integração</small></strong>
                </button>
              ); })}
          </div>
        </GameModal>
      )}
      {dialog === "project" && (
        <GameModal onClose={() => setDialog(null)}>
          <ModalTitle
            label="NOVA APOSTA"
            title="Escolha o próximo projeto."
            text="O retorno é apenas uma estimativa. Equipe, qualidade e acontecimentos podem mudar tudo."
          />
          <div className="choice-cards">
            <button onClick={() => createProject("seguro")}>
              <span>SEGURO</span>
              <b>Melhoria contínua</b>
              <p>Baixo risco, retorno previsível e pouco impacto na marca.</p>
            </button>
            <button onClick={() => createProject("ousado")}>
              <span>OUSADO</span>
              <b>Produto revolucionário</b>
              <p>
                Grande investimento. Pode mudar a empresa ou consumir seus
                recursos. Desenvolvimento estimado em {money.format(productBlueprint(active?.sector ?? "Tecnologia", 4).developmentCost)}.
              </p>
            </button>
            <button onClick={() => createProject("marca")}>
              <span>VISIBILIDADE</span>
              <b>Campanha nacional</b>
              <p>
                Mais clientes e reputação se a execução convencer o mercado.
              </p>
            </button>
          </div>
        </GameModal>
      )}
      {dialog === "product" && managedProduct && (
        <GameModal
          onClose={() => {
            setDialog(null);
            setSelectedProduct(null);
            setRightsOffer(null);
          }}
          wide
        >
          <div className="product-room">
            <header>
              <div>
                <small>GESTÃO DE PRODUTO</small>
                <h2>
                  {managedProduct.name} <em>v{managedProduct.version ?? 1}</em>
                </h2>
                <p>
                  Fase de{" "}
                  {(managedProduct.marketStage ?? "lancamento")
                    .replace("lancamento", "lançamento")
                    .replace("declinio", "declínio")}{" "}
                  · qualidade {Math.round(managedProduct.quality)} ·{" "}
                  complexidade {managedProduct.complexity ?? 3}/5 ·{" "}
                  {managedProduct.rightsOwned ?? 100}% dos direitos pertencem à
                  empresa.
                </p>
              </div>
              <div className="product-revenue">
                <small>{managedProduct.status === "ativo" ? "RISCO DE FALHA NO LANÇAMENTO" : "RECEITA SEMANAL ESTIMADA"}</small>
                <b>{managedProduct.status === "ativo" ? `${managedProductRisk?.failureChance ?? 0}%` : money.format(productWeeklyRevenue(managedProduct))}</b>
                <span>
                  {managedProduct.status === "ativo" ? `${managedProductRisk?.delayChance ?? 0}% de risco de atraso por ciclo` : managedProduct.licensee
                    ? `inclui royalties de ${managedProduct.licensee}`
                    : "vendas diretas"}
                </span>
              </div>
            </header>
            {managedProduct.status === "ativo" ? (
              <div className="product-development-room">
                <section className="product-risk-board">
                  <div><small>PROGRESSO</small><b>{Math.round(managedProduct.progress)}%</b></div>
                  <div><small>EQUIPE NECESSÁRIA</small><b>{managedProduct.requiredTeam ?? 3} pessoas</b></div>
                  <div><small>RISCO DE ATRASO</small><b>{managedProductRisk?.delayChance ?? 0}%</b></div>
                  <div><small>RISCO DE FALHA</small><b>{managedProductRisk?.failureChance ?? 0}%</b></div>
                </section>
                <div className="product-role-check"><small>COMPETÊNCIAS NECESSÁRIAS</small>{managedProductRisk?.coverage.requirements.map((role) => <span className={managedProductRisk.coverage.missing.includes(role) ? "missing" : "covered"} key={role}>{managedProductRisk.coverage.missing.includes(role) ? "FALTA" : "OK"} · {role.replaceAll("|", " ou ")}</span>)}</div>
                <section className="product-preparation-grid">
                  {(Object.entries(productPreparationLabels) as [ProductPreparation, typeof productPreparationLabels[ProductPreparation]][]).map(([key, item]) => {
                    const level = managedProduct.preparation?.[key] ?? 0;
                    const cost = item.cost * (level + 1);
                    return <button key={key} disabled={level >= 3 || active.cash < cost} onClick={() => investProductPreparation(key)}><small>NÍVEL {level}/3</small><b>{item.label}</b><span>{item.detail}</span><strong>{level >= 3 ? "Preparação máxima" : money.format(cost)}</strong></button>;
                  })}
                </section>
                <p className="product-risk-note">Nenhum investimento elimina totalmente o risco. Sem as competências necessárias, produtos complexos avançam mais devagar e acumulam atrasos.</p>
              </div>
            ) : rightsOffer ? (
              <div className="product-decision">
                <div className="rights-offer">
                  <small>PROPOSTA FORMAL</small>
                  <b>{money.format(rightsOffer.value)}</b>
                  <span>{rightsOffer.buyer}</span>
                </div>
                <div className="product-actions">
                  <button
                    onClick={() => {
                      setRightsOffer(null);
                      notify(
                        "Proposta recusada. Os direitos permanecem com você.",
                      );
                    }}
                  >
                    Recusar e manter direitos
                  </button>
                  <button className="modal-primary" onClick={sellProductRights}>
                    Vender todos os direitos
                  </button>
                </div>
              </div>
            ) : (
              <div className="product-management-grid">
                <section className="product-health-panel">
                  <h3>Saúde do produto</h3>
                  <div className="product-stat-grid">
                    <span>Satisfação <b>{Math.round(managedProduct.customerSatisfaction ?? 70)}%</b></span>
                    <span>Bugs <b>{Math.round(managedProduct.bugLevel ?? 0)}%</b></span>
                    <span>Atualização necessária <b>{Math.round(managedProduct.updateNeed ?? 0)}%</b></span>
                    <span>Manutenção semanal <b>{money.format((managedProduct.maintenanceCost ?? productBlueprint(active.sector, managedProduct.complexity ?? 3).maintenanceCost) * (1 + (managedProduct.bugLevel ?? 0) / 80))}</b></span>
                  </div>
                  <p>Resultado do lançamento: <b>{managedProduct.launchOutcome ?? "legado anterior"}</b>{managedProduct.lastVersionOutcome ? ` · última versão ${managedProduct.lastVersionOutcome}` : ""}.</p>
                  <button disabled={active.cash < 18000 + (managedProduct.bugLevel ?? 0) * 850 || (managedProduct.bugLevel ?? 0) < 5} onClick={emergencyProductFix}>Correção emergencial · {money.format(18000 + (managedProduct.bugLevel ?? 0) * 850)}</button>
                  <button disabled={(managedProduct.supportLevel ?? 0) >= 3 || active.cash < 15000 * ((managedProduct.supportLevel ?? 0) + 1)} onClick={investProductSupport}>Suporte pós-venda nível {(managedProduct.supportLevel ?? 0) + 1} · {money.format(15000 * ((managedProduct.supportLevel ?? 0) + 1))}</button>
                  <div className="customer-feedback-list"><small>FEEDBACK RECENTE</small>{(managedProduct.feedback ?? []).length ? (managedProduct.feedback ?? []).slice(0, 4).map((feedback) => <blockquote className={feedback.tone} key={feedback.id}><b>{"★".repeat(feedback.rating)}{"☆".repeat(5 - feedback.rating)}</b> “{feedback.text}” <small>S{feedback.week}</small></blockquote>) : <p>Ainda não há avaliações suficientes.</p>}</div>
                </section>
                <section>
                  <h3>Mercado e posicionamento</h3>
                  <label>
                    Preço individual
                    <b>
                      {money.format(
                        managedProduct.productPrice ?? active.price,
                      )}
                    </b>
                    <input
                      type="range"
                      min={Math.max(20, Math.round(active.price * 0.35))}
                      max={Math.round(active.price * 2.4)}
                      step={Math.max(1, Math.round(active.price / 25))}
                      value={managedProduct.productPrice ?? active.price}
                      onChange={(e) =>
                        updateManagedProduct({
                          productPrice: Number(e.target.value),
                        })
                      }
                    />
                  </label>
                  <label>
                    Marketing semanal
                    <b>{money.format(managedProduct.productMarketing ?? 0)}</b>
                    <input
                      type="range"
                      min="0"
                      max="35000"
                      step="1000"
                      value={managedProduct.productMarketing ?? 0}
                      onChange={(e) =>
                        updateManagedProduct({
                          productMarketing: Number(e.target.value),
                        })
                      }
                    />
                  </label>
                  <p>
                    Preço alto melhora margem, mas reduz demanda. Marketing
                    acelera vendas e custa caixa toda semana.
                  </p>
                </section>
                <section>
                  <h3>Evolução do produto</h3>
                  <div className="product-stat-grid">
                    <span>
                      Versão <b>{managedProduct.version ?? 1}</b>
                    </span>
                    <span>
                      Semanas no mercado{" "}
                      <b>{managedProduct.marketWeeks ?? 0}</b>
                    </span>
                    <span>
                      Patente{" "}
                      <b>
                        {managedProduct.patented
                          ? "registrada"
                          : "não registrada"}
                      </b>
                    </span>
                    <span>
                      Direitos próprios{" "}
                      <b>{managedProduct.rightsOwned ?? 100}%</b>
                    </span>
                  </div>
                  <p>Nova versão é uma aposta: pode melhorar, ser ignorada, criar bugs, desagradar clientes ou canibalizar a versão anterior.</p>
                  <div className="version-strategies">
                    <button disabled={active.cash < 20000} onClick={() => launchProductVersion("economica")}><b>Econômica · R$ 20 mil</b><span>{Math.round(productVersionRisk(managedProduct, "economica"))}% de risco · rápida, sujeita a bugs e rejeição.</span></button>
                    <button disabled={active.cash < 40000} onClick={() => launchProductVersion("equilibrada")}><b>Equilibrada · R$ 40 mil</b><span>{Math.round(productVersionRisk(managedProduct, "equilibrada"))}% de risco · mais testes, sem garantia de retorno.</span></button>
                    <button disabled={active.cash < 70000} onClick={() => launchProductVersion("robusta")}><b>Robusta · R$ 70 mil</b><span>{Math.round(productVersionRisk(managedProduct, "robusta"))}% de risco · ainda pode ser ignorada.</span></button>
                  </div>
                  <button
                    disabled={managedProduct.patented || active.cash < 45000}
                    onClick={patentProduct}
                  >
                    {managedProduct.patented
                      ? "Produto patenteado"
                      : "Registrar patente · R$ 45 mil"}
                  </button>
                </section>
                <section>
                  <h3>Licenças e participação</h3>
                  <p>
                    Licenciamento mantém seus direitos e gera royalties. A venda
                    parcial traz mais caixa, mas reduz permanentemente sua
                    parcela da receita.
                  </p>
                  <button
                    disabled={Boolean(managedProduct.licensee)}
                    onClick={licenseProduct}
                  >
                    {managedProduct.licensee
                      ? `Licenciado para ${managedProduct.licensee}`
                      : "Licenciar para outra empresa"}
                  </button>
                  <button
                    disabled={(managedProduct.rightsOwned ?? 100) <= 50}
                    onClick={sellPartialRights}
                  >
                    Vender 25% dos direitos
                  </button>
                </section>
                <section>
                  <h3>Propriedade intelectual</h3>
                  {(managedProduct.lawsuitWeeks ?? 0) > 0 ? (
                    <>
                      <p className="legal-alert">
                        Processo em andamento contra{" "}
                        <b>{managedProduct.legalOpponent}</b>. O jurídico custa
                        R$ 9 mil por semana.
                      </p>
                      <div className="product-actions">
                        <button
                          disabled={active.cash < 50000}
                          onClick={() => productLegalAction("acordo")}
                        >
                          Fazer acordo · R$ 50 mil
                        </button>
                        <button
                          disabled={active.cash < 25000}
                          onClick={() => productLegalAction("defesa")}
                        >
                          Levar ao tribunal · R$ 25 mil
                        </button>
                      </div>
                    </>
                  ) : (
                    <>
                      <p>
                        {managedProduct.patented
                          ? "A patente permite atacar cópias concorrentes com maior chance de vitória."
                          : "Sem patente, produtos de alta qualidade ficam mais expostos a disputas e imitações."}
                      </p>
                      <button
                        disabled={
                          !managedProduct.patented || active.cash < 30000
                        }
                        onClick={() => productLegalAction("processar")}
                      >
                        Processar concorrente por cópia · R$ 30 mil
                      </button>
                    </>
                  )}
                  <div className="competing-products">
                    <small>PRODUTOS CONCORRENTES</small>
                    {game.competitors
                      .filter(
                        (r) =>
                          r.sector === active.sector &&
                          !["fechada", "vendida"].includes(r.status),
                      )
                      .flatMap((r) =>
                        (r.products ?? []).map((product) => (
                          <span key={`${r.id}-${product.id}`}>
                            <b>{product.name}</b>
                            {r.name} · qualidade {Math.round(product.quality)} ·{" "}
                            {product.stage}
                          </span>
                        )),
                      )
                      .slice(0, 4)}
                  </div>
                </section>
                <section className="product-exit">
                  <h3>Fim do ciclo</h3>
                  <p>
                    Tirar de linha encerra as vendas diretas. Pode surgir uma
                    proposta pela propriedade intelectual.
                  </p>
                  <button
                    className="danger-action"
                    onClick={discontinueProduct}
                  >
                    Tirar produto de linha
                  </button>
                </section>
              </div>
            )}
          </div>
        </GameModal>
      )}
      {dialog === "sell" && active && metrics && (
        <GameModal onClose={() => setDialog(null)}>
          <ModalTitle
            label="M&A · VENDA DA EMPRESA"
            title={`Quanto vale encerrar este capítulo?`}
            text={`A estimativa atual da ${active.name} é ${money.format(metrics.valuation)}. O valor anunciado é bruto: impostos progressivos e assessoria serão descontados antes de chegar ao patrimônio pessoal.`}
          />
          <div className="sale-sheet">
            <div>
              <small>EQUIPE</small>
              <b>{active.employees.length}</b>
            </div>
            <div>
              <small>REPUTAÇÃO</small>
              <b>{active.reputation}</b>
            </div>
            <div>
              <small>VALOR ESTIMADO</small>
              <b>{compact.format(metrics.valuation)}</b>
            </div>
          </div>
          <button className="modal-primary" onClick={sellCompany}>
            Aceitar a melhor oferta disponível
          </button>
        </GameModal>
      )}
      {dialog === "new-company" && (
        <GameModal onClose={() => setDialog(null)}>
          <ModalTitle
            label="NOVO CAPÍTULO"
            title="Comece outra vez — mas não do zero."
            text="Seu patrimônio, reputação e experiência continuam com você. Cada nova empresa exige capital próprio."
          />
          <input
            className="company-name"
            placeholder="Nome da nova empresa (opcional)"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
          />
          <div className="sector-mini">
            {(Object.keys(sectorData) as Sector[]).map((s) => {
              const cost =
                game.companies.length === 1
                  ? 180000
                  : 260000 + game.companies.length * 50000;
              return (
                <button
                  disabled={game.personalCash < cost}
                  key={s}
                  onClick={() => foundCompany(s)}
                >
                  <b>{sectorData[s].icon}</b>
                  <span>
                    {s}
                    <small>{money.format(cost)} para abrir</small>
                  </span>
                </button>
              );
            })}
          </div>
          {game.personalCash < 180000 && (
            <p className="warning">
              Você precisa vender ou acumular patrimônio antes de abrir uma nova
              empresa.
            </p>
          )}
        </GameModal>
      )}
      {dialog === "bankruptcy" && active && (
        <GameModal onClose={() => setDialog(null)}>
          <ModalTitle
            label="ÚLTIMO RECURSO"
            title={`Decretar falência da ${active.name}?`}
            text="A operação será encerrada, funcionários serão desligados e os ativos passarão aos credores. Outras empresas do seu grupo continuam existindo."
          />
          <div className="consequence-list">
            <p>
              Patrimônio pessoal em risco:{" "}
              <b>
                {money.format(
                  Math.min(
                    game.personalCash,
                    Math.max(0, Math.round(active.debt * 0.18)),
                  ),
                )}
              </b>
            </p>
            <p>
              Reputação do fundador: <b>−9</b>
            </p>
            <p>
              Empresa e projetos: <b>encerrados definitivamente</b>
            </p>
          </div>
          <button className="danger-action" onClick={declareBankruptcy}>
            Confirmar decreto de falência
          </button>
        </GameModal>
      )}
      {dialog === "recovery" && active && (
        <GameModal onClose={() => setDialog(null)}>
          <ModalTitle
            label="SALA DE CRISE"
            title="Ainda existe uma saída."
            text="As opções abaixo ganham tempo, mas nenhuma é gratuita. Escolha qual problema você prefere enfrentar depois."
          />
          <div className="choice-cards recovery-cards">
            <button onClick={() => recoveryAction("bridge")}>
              <span>CRÉDITO-PONTE</span>
              <b>R$ 130 mil agora</b>
              <p>
                Assuma R$ 175 mil em dívida. Bom para sobreviver; perigoso em
                uma crise de crédito.
              </p>
            </button>
            <button onClick={() => recoveryAction("restructure")}>
              <span>REESTRUTURAÇÃO</span>
              <b>Cortar operação</b>
              <p>
                Demita parte da equipe e reduza marketing. O caixa melhora e a
                cultura sofre.
              </p>
            </button>
            <button onClick={() => recoveryAction("investor")}>
              <span>NOVO SÓCIO</span>
              <b>R$ 220 mil</b>
              <p>
                Receba capital e ceda influência. A equipe pode questionar quem
                realmente manda.
              </p>
            </button>
          </div>
        </GameModal>
      )}
      {dialog === "acquire" && targetRival && active && (
        <GameModal
          onClose={() => {
            setDialog(null);
            setTargetRival(null);
          }}
        >
          <ModalTitle
            label="FUSÕES E AQUISIÇÕES"
            title={`Comprar a ${targetRival.name}?`}
            text={`${targetRival.founder} aceita negociar por ${money.format(Math.round(targetRival.score * 17500 + targetRival.reputation * 4200))}. A compra elimina um rival, mas a integração pode criar conflitos e consumir caixa.`}
          />
          <div className="choice-cards acquisition-cards">
            <button onClick={() => acquireRival("subsidiary")}>
              <span>SUBSIDIÁRIA</span>
              <b>Manter separada</b>
              <p>
                A concorrente entra no seu grupo com marca e operação próprias.
                Você passa a comandá-la como outra empresa.
              </p>
            </button>
            <button onClick={() => acquireRival("merge")}>
              <span>INCORPORAÇÃO</span>
              <b>Fundir operações</b>
              <p>
                Clientes e equipe entram na empresa atual. Ganho imediato, com
                forte risco de choque cultural.
              </p>
            </button>
          </div>
        </GameModal>
      )}
      {dialog === "rival" && selectedRival && (
        <GameModal
          onClose={() => {
            setDialog(null);
            setSelectedRivalId(null);
          }}
          wide
        >
          <div className="rival-dossier">
            <header>
              <div>
                <small>DOSSIÊ DE CONCORRÊNCIA</small>
                <h2>{selectedRival.name}</h2>
                <p>
                  {selectedRival.founder} · personalidade{" "}
                  {selectedRival.personality} · estratégia{" "}
                  {selectedRival.strategy.toLowerCase()}.
                </p>
              </div>
              <div
                className={`relationship-seal ${selectedRival.relationship ?? "neutro"}`}
              >
                <b>{selectedRival.relationship ?? "neutro"}</b>
                <span>relação {Math.round(selectedRival.relation ?? 0)}</span>
              </div>
            </header>
            <div className="rival-dossier-grid">
              <section>
                <h3>A empresa</h3>
                <div className="rival-numbers">
                  <span>
                    Força de mercado <b>{selectedRival.score}</b>
                  </span>
                  <span>
                    Caixa estimado{" "}
                    <b>{money.format(selectedRival.cash ?? 0)}</b>
                  </span>
                  <span>
                    Reputação <b>{Math.round(selectedRival.reputation)}</b>
                  </span>
                  <span>
                    Situação <b>{selectedRival.status}</b>
                  </span>
                </div>
                <p className="rival-last-decision">
                  Última decisão: <b>{selectedRival.lastDecision}</b>
                </p>
              </section>
              <section>
                <h3>Produtos próprios</h3>
                <div className="rival-products">
                  {selectedRival.products?.length ? (
                    selectedRival.products.map((product) => (
                      <article key={product.id}>
                        <span>{product.stage}</span>
                        <b>{product.name}</b>
                        <small>Qualidade {Math.round(product.quality)}</small>
                      </article>
                    ))
                  ) : (
                    <p>Nenhum produto relevante permanece no mercado.</p>
                  )}
                </div>
              </section>
              <section>
                <h3>História recente</h3>
                <ol className="rival-history">
                  {(selectedRival.history ?? []).map((event, index) => (
                    <li key={`${event}-${index}`}>{event}</li>
                  ))}
                </ol>
              </section>
              <section>
                <h3>Diplomacia empresarial</h3>
                <p>
                  A relação altera o comportamento semanal. Parceiros
                  compartilham oportunidades; rivais podem atacar sua base de
                  clientes.
                </p>
                {!["vendida", "fechada"].includes(selectedRival.status) && (
                  <div className="diplomacy-actions">
                    <button
                      disabled={
                        active.cash < 12000 ||
                        selectedRival.relationship === "parceiro"
                      }
                      onClick={() => rivalRelationshipAction("aproximar")}
                    >
                      Aproximar líderes <span>R$ 12 mil</span>
                    </button>
                    <button
                      disabled={
                        active.cash < 22000 ||
                        selectedRival.relationship === "parceiro"
                      }
                      onClick={() => rivalRelationshipAction("parceria")}
                    >
                      Propor parceria <span>R$ 22 mil</span>
                    </button>
                    {selectedRival.relationship === "rival" ? (
                      <button
                        disabled={active.cash < 18000}
                        onClick={() => rivalRelationshipAction("paz")}
                      >
                        Negociar trégua <span>R$ 18 mil</span>
                      </button>
                    ) : (
                      <button
                        className="risk"
                        onClick={() => rivalRelationshipAction("rivalidade")}
                      >
                        Declarar rivalidade <span>Sem custo imediato</span>
                      </button>
                    )}
                  </div>
                )}{" "}
                {selectedRival.acquiredBy && (
                  <p className="acquired-note">
                    Empresa adquirida por <b>{selectedRival.acquiredBy}</b>
                    {selectedRival.mergedInto
                      ? ` e incorporada à ${selectedRival.mergedInto}`
                      : ""}
                    .
                  </p>
                )}
              </section>
            </div>
          </div>
        </GameModal>
      )}
      {dialog === "capital" && active && (
        <GameModal onClose={() => setDialog(null)} wide>
          <div className="capital-room">
            <header>
              <small>RODADA DE CAPITAL</small>
              <h2>Escolha quem vai sentar à mesa.</h2>
              <p>
                Dinheiro muda a empresa — e também quem manda nela. Cada
                instituição tem uma personalidade, exigências e tolerância
                diferente.
              </p>
            </header>
            <div className="provider-grid">
              {game.providers.map((provider) => (
                <article
                  key={provider.id}
                  style={
                    { "--provider": provider.color } as React.CSSProperties
                  }
                >
                  <div className="provider-head">
                    <Avatar
                      initials={provider.representative
                        .split(" ")
                        .map((x) => x[0])
                        .join("")
                        .slice(0, 2)}
                      color={provider.color}
                    />
                    <div>
                      <small>{provider.kind.toUpperCase()}</small>
                      <h3>{provider.name}</h3>
                      <span>{provider.representative}</span>
                    </div>
                  </div>
                  <p>{provider.profile}</p>
                  <div className="provider-stats">
                    <span>
                      Paciência <b>{provider.patience}</b>
                    </span>
                    <span>
                      Controle <b>{provider.control}</b>
                    </span>
                  </div>
                  <div className="provider-actions">
                    <button
                      onClick={() => acceptCapital(provider, "conservador")}
                    >
                      {provider.kind === "banco"
                        ? "Crédito moderado"
                        : "Rodada equilibrada"}
                    </button>
                    <button
                      onClick={() => acceptCapital(provider, "agressivo")}
                    >
                      {provider.kind === "banco"
                        ? "Crédito máximo"
                        : "Crescimento agressivo"}
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </GameModal>
      )}
      {dialog === "board" && active && (
        <GameModal onClose={() => setDialog(null)} wide>
          <div className="board-room">
            <header>
              <small>CONSELHO DE ADMINISTRAÇÃO</small>
              <h2>Capital, influência e votos.</h2>
              <p>
                Você possui {Math.round(active.founderEquity ?? 100)}% da
                empresa, o apoio geral está em{" "}
                {Math.round(active.boardSupport ?? 50)}% e o CEO atual é{" "}
                <b>{active.ceo}</b>.
              </p>
            </header>
            <div className="board-table">
              <article className="founder-seat">
                <Avatar
                  initials={currentLeader
                    .split(" ")
                    .map((x) => x[0])
                    .join("")
                    .slice(0, 2)
                    .toUpperCase()}
                  color="#d99b49"
                />
                <div>
                  <small>{game.dynastyMode ? `LIDERANÇA · GERAÇÃO ${game.generation ?? 2}` : "FUNDADOR"}</small>
                  <h3>{currentLeader}</h3>
                  <p>
                    {Math.round(active.founderEquity ?? 100)}% das ações ·{" "}
                    {active.ceo === currentLeader
                      ? "CEO atual"
                      : "Fora da gestão"}
                  </p>
                </div>
                <b>{Math.round(active.boardSupport ?? 50)} apoio</b>
              </article>
              {(active.investors ?? []).map((i) => (
                <article key={i.providerId}>
                  <Avatar
                    initials={i.representative
                      .split(" ")
                      .map((x) => x[0])
                      .join("")
                      .slice(0, 2)}
                    color={
                      game.providers.find((p) => p.id === i.providerId)
                        ?.color ?? "#778ad9"
                    }
                  />
                  <div>
                    <small>{i.name}</small>
                    <h3>{i.representative}</h3>
                    <p>
                      {i.equity}% das ações · {i.boardSeats} assento · meta de{" "}
                      {i.target === "valor" ? "valuation" : i.target}
                    </p>
                  </div>
                  <b className={i.support < 35 ? "bad" : "good"}>
                    {Math.round(i.support)} apoio
                  </b>
                </article>
              ))}
            </div>
            <div className="board-actions">
              <button
                onClick={() => boardAction("dividend")}
                disabled={active.cash < 50000}
              >
                <b>Pagar dividendos</b>
                <span>Consome caixa e melhora apoio.</span>
              </button>
              <button
                onClick={() => boardAction("campaign")}
                disabled={active.cash < 35000}
              >
                <b>Reconstruir alianças</b>
                <span>Reuniões e concessões políticas.</span>
              </button>
              <button
                onClick={() => boardAction("buyback")}
                disabled={
                  active.cash < 120000 || (active.founderEquity ?? 100) >= 94
                }
              >
                <b>Recomprar ações</b>
                <span>Aumenta seu poder e irrita investidores.</span>
              </button>
              {active.ceo !== currentLeader && (
                <button
                  onClick={() => boardAction("return")}
                  disabled={
                    (active.boardSupport ?? 0) < 34 || active.cash < 80000
                  }
                >
                  <b>Votação para voltar</b>
                  <span>Exige apoio mínimo e um plano financiado.</span>
                </button>
              )}
            </div>
          </div>
        </GameModal>
      )}
      {dialog === "news-detail" && selectedNews && selectedNewsRepercussion && (
        <GameModal onClose={() => { setDialog(null); setSelectedNews(null); }} wide>
          <div className="news-detail">
            <header className="news-detail-masthead">
              <div><b>GAZETA</b><span>DOS NEGÓCIOS</span></div>
              <small>{selectedNews.category.toUpperCase()} · SEMANA {selectedNews.week} · {selectedNews.source ?? "REDAÇÃO GAZETA"}</small>
            </header>
            <div className="news-detail-lead">
              <div>
                <small>REPERCUSSÃO {selectedNewsRepercussion.intensity.toUpperCase()}</small>
                <h2>{selectedNews.headline}</h2>
                <div className="news-detail-context">
                  <b>{selectedNews.scope ?? "mercado"}{selectedNews.region ? ` · ${selectedNews.region}` : ""}</b>
                  {!!selectedNews.sectors?.length && <span>Setores: {selectedNews.sectors.join(", ")}</span>}
                </div>
                <p>{selectedNews.body}</p>
                {!!selectedNews.tags?.length && <div className="news-tags">{selectedNews.tags.map((tag) => <span key={tag}>#{tag}</span>)}</div>}
              </div>
              <aside className={selectedNews.impact}>
                <small>TERMÔMETRO DO MERCADO</small>
                <b>{selectedNewsRepercussion.score > 0 ? "+" : ""}{selectedNewsRepercussion.score}</b>
                <span>{selectedNews.impact === "positivo" ? "confiança" : selectedNews.impact === "negativo" ? "pressão" : "cautela"}</span>
              </aside>
            </div>
            {selectedNewsCause && <section className="news-causal-origin">
              <small>ESTA NOTÍCIA NASCEU DE UMA DECISÃO</small>
              <div><b>S{selectedNewsCause.week}</b><span><strong>{selectedNewsCause.decision}</strong><p>{selectedNewsCause.actor} decidiu em “{selectedNewsCause.title}”. {selectedNewsCause.result}</p></span><em>{Math.max(0, selectedNewsCause.expiresWeek - selectedNews.week)} sem. de efeito restante</em></div>
              {!!selectedNewsCause.affectedCharacters.length && <footer>Quem guardou memória: <b>{selectedNewsCause.affectedCharacters.join(", ")}</b></footer>}
            </section>}
            <section className="market-read">
              <small>COMO O MERCADO REAGIU</small>
              <h3>{selectedNewsRepercussion.marketReaction}</h3>
              <p>O índice de confiança econômica está em <b>{game.economy.confidence}/100</b>. Notícias positivas e negativas alteram esse indicador e influenciam o faturamento das empresas nas semanas seguintes.</p>
            </section>
            <section className="reaction-wall">
              <header><small>VOZES DO MERCADO</small><h3>O que estão dizendo</h3></header>
              <div>
                {selectedNewsRepercussion.comments.map((comment) => (
                  <article className={comment.tone} key={`${comment.name}-${comment.role}`}>
                    <div className="reaction-avatar">{comment.initials}</div>
                    <div><b>{comment.name}</b><small>{comment.role}</small><p>“{comment.text}”</p></div>
                  </article>
                ))}
              </div>
            </section>
            <footer className="news-outlook">
              <small>O QUE OBSERVAR AGORA</small>
              <p>{selectedNewsRepercussion.outlook}</p>
            </footer>
          </div>
        </GameModal>
      )}
      {dialog === "dynasty" && game.dynastyMode && (
        <GameModal onClose={() => setDialog(null)} wide>
          <div className="dynasty-room">
            <header className="dynasty-title">
              <div><small>MODO DINASTIA · GERAÇÃO {game.generation ?? 2}</small><h2>{currentLeader} conduz o legado de {game.founder}</h2><p>Você controla a geração atual. Resultados, família, conselho e herança decidirão se o grupo atravessa o tempo ou perde o controle.</p></div>
              <span>{dynastyTenure} semanas nesta geração</span>
            </header>
            <div className="dynasty-scoreboard">
              <div><small>LEGITIMIDADE</small><b>{Math.round(game.dynastyLegitimacy ?? 0)}%</b><span>apoio conquistado</span></div>
              <div><small>UNIÃO FAMILIAR</small><b>{Math.round(game.familyUnity ?? 0)}%</b><span>risco de conflito</span></div>
              <div><small>CONTROLE FAMILIAR</small><b>{familyControl}%</b><span>{game.outsideFamilyEquity ?? 0}% fora da família</span></div>
              <div><small>FUNDADOR</small><b>{game.founderDeceased ? "Legado" : `${Math.round(game.founderHealth ?? 0)}%`}</b><span>{game.founderDeceased ? "testamento executado" : "saúde e influência"}</span></div>
            </div>
            <nav className="room-tabs" aria-label="Áreas do modo dinastia">
              {([[
                "visao", "Visão geral"
              ], ["conflito", "Conflito"], ["familia", "Família"], ["poder", "Poder"], ["sucessao", "Sucessão"], ["cronica", "Crônica"]] as const).map(([id, label]) => (
                <button className={dynastyTab === id ? "active" : ""} onClick={() => setDynastyTab(id)} key={id}>{label}</button>
              ))}
            </nav>
            {dynastyTab === "visao" && <section className="generation-project room-tab-panel">
              <header><small>PROJETO DA GERAÇÃO</small><h3>Como esta geração quer ser lembrada?</h3></header>
              <div className="generation-goals">
                {([
                  ["expandir", "Expandir o império", "Clientes e novas empresas avançam mais rápido."],
                  ["preservar", "Preservar o patrimônio", "Eficiência, caixa e controle familiar são prioridade."],
                  ["inovar", "Reinventar a holding", "Projetos ativos recebem progresso adicional."],
                  ["unir", "Unir pessoas e família", "Moral, lealdade e consenso sustentam o grupo."],
                ] as [DynastyGoal, string, string][]).map(([id, title, description]) => (
                  <button className={game.dynastyGoal === id ? "active" : ""} onClick={() => setGame((s) => ({ ...s, dynastyGoal: id }))} key={id}><b>{title}</b><span>{description}</span></button>
                ))}
              </div>
              <div className="dynasty-progress"><span><i style={{ width: `${dynastyGoalProgress}%` }} /></span><b>{dynastyGoalProgress}% do projeto</b></div>
              <div className="generation-missions"><header><small>TRÊS MISSÕES DESTA GERAÇÃO</small><h3>Resultados que deixam uma marca permanente</h3><p>As recompensas são entregues automaticamente quando a meta é alcançada.</p></header><div>{(game.generationMissions ?? []).length ? game.generationMissions!.map((mission) => <article className={mission.completed ? "completed" : ""} key={mission.id}><small>{mission.kind.toUpperCase()}</small><h4>{mission.title}</h4><p>{mission.description}</p><span><i style={{ width: `${clamp(mission.progress / Math.max(1, mission.target) * 100)}%` }} /></span><footer><b>{Math.round(mission.progress)} / {mission.target}</b><em>{mission.completed ? `${mission.rewardTitle} conquistado` : `${money.format(mission.rewardCash)} · +${mission.rewardLegacy} legado`}</em></footer></article>) : <div className="missions-pending">Avance uma semana para o conselho definir as três metas desta geração.</div>}</div></div>
              {game.generationProfile && <div className="generation-identity"><small>IDENTIDADE DESTE MANDATO</small><h3>{game.generationProfile.title}</h3><p><b>{game.generationProfile.leader}</b>, {game.generationProfile.age} anos e saúde em {Math.round(game.generationProfile.health)}%, governa pela ideia de “{game.generationProfile.doctrine.toLowerCase()}”. Promessa: {game.generationProfile.promise}. Tolerância ao risco: {game.generationProfile.riskTolerance}%.</p></div>}
              {game.politicalArc && <div className={`political-arc ${game.politicalArc.stage}`}><small>CRISE POLÍTICA · {game.politicalArc.stage.toUpperCase()}</small><h3>{game.politicalArc.challenger} articula contra {game.politicalArc.incumbent}</h3><p>Apoio estimado: <b>{Math.round(game.politicalArc.support)}%</b> · votação em {game.politicalArc.weeksLeft} semanas. O resultado pode trocar o presidente sem encerrar a partida.</p><span><i style={{ width: `${game.politicalArc.support}%` }} /></span></div>}
              {!!game.mandateReviews?.length && <div className="mandate-review-list"><small>AVALIAÇÕES DO CONSELHO</small>{game.mandateReviews.slice(0, 3).map((review) => <article key={`${review.week}-${review.leader}`}><b>{review.score}%</b><div><h4>{review.verdict}</h4><p>Semana {review.week} · {review.profitCompanies} empresas lucrativas · legitimidade {review.legitimacy}% · família {review.familyUnity}%</p></div></article>)}</div>}
              {game.dynastyEndingReady && !game.dynastyConcluded && <div className="dynasty-ending-call"><div><small>FINAL OPCIONAL DISPONÍVEL</small><h3>Você decide quando esta crônica termina</h3><p>A partir da 4ª geração, você pode escrever o final ou continuar jogando por quantas gerações quiser. O epílogo projetará o futuro conforme família, patrimônio, empresas, controle e união.</p></div><button onClick={concludeDynasty}>Escrever o final da Dinastia</button></div>}
              {game.dynastyConcluded && game.dynastyEnding && <button className="reopen-dynasty-ending" onClick={() => setDialog("dynasty-ending")}>Reabrir final: {game.dynastyEnding.title}</button>}
            </section>}
            {dynastyTab === "conflito" && <section className="generation-arc-room room-tab-panel">
              {game.generationArc ? <>
                <header><div><small>ARCO CENTRAL · GERAÇÃO {game.generationArc.generation}</small><h3>{game.generationArc.title}</h3><p>{game.generationArc.summary}</p></div><span className={game.generationArc.status}>{game.generationArc.status === "ativo" ? `Capítulo ${game.generationArc.chapter} de 4` : "Concluído"}</span></header>
                <div className="arc-antagonist"><small>FORÇA QUE SE OPÕE A VOCÊ</small><b>{game.generationArc.antagonist}</b><p>{game.generationArc.status === "ativo" ? "A próxima conversa aparece conforme o tempo avança. Suas escolhas financeiras, políticas e familiares formarão o desfecho." : game.generationArc.outcome}</p></div>
                <div className="arc-score"><div><small>PODER</small><b>{Math.round(game.generationArc.power)}%</b><span><i style={{ width: `${game.generationArc.power}%` }} /></span></div><div><small>CONFIANÇA</small><b>{Math.round(game.generationArc.trust)}%</b><span><i style={{ width: `${game.generationArc.trust}%` }} /></span></div><div><small>RISCO ACUMULADO</small><b>{Math.round(game.generationArc.risk)}%</b><span className="risk"><i style={{ width: `${game.generationArc.risk}%` }} /></span></div></div>
                <div className="arc-chapters">{[1, 2, 3, 4].map((chapter) => <div className={chapter < game.generationArc!.chapter || game.generationArc!.status === "resolvido" ? "done" : chapter === game.generationArc!.chapter ? "current" : "locked"} key={chapter}><b>{chapter}</b><span>{chapter === 1 ? "O sinal" : chapter === 2 ? "A escalada" : chapter === 3 ? "A ruptura" : "O desfecho"}</span></div>)}</div>
                {!!game.generationArc.decisions.length && <div className="arc-decisions"><small>SUAS DECISÕES NESTA HISTÓRIA</small>{game.generationArc.decisions.map((decision, index) => <p key={`${decision}-${index}`}><b>{index + 1}</b>{decision}</p>)}</div>}
              </> : <div className="arc-empty"><small>PRÓXIMA HISTÓRIA</small><h3>O conflito desta geração ainda está se formando</h3><p>Avance uma semana para que personagens, empresas e decisões atuais definam o arco central.</p></div>}
              {!!game.generationArcHistory?.length && <div className="arc-history"><small>CONFLITOS QUE MARCARAM A DINASTIA</small>{game.generationArcHistory.slice(0, 5).map((arc) => <article className={arc.tone} key={arc.id}><b>G{arc.generation}</b><div><h4>{arc.title}</h4><p>{arc.outcome}</p></div></article>)}</div>}
            </section>}
            {dynastyTab === "familia" && <div className="dynasty-columns room-tab-panel">
              <section className="family-tree-section">
                <header><small>FAMÍLIA E PODER</small><h3>Mapa da dinastia</h3></header>
                <div className="family-tree-list">
                  {heirs.map((heir) => (
                    <article className={`${heir.name === currentLeader ? "leader" : ""} ${heir.status ?? "familia"}`} key={heir.id}>
                      <div className="family-person"><span>{heir.name.split(" ").map((part) => part[0]).join("").slice(0, 2)}</span><div><small>GERAÇÃO {heir.generation ?? 2} · {heir.relationship}</small><h4>{heir.name}</h4><p>{heir.name === currentLeader ? "Liderança controlada pelo jogador" : heir.role}</p></div></div>
                      <div className="family-power"><span>Ações <b>{Math.round(heir.equity ?? 0)}%</b></span><span>Apoio <b>{Math.round(heir.support ?? 0)}%</b></span><span>Ressentimento <b>{Math.round(heir.resentment ?? 0)}%</b></span></div>
                      <div className={`family-memory ${characterOpinion(heir.memories, game.week).tone}`}><small>MEMÓRIA</small><b>{characterOpinion(heir.memories, game.week).label}</b>{heir.memories?.[0] && <span>“{heir.memories[0].text}”</span>}</div>
                    </article>
                  ))}
                  <article className="founder-estate"><small>PARTICIPAÇÃO DO FUNDADOR</small><b>{Math.round(game.founderHoldingEquity ?? 0)}%</b><span>{game.founderDeceased ? "distribuída pelo testamento" : game.founder}</span></article>
                  {(game.familyFoundationEquity ?? 0) > 0 && <article className="founder-estate"><small>FUNDAÇÃO FAMILIAR</small><b>{Math.round(game.familyFoundationEquity ?? 0)}%</b><span>ações protegidas pelo testamento</span></article>}
                </div>
              </section>
              <section className="founder-legacy-section">
                <header><small>FUNDADOR E TESTAMENTO</small><h3>{game.founderDeceased ? "A última decisão foi executada" : `${game.founder} ainda influencia o grupo`}</h3></header>
                <p>{game.founderDeceased ? "As ações remanescentes já foram divididas. As consequências políticas continuarão entre os herdeiros." : `Saúde em ${Math.round(game.founderHealth ?? 0)}%. O fundador pode aconselhar, criticar ou interferir até que o testamento seja aberto.`}</p>
                <div className="will-options">
                  {([
                    ["igualitario", "Divisão igual", "Reduz conflitos, mas fragmenta o controle."],
                    ["controle", "Controle ao sucessor", "70% das ações do fundador vão para a liderança."],
                    ["fundacao", "Fundação familiar", "Protege parte das ações de disputas individuais."],
                  ] as [WillPolicy, string, string][]).map(([id, title, description]) => (
                    <button disabled={game.founderDeceased} className={game.willPolicy === id ? "active" : ""} onClick={() => setGame((s) => ({ ...s, willPolicy: id }))} key={id}><b>{title}</b><span>{description}</span></button>
                  ))}
                </div>
                <div className="founder-note"><small>ÚLTIMA POSIÇÃO DO FUNDADOR</small><p>{game.founderDeceased ? "O futuro agora pertence inteiramente às novas gerações." : (game.familyUnity ?? 70) < 45 ? "Vocês estão transformando meu legado em uma disputa de sobrenome." : "Uma empresa sobrevive quando a família aprende a separar afeto, competência e poder."}</p></div>
              </section>
            </div>}
            {dynastyTab === "poder" && <section className="family-council-section room-tab-panel">
              <header><small>CONSELHO DE FAMÍLIA</small><h3>Decisões para proteger ou concentrar poder</h3></header>
              <div className="family-council-actions">
                <button disabled={game.personalCash < 100000} onClick={() => familyCouncilAction("dividendos")}><b>Pagar dividendos familiares</b><span>R$ 100 mil · reduz ressentimento.</span></button>
                <button disabled={game.personalCash < 50000} onClick={() => familyCouncilAction("reconciliar")}><b>Mediação familiar</b><span>R$ 50 mil · aumenta união e apoio.</span></button>
                <button disabled={game.personalCash < 200000 || (game.outsideFamilyEquity ?? 0) < 5} onClick={() => familyCouncilAction("recomprar")}><b>Recomprar 5% externo</b><span>R$ 200 mil · recupera controle.</span></button>
                <button disabled={game.personalCash < 80000} onClick={() => familyCouncilAction("governanca")}><b>Protocolo de governança</b><span>R$ 80 mil · fortalece legitimidade.</span></button>
              </div>
              <div className="former-presidents-board">
                <header><small>EX-PRESIDENTES AINDA EM JOGO</small><h3>Quem passou o bastão não perdeu a voz</h3><p>Influência alta ajuda quando existe aliança e ameaça sua legitimidade quando existe oposição.</p></header>
                <div className="former-presidents-grid">
                  {(game.formerPresidents ?? []).map((president) => (
                    <article className={president.status} key={`${president.name}-${president.generation}`}>
                      <div><span>{president.name.split(" ").map((part) => part[0]).join("").slice(0, 2)}</span><section><small>GERAÇÃO {president.generation} · {president.status}</small><h4>{president.name}</h4><p>{president.legacy}</p></section></div>
                      <dl><div><dt>Influência</dt><dd>{Math.round(president.influence)}%</dd></div><div><dt>Relação</dt><dd>{Math.round(president.relationship)}%</dd></div><div><dt>Ambição</dt><dd>{Math.round(president.ambition)}%</dd></div><div><dt>Idade</dt><dd>{president.age}</dd></div><div><dt>Saúde</dt><dd>{Math.round(president.health)}%</dd></div><div><dt>Condição</dt><dd>{president.alive ? "Ativo" : "Legado"}</dd></div></dl>
                      {president.memoirPublished && <p className="former-book">Livro: “{president.memoir}”</p>}{president.secretRevealed && <p className="former-secret">Segredo revelado: {president.secret}</p>}
                      <p className="former-last-move">{president.lastMove}</p>
                      <footer><button disabled={!president.alive || game.personalCash < 30000} onClick={() => formerPresidentAction(president.name, "aproximar")}>Reconciliar</button><button disabled={!president.alive || game.personalCash < 80000} onClick={() => formerPresidentAction(president.name, "conselho")}>Dar poder</button><button disabled={!president.alive || game.personalCash < 60000} onClick={() => formerPresidentAction(president.name, "limitar")}>Limitar influência</button></footer>
                    </article>
                  ))}
                </div>
              </div>
            </section>}
            {dynastyTab === "sucessao" && <section className="next-generation-section room-tab-panel">
              <header><small>PRÓXIMA GERAÇÃO</small><h3>A dinastia precisa sobreviver ao líder atual</h3></header>
              {!nextGenerationCandidates.length ? (
                <div className="next-generation-empty"><p>{dynastyTenure < 40 ? `A próxima geração poderá entrar no plano após 40 semanas. Faltam ${40 - dynastyTenure}.` : "É hora de apresentar os próximos descendentes ao conselho."}</p><button disabled={dynastyTenure < 40} onClick={introduceNextGeneration}>Apresentar próxima geração</button></div>
              ) : (
                <>
                  <div className="successor-candidates">
                    {nextGenerationCandidates.map((heir) => (
                      <article className={game.chosenSuccessorId === heir.id ? "selected" : ""} key={heir.id}><small>{heir.relationship}</small><h4>{heir.name}</h4><p>Competência {Math.round(heir.competence)} · prontidão {Math.round(heir.readiness)}%</p><div><i style={{ width: `${heir.readiness}%` }} /></div><footer><button disabled={game.personalCash < 90000} onClick={() => heirDevelopmentAction(heir.id, "educacao")}>Formação</button><button disabled={game.personalCash < 30000} onClick={() => heirDevelopmentAction(heir.id, "mentoria")}>Mentoria</button><button onClick={() => heirDevelopmentAction(heir.id, "sucessor")}>Escolher</button></footer></article>
                    ))}
                  </div>
                  <div className="generation-handoff"><p>{!selectedNextLeader ? "Escolha quem será preparado para assumir." : selectedNextLeader.readiness < 60 ? `${selectedNextLeader.name} precisa chegar a 60% de prontidão.` : dynastyTenure < 80 ? `A geração atual precisa completar 80 semanas. Faltam ${80 - dynastyTenure}.` : "A transição está pronta e será definitiva."}</p><button disabled={!selectedNextLeader || selectedNextLeader.readiness < 60 || dynastyTenure < 80} onClick={advanceDynastyGeneration}>Transferir para geração {(game.generation ?? 2) + 1}</button></div>
                </>
              )}
            </section>}
            {dynastyTab === "cronica" && <section className="dynasty-history room-tab-panel"><small>CRÔNICA DA FAMÍLIA</small>{(game.dynastyHistory ?? []).slice(0, 8).map((item, index) => <p key={`${item}-${index}`}>{item}</p>)}<div className="achievement-room"><header><small>CONQUISTAS E FINAIS SECRETOS</small><h3>{game.achievements?.length ?? 0} de {achievementDefinitions.length} descobertos</h3></header><div>{achievementDefinitions.map((definition) => { const unlocked = game.achievements?.find((achievement) => achievement.id === definition.id); return <article className={unlocked ? "unlocked" : "locked"} key={definition.id}><b>{unlocked ? "◆" : "?"}</b><div><small>{unlocked ? `DESCOBERTO NA GERAÇÃO ${unlocked.generation}` : definition.secret ? "FINAL SECRETO" : "AINDA BLOQUEADO"}</small><h4>{unlocked || !definition.secret ? definition.title : "Conquista desconhecida"}</h4><p>{unlocked || !definition.secret ? definition.description : "Suas decisões podem revelar este desfecho."}</p></div></article>; })}</div></div></section>}
          </div>
        </GameModal>
      )}
      {dialog === "dynasty-transition" && game.lastDynastyTransition && (
        <GameModal onClose={() => setDialog("dynasty")} wide>
          <div className="dynasty-transition-room">
            <header><small>CERIMÔNIA DE SUCESSÃO · SEMANA {game.lastDynastyTransition.week}</small><h2>O bastão passou. A influência ficou.</h2><p>{game.lastDynastyTransition.verdict}</p></header>
            <div className="transition-portraits"><article><span>{game.lastDynastyTransition.outgoing.split(" ").map((part) => part[0]).join("").slice(0, 2)}</span><small>DEIXA A PRESIDÊNCIA</small><b>{game.lastDynastyTransition.outgoing}</b></article><i>→</i><article className="incoming"><span>{game.lastDynastyTransition.incoming.split(" ").map((part) => part[0]).join("").slice(0, 2)}</span><small>ASSUME A GERAÇÃO {game.lastDynastyTransition.generation}</small><b>{game.lastDynastyTransition.incoming}</b></article></div>
            <div className="transition-score"><div><small>MANDATO</small><b>{game.lastDynastyTransition.tenure} semanas</b></div><div><small>VALOR ENTREGUE</small><b>{compact.format(game.lastDynastyTransition.empireValue)}</b></div><div><small>EMPRESAS</small><b>{game.lastDynastyTransition.activeCompanies}</b></div><div><small>PESSOAS</small><b>{game.lastDynastyTransition.employees}</b></div><div><small>REPUTAÇÃO</small><b>{game.lastDynastyTransition.reputation}%</b></div></div>
            <section><h3>O que muda agora?</h3><p>Você passa a controlar {game.lastDynastyTransition.incoming}. {game.lastDynastyTransition.outgoing} ocupa o conselho e poderá apoiar, pressionar, sabotar decisões ou tentar reconstruir poder conforme influência, ambição e relação familiar.</p></section>
            <footer><button onClick={() => { setDynastyTab("poder"); setDialog("dynasty"); }}>Conhecer o novo conselho</button><button onClick={() => setDialog(null)}>Começar o novo mandato</button></footer>
          </div>
        </GameModal>
      )}
      {dialog === "dynasty-ending" && game.dynastyEnding && (
        <GameModal onClose={() => setDialog(null)} wide>
          <div className={`dynasty-ending-room ${game.dynastyEnding.type}`}>
            <header><small>FIM DA CRÔNICA JOGÁVEL · GERAÇÃO {game.dynastyEnding.generation}</small><h2>{game.dynastyEnding.title}</h2><p>{game.dynastyEnding.narrative}</p></header>
            <div className="dynasty-ending-numbers"><div><small>VALOR FINAL</small><b>{compact.format(game.dynastyEnding.value)}</b></div><div><small>EMPRESAS</small><b>{game.dynastyEnding.companies}</b></div><div><small>PESSOAS</small><b>{game.dynastyEnding.people}</b></div><div><small>GERAÇÕES JOGADAS</small><b>{game.dynastyEnding.generation}</b></div></div>
            <section className="dynasty-future"><small>O FUTURO DEPOIS DE VOCÊ</small><h3>O legado de {game.founder} chegou até a geração {game.dynastyEnding.founderLegacyEndsGeneration}</h3><p>{game.dynastyEnding.futureNarrative}</p><div><span><small>ANOS SIMULADOS</small><b>{game.dynastyEnding.futureYears}</b></span><span><small>VALOR NO FUTURO</small><b>{compact.format(game.dynastyEnding.futureValue)}</b></span><span><small>EMPRESAS</small><b>{game.dynastyEnding.futureCompanies}</b></span><span><small>PESSOAS IMPACTADAS</small><b>{game.dynastyEnding.futurePeople}</b></span></div></section>
            {game.dynastyEnding.secretEndingTitle && <section className="secret-dynasty-ending"><small>FINAL SECRETO DESCOBERTO</small><h3>{game.dynastyEnding.secretEndingTitle}</h3><p>{game.dynastyEnding.secretEndingNarrative}</p></section>}
            <section><h3>Presidentes que escreveram essa história</h3>{[...(game.formerPresidents ?? []), { name: currentLeader, generation: game.generation ?? 1, legacy: "Conduziu o capítulo final.", status: "aliado" }].map((president) => <article key={`${president.name}-${president.generation}`}><b>G{president.generation}</b><div><h4>{president.name}</h4><p>{president.legacy}</p></div></article>)}</section>
            <footer><p>Este save fica registrado como concluído. Você pode consultar a holding e a crônica, mas o tempo não avançará.</p><button onClick={() => { setDialog(null); navigateToView("jornada"); }}>Ver o legado completo</button></footer>
          </div>
        </GameModal>
      )}
      {dialog === "legacy" && (
        <GameModal onClose={() => setDialog(null)} wide>
          <div className="legacy-room">
            <ModalTitle
              label="VIDA, LEGADO E SUCESSÃO"
              title={game.founderRetired ? "A nova geração começou" : `O que ${game.founder} deixará para trás?`}
              text={game.founderRetired
                ? `${game.founder} se aposentou aos ${founderAge} anos. A campanha continua como uma dinastia empresarial sob a liderança de ${chosenSuccessor?.name ?? "seu sucessor"}.`
                : `Você tem ${founderAge} anos. Patrimônio e empresas importam, mas a forma como prepara a próxima geração decidirá se o grupo sobreviverá a você.`}
            />
            <div className="life-scoreboard">
              <div><small>PATRIMÔNIO TOTAL</small><b>{compact.format(empireValue)}</b></div>
              <div><small>IDADE</small><b>{founderAge}</b></div>
              <div><small>LEGADO</small><b>{game.legacy}</b></div>
              <div><small>PRONTIDÃO PARA SAIR</small><b>{retirementReadiness}%</b></div>
            </div>
            <section className="life-goals">
              <header><small>OBJETIVO DE VIDA</small><h3>Escolha por que você está construindo tudo isso</h3></header>
              <div>
                {lifeGoals.map((goal) => (
                  <button
                    className={game.lifeGoal === goal.id ? "active" : ""}
                    disabled={game.founderRetired || game.lifeGoalCompleted}
                    key={goal.id}
                    onClick={() => setGame((s) => ({ ...s, lifeGoal: goal.id }))}
                  >
                    <b>{goal.title}</b>
                    <span>{goal.description}</span>
                    <small>{goal.target}</small>
                  </button>
                ))}
              </div>
              <div className="life-progress"><span><i style={{ width: `${lifeGoalProgress}%` }} /></span><b>{game.lifeGoalCompleted ? "Objetivo realizado · +20 legado" : `${lifeGoalProgress}% realizado`}</b></div>
            </section>
            <section className="heir-section">
              <header><small>PRÓXIMA GERAÇÃO</small><h3>Herdeiros e possíveis sucessores</h3></header>
              <div className="heir-grid">
                {heirs.map((heir) => (
                  <article className={game.chosenSuccessorId === heir.id ? "chosen" : ""} key={heir.id}>
                    <header>
                      <div><small>{heir.relationship} · {heir.startAge + Math.floor((game.week - 1) / 52)} anos</small><h4>{heir.name}</h4></div>
                      <span>{heir.role}</span>
                    </header>
                    <p>Perfil de {heir.style}. Ambição {Math.round(heir.ambition)} e vínculo familiar {Math.round(heir.bond)}.</p>
                    <div className="heir-stats">
                      <span>Competência <b>{Math.round(heir.competence)}</b></span>
                      <span>Prontidão <b>{Math.round(heir.readiness)}%</b></span>
                    </div>
                    <div className="heir-readiness"><i style={{ width: `${heir.readiness}%` }} /></div>
                    {!game.founderRetired && <div className="heir-actions">
                      <button disabled={game.personalCash < 90000} onClick={() => heirDevelopmentAction(heir.id, "educacao")}>Formação executiva · R$ 90 mil</button>
                      <button disabled={game.personalCash < 30000} onClick={() => heirDevelopmentAction(heir.id, "mentoria")}>Mentoria pessoal · R$ 30 mil</button>
                      <button disabled={heir.competence < 48 || game.personalCash < 50000} onClick={() => heirDevelopmentAction(heir.id, "conselho")}>Levar ao conselho · R$ 50 mil</button>
                      <button className="successor-action" onClick={() => heirDevelopmentAction(heir.id, "sucessor")}>{game.chosenSuccessorId === heir.id ? "Sucessor escolhido" : "Indicar como sucessor"}</button>
                    </div>}
                    <div className={`character-opinion ${characterOpinion(heir.memories, game.week).tone}`}><small>COMO LEMBRA DE VOCÊ</small><b>{characterOpinion(heir.memories, game.week).label}</b><span>Memória emocional {characterMemoryScore(heir.memories, game.week) > 0 ? "+" : ""}{Math.round(characterMemoryScore(heir.memories, game.week))}</span></div>
                    {!!heir.memories?.length && <div className="character-memories">{heir.memories.slice(0, 3).map((memory) => <p className={memory.value >= 0 ? "positive" : "negative"} key={memory.id}><i>{memory.feeling}</i> “{memory.text}” <span>semana {memory.week}</span></p>)}</div>}
                    <em>{heir.history[0]}</em>
                  </article>
                ))}
              </div>
            </section>
            <section className={`retirement-section ${game.founderRetired ? "retired" : ""}`}>
              <div>
                <small>{game.founderRetired ? "APOSENTADORIA CONCLUÍDA" : "PLANO DE APOSENTADORIA"}</small>
                <h3>{game.founderRetired ? `${chosenSuccessor?.name} lidera a nova geração` : "Entregar o comando sem destruir o que foi construído"}</h3>
                <p>{game.founderRetired
                  ? `A sucessão ocorreu na semana ${game.retiredWeek}. Você continua acionista e pode acompanhar o grupo pelo Meu grupo.`
                  : !chosenSuccessor
                    ? "Escolha primeiro um sucessor entre os herdeiros."
                    : chosenSuccessor.readiness < 60
                      ? `${chosenSuccessor.name} precisa alcançar 60% de prontidão. Está em ${Math.round(chosenSuccessor.readiness)}%.`
                      : game.week < 40
                        ? `A sucessão só poderá ser formalizada após a semana 40. Semana atual: ${game.week}.`
                        : "O sucessor e a estrutura mínima estão preparados. A decisão é definitiva."}</p>
              </div>
              {!game.founderRetired && <button disabled={!chosenSuccessor || chosenSuccessor.readiness < 60 || game.week < 40 || activeCompanies.length === 0} onClick={retireFounder}>Anunciar aposentadoria</button>}
            </section>
          </div>
        </GameModal>
      )}
      {dialog === "holding-company" && holdingCompany && (
        <GameModal
          onClose={() => {
            setDialog(null);
            setHoldingCompanyId(null);
          }}
          wide
        >
          <div className="holding-room">
            <header>
              <small>CENTRO DE COMANDO DA HOLDING</small>
              <h2>{holdingCompany.name}</h2>
              <p>
                {holdingCompany.sector} · caixa{" "}
                {money.format(holdingCompany.cash)} · CEO {holdingCompany.ceo}.
                As decisões abaixo alteram autonomia, liquidez e risco da
                empresa.
              </p>
            </header>
            <div className="ceo-command">
              <div><small>CONFIANÇA</small><b className={(holdingCompany.ceoTrust ?? 0) < 40 ? "bad" : "good"}>{Math.round(holdingCompany.ceoTrust ?? 0)}%</b></div>
              <div><small>LEALDADE</small><b className={(holdingCompany.ceoLoyalty ?? 0) < 35 ? "bad" : "good"}>{Math.round(holdingCompany.ceoLoyalty ?? 0)}%</b></div>
              <div><small>AMBIÇÃO</small><b className={(holdingCompany.ceoAmbition ?? 0) > 80 ? "bad" : ""}>{Math.round(holdingCompany.ceoAmbition ?? 0)}%</b></div>
              <div><small>INFLUÊNCIA</small><b className={(holdingCompany.ceoInfluence ?? 0) > 75 ? "bad" : ""}>{Math.round(holdingCompany.ceoInfluence ?? 0)}%</b></div>
              <div><small>REPUTAÇÃO</small><b>{Math.round(holdingCompany.ceoReputation ?? 0)}%</b></div>
              <div><small>TEMPO NO CARGO</small><b>{holdingCompany.ceoTenure ?? 0} sem.</b></div>
              <div><small>ÚLTIMA DECISÃO</small><span>{holdingCompany.ceoLastDecision}</span></div>
            </div>
            <nav className="room-tabs" aria-label="Áreas da empresa">
              {([[
                "ceo", "CEO e equipe"
              ], ["integridade", "Integridade"], ["capital", "Capital e sinergia"], ["societario", "Societário"]] as const).map(([id, label]) => (
                <button className={holdingTab === id ? "active" : ""} onClick={() => setHoldingTab(id)} key={id}>{label}</button>
              ))}
            </nav>
            <div className="holding-sections">
              {holdingTab === "ceo" && <section className="ceo-leadership room-tab-panel">
                <h3>CEO, meta e autonomia</h3>
                <label>
                  Comando da empresa
                  <select
                    value={holdingCompany.ceo}
                    onChange={(e) => appointCompanyCEO(e.target.value)}
                  >
                    <option value={currentLeader}>
                      {currentLeader} — liderança da geração {game.generation ?? 1}
                    </option>
                    <optgroup label="Executivos profissionais">
                      {executives.map((executive) => <option value={executive.name} key={executive.name}>{executive.name} — {executive.label}</option>)}
                    </optgroup>
                    {!!eligibleHeirs.length && <optgroup label="Herdeiros da família">
                      {eligibleHeirs.map((heir) => <option value={heir.name} key={heir.id}>{heir.name} — {heir.style} · prontidão {Math.round(heir.readiness)}%</option>)}
                    </optgroup>}
                  </select>
                </label>
                {holdingCompany.ceo !== currentLeader && <div className="executive-profile">
                  <b>{holdingCEOHeir ? `Herdeiro executivo · ${holdingCEOHeir.relationship}` : executives.find((e) => e.name === holdingCompany.ceo)?.label}</b>
                  <p>{holdingCEOHeir ? `${holdingCEOHeir.name} administra com estilo de ${holdingCEOHeir.style}. Competência ${Math.round(holdingCEOHeir.competence)}%, prontidão ${Math.round(holdingCEOHeir.readiness)}% e vínculo familiar ${Math.round(holdingCEOHeir.bond)}%.` : executives.find((e) => e.name === holdingCompany.ceo)?.profile}</p>
                  <small>RISCO: {holdingCEOHeir ? holdingCEOHeir.readiness < 40 ? "Pouca experiência pode reduzir apoio do conselho e aumentar erros." : "Poder familiar pode criar rivalidade com outros herdeiros." : executives.find((e) => e.name === holdingCompany.ceo)?.risk}</small>
                  <small>{holdingCEOHeir ? `PAPEL NA FAMÍLIA: ${holdingCEOHeir.role.toUpperCase()} · AMBIÇÃO ${Math.round(holdingCEOHeir.ambition)}%` : `PARTICIPAÇÃO: ${holdingCompany.ceoEquity ?? 0}% DA EMPRESA`}</small>
                </div>}
                <div className="ceo-settings">
                  <label>Meta principal<select value={holdingCompany.ceoGoal ?? "receita"} onChange={(e) => updateHoldingCompany({ ceoGoal: e.target.value as CEOGoal })}><option value="receita">Crescer receita</option><option value="lucro">Gerar lucro</option><option value="valor">Aumentar valuation</option><option value="cultura">Fortalecer cultura</option></select></label>
                  <label>Orçamento por decisão<b>{money.format(holdingCompany.ceoBudget ?? 0)}</b><input type="range" min="0" max="60000" step="5000" value={holdingCompany.ceoBudget ?? 0} onChange={(e) => updateHoldingCompany({ ceoBudget: Number(e.target.value) })} /></label>
                </div>
                <div className="policy-buttons">
                  {(
                    ["centralizada", "supervisionada", "independente"] as const
                  ).map((policy) => (
                    <button
                      className={
                        holdingCompany.autonomy === policy ? "active" : ""
                      }
                      key={policy}
                      onClick={() => updateHoldingCompany({ autonomy: policy })}
                    >
                      <b>{policy}</b>
                      <span>
                        {policy === "centralizada"
                          ? "Você mantém produtos e contratações sob controle direto."
                          : policy === "supervisionada"
                            ? "CEO propõe produtos e candidatos; você aprova ou negocia."
                            : "CEO cria produtos e contrata sozinho, com limites e risco."}
                      </span>
                    </button>
                  ))}
                </div>
                {holdingCompany.ceo !== currentLeader && <div className="ceo-product-pipeline">
                  <div><small>PIPELINE AUTÔNOMO</small><b>{holdingCompany.projects.filter((project) => project.kind === "produto" && project.status === "ativo").length} em desenvolvimento</b></div>
                  <div><small>PRODUTOS FATURANDO</small><b>{holdingCompany.projects.filter((project) => project.kind === "produto" && project.lifecycle === "mercado").length}</b></div>
                  <p>{holdingCompany.autonomy === "independente" ? `${holdingCompany.ceo} pode iniciar novos produtos dentro do orçamento sem pedir permissão.` : `${holdingCompany.ceo} enviará uma proposta quando enxergar espaço para um novo produto.`}{(holdingCompany.ceoProductCooldown ?? 0) > 0 ? ` Nova análise em aproximadamente ${holdingCompany.ceoProductCooldown} semanas.` : " O pipeline está disponível para uma nova análise."}</p>
                  <div><small>EQUIPE SOB GESTÃO</small><b>{holdingCompany.employees.length} de {holdingCompany.workforceTarget ?? Math.max(3, holdingCompany.employees.length)} planejados</b></div>
                  <div><small>PRÓXIMA ANÁLISE DE PESSOAS</small><b>{(holdingCompany.ceoHireCooldown ?? 0) > 0 ? `em ${holdingCompany.ceoHireCooldown} semanas` : "disponível"}</b></div>
                  <p>{holdingCompany.autonomy === "independente" ? `${holdingCompany.ceo} repõe vagas com uma reserva menor e contrata para expansão quando houver sobrecarga e caixa para oito meses de salário.` : holdingCompany.autonomy === "supervisionada" ? `${holdingCompany.ceo} apresentará o candidato, salário e motivo; reposições entram na análise prioritária.` : `${holdingCompany.ceo} pode pedir autorização para repor uma saída; contratações de expansão continuam sob seu controle direto.`}</p>
                  <div><small>CONTRATOS ATIVOS</small><b>{(holdingCompany.partners ?? []).filter((partner) => partner.status === "ativo").length}</b></div>
                  <div><small>NA MESA / EM DISPUTA</small><b>{(holdingCompany.partners ?? []).filter((partner) => ["proposta", "negociacao", "disputa"].includes(partner.status)).length}</b></div>
                  <p>{holdingCompany.autonomy === "independente" ? `${holdingCompany.ceo} negocia clientes e fornecedores sozinho, escolhendo entre pressão, relacionamento e equilíbrio conforme seu estilo.` : `${holdingCompany.ceo} analisará poder de barganha e apresentará uma estratégia antes de fechar propostas ou disputas.`}</p>
                </div>}
                {holdingCompany.ceoHiddenIssue && <p className="hidden-issue">Sinal de alerta: existem inconsistências no relatório. Auditoria estimada em {holdingCompany.ceoHiddenWeeks} semanas.</p>}
                {holdingCompany.ceo !== currentLeader && <div className="ceo-oversight"><button disabled={holdingCompany.cash < 25000} onClick={recognizeCompanyCEO}>Promover a sócio executivo · R$ 25 mil</button><button disabled={holdingCompany.cash < 20000} onClick={() => ceoOversightAction("auditoria")}>Auditar relatórios · R$ 20 mil</button><button disabled={holdingCompany.cash < 35000} onClick={() => ceoOversightAction("conselho")}>Articular conselho · R$ 35 mil</button><button className="danger-action" onClick={() => appointCompanyCEO(currentLeader)}>Demitir CEO e assumir</button></div>}
                {(holdingCompany.ceoAllianceCompanyId || holdingCompany.ceoRivalCompanyId) && <div className="ceo-relations">
                  {holdingCompany.ceoAllianceCompanyId && <span className="alliance">Aliança: {game.companies.find((c) => c.id === holdingCompany.ceoAllianceCompanyId)?.ceo}</span>}
                  {holdingCompany.ceoRivalCompanyId && <span className="rivalry">Rivalidade: {game.companies.find((c) => c.id === holdingCompany.ceoRivalCompanyId)?.ceo}</span>}
                </div>}
                {holdingCompany.ceo !== currentLeader && <div className={`character-opinion ceo-memory-opinion ${characterOpinion(holdingCompany.ceoMemories, game.week).tone}`}>
                  <small>COMO {holdingCompany.ceo?.toUpperCase()} INTERPRETA SUA LIDERANÇA</small>
                  <b>{characterOpinion(holdingCompany.ceoMemories, game.week).label}</b>
                  <span>Memória emocional {characterMemoryScore(holdingCompany.ceoMemories, game.week) > 0 ? "+" : ""}{Math.round(characterMemoryScore(holdingCompany.ceoMemories, game.week))} · influencia pedidos, lealdade e conflitos</span>
                </div>}
                {!!holdingCompany.ceoMemories?.length && <div className="character-memories ceo-memory-list">
                  <small>MEMÓRIAS DESTE CEO</small>
                  {holdingCompany.ceoMemories.slice(0, 4).map((memory) => <p className={memory.value >= 0 ? "positive" : "negative"} key={memory.id}><i>{memory.feeling}</i> “{memory.text}” <span>semana {memory.week} · força {memory.strength}%</span></p>)}
                </div>}
                <div className="ceo-history"><small>HISTÓRICO DE DECISÕES</small>{(holdingCompany.ceoHistory ?? []).slice(0, 4).map((item, index) => <span key={`${item}-${index}`}>{item}</span>)}</div>
              </section>}
              {holdingTab === "integridade" && <section className="integrity-center room-tab-panel">
                <div className="integrity-heading">
                  <div>
                    <small>COMPLIANCE E INVESTIGAÇÃO</small>
                    <h3>Central de integridade</h3>
                  </div>
                  <b>{(game.auditCases ?? []).filter((item) => item.companyId === holdingCompany.id && !["encerrada"].includes(item.status)).length} casos ativos</b>
                </div>
                {(game.auditCases ?? []).filter((item) => item.companyId === holdingCompany.id).length === 0 ? (
                  <p className="integrity-empty">Nenhuma denúncia registrada. Isso não garante que a operação esteja livre de irregularidades.</p>
                ) : (
                  <div className="audit-cases">
                    {(game.auditCases ?? [])
                      .filter((item) => item.companyId === holdingCompany.id)
                      .map((auditCase) => (
                        <article className={`audit-case status-${auditCase.status}`} key={auditCase.id}>
                          <header>
                            <div>
                              <small>{auditCase.category} · semana {auditCase.openedWeek}</small>
                              <h4>{auditCase.title}</h4>
                            </div>
                            <span className={`severity-${auditCase.severity}`}>{auditCase.severity}</span>
                          </header>
                          <p>{auditCase.description}</p>
                          <div className="audit-facts">
                            <span>Suspeito <b>{auditCase.suspect}</b></span>
                            <span>Perda possível <b>{money.format(auditCase.potentialLoss)}</b></span>
                            <span>Status <b>{auditCase.status}</b></span>
                          </div>
                          <div className="evidence-line">
                            <span><i style={{ width: `${auditCase.evidence}%` }} /></span>
                            <b>{Math.round(auditCase.evidence)}% de evidências</b>
                          </div>
                          {auditCase.outcome && <em>{auditCase.outcome}</em>}
                          {auditCase.status === "investigando" && <p className="investigation-time">Conclusão prevista em {auditCase.weeksLeft} semana(s).</p>}
                          {auditCase.status !== "encerrada" && (
                            <div className="audit-actions">
                              {["suspeita", "acobertada"].includes(auditCase.status) && <button disabled={holdingCompany.cash < 20000} onClick={() => auditCaseAction(auditCase.id, "interna")}>Investigação interna · R$ 20 mil</button>}
                              {["suspeita", "investigando", "acobertada"].includes(auditCase.status) && <button disabled={holdingCompany.cash < 55000} onClick={() => auditCaseAction(auditCase.id, "externa")}>Auditoria externa · R$ 55 mil</button>}
                              {auditCase.status === "comprovada" && holdingCompany.ceo !== currentLeader && <button disabled={auditCase.evidence < 42 || holdingCompany.cash < 30000} onClick={() => auditCaseAction(auditCase.id, "afastar")}>Afastar CEO · R$ 30 mil</button>}
                              {auditCase.status === "comprovada" && <button disabled={auditCase.evidence < 65 || holdingCompany.cash < 15000} onClick={() => auditCaseAction(auditCase.id, "denunciar")}>Denunciar e cooperar</button>}
                              {["suspeita", "comprovada"].includes(auditCase.status) && <button className="cover-action" onClick={() => auditCaseAction(auditCase.id, "acobertar")}>Acobertar o caso</button>}
                            </div>
                          )}
                        </article>
                      ))}
                  </div>
                )}
              </section>}
              {holdingTab === "capital" && <section className="room-tab-panel">
                <h3>Capital e dividendos</h3>
                <label>
                  Valor da operação
                  <input
                    type="number"
                    min="10000"
                    max="100000"
                    step="10000"
                    value={transferAmount}
                    onChange={(e) =>
                      setTransferAmount(Math.min(100000, Math.max(0, Number(e.target.value))))
                    }
                  />
                </label>
                <div className="holding-action-grid">
                  <button
                    disabled={
                      game.personalCash < transferAmount || transferAmount <= 0
                    }
                    onClick={() => holdingCapitalAction("aporte")}
                  >
                    Aportar da holding
                  </button>
                  <button
                    disabled={holdingCompany.cash <= 50000}
                    onClick={() => holdingCapitalAction("dividendo")}
                  >
                    Distribuir 8% agora
                  </button>
                </div>
                <label>
                  Política semanal de dividendos
                  <select
                    value={holdingCompany.dividendRate ?? 0}
                    onChange={(e) =>
                      updateHoldingCompany({
                        dividendRate: Number(e.target.value),
                      })
                    }
                  >
                    <option value="0">Reinvestir tudo</option>
                    <option value="10">10% do lucro</option>
                    <option value="20">20% do lucro</option>
                    <option value="35">35% do lucro</option>
                  </select>
                </label>
              </section>}
              {holdingTab === "capital" && <section className="room-tab-panel">
                <h3>Sinergia do grupo</h3>
                <p>
                  Serviços compartilhados reduzem custos semanais, mas exigem R$
                  25 mil para implantação.
                </p>
                <button
                  className={holdingCompany.sharedServices ? "toggle-on" : ""}
                  disabled={
                    !holdingCompany.sharedServices &&
                    holdingCompany.cash < 25000
                  }
                  onClick={() => holdingCapitalAction("servicos")}
                >
                  {holdingCompany.sharedServices
                    ? "Desativar serviços compartilhados"
                    : "Ativar serviços compartilhados"}
                </button>
                <label>
                  Transferir para outra empresa
                  <select
                    value={transferTargetId ?? ""}
                    onChange={(e) =>
                      setTransferTargetId(Number(e.target.value))
                    }
                  >
                    <option value="">Escolha uma empresa</option>
                    {game.companies
                      .filter(
                        (c) =>
                          c.id !== holdingCompany.id &&
                          !c.sold &&
                          !c.bankrupt &&
                          !c.closed,
                      )
                      .map((c) => (
                        <option value={c.id} key={c.id}>
                          {c.name} · {money.format(c.cash)}
                        </option>
                      ))}
                  </select>
                </label>
                <button
                  disabled={
                    !transferTargetId ||
                    holdingCompany.cash < transferAmount ||
                    transferAmount <= 0 ||
                    transferAmount > 100000
                  }
                  onClick={transferBetweenCompanies}
                >
                  Transferir {money.format(transferAmount)}
                </button>
              </section>}
              {holdingTab === "societario" && <section className="corporate-actions room-tab-panel">
                <h3>Decisões societárias</h3>
                <div className="holding-action-grid">
                  <button
                    disabled={!transferTargetId}
                    onClick={mergeHoldingCompany}
                  >
                    Fundir na empresa selecionada
                  </button>
                  <button onClick={sellHoldingCompany}>
                    Vender esta empresa
                  </button>
                </div>
                <button className="danger-action" onClick={closeHoldingCompany}>
                  Encerrar operação voluntariamente
                </button>
              </section>}
            </div>
          </div>
        </GameModal>
      )}
      {dialog === "marketing" && active && campaignForecast && (
        <GameModal onClose={() => setDialog(null)}>
          <div className="marketing-room">
            <ModalTitle label="AGÊNCIA DE CAMPANHAS" title="Dinheiro compra alcance. Não compra certeza." text="Monte a campanha e veja a estimativa antes de investir. Qualidade, preço, reputação, produto, equipe, economia e concorrentes alteram as probabilidades." />
            <div className="marketing-planner">
              <section className="campaign-setup">
                <label>Orçamento total <b>{money.format(campaignBudget)}</b><input type="range" min="5000" max="150000" step="5000" value={campaignBudget} onChange={(event) => setCampaignBudget(Number(event.target.value))} /><small>O valor inteiro sai do caixa ao confirmar.</small></label>
                <label>Duração<select value={campaignDuration} onChange={(event) => setCampaignDuration(Number(event.target.value))}>{[2, 3, 4, 5, 6].map((weeks) => <option value={weeks} key={weeks}>{weeks} semanas</option>)}</select><small>O resultado é distribuído durante todo o período.</small></label>
                <div><span>OBJETIVO</span><div className="campaign-choice-grid">{(Object.keys(marketingObjectiveLabels) as MarketingObjective[]).map((objective) => <button key={objective} className={campaignObjective === objective ? "active" : ""} disabled={objective === "lancamento" && marketableProducts.length === 0} onClick={() => setCampaignObjective(objective)}>{marketingObjectiveLabels[objective]}</button>)}</div></div>
                <div><span>PÚBLICO</span><div className="campaign-choice-grid">{(Object.keys(marketingAudienceLabels) as MarketingAudience[]).map((audience) => <button key={audience} className={campaignAudience === audience ? "active" : ""} onClick={() => setCampaignAudience(audience)}>{marketingAudienceLabels[audience]}</button>)}</div></div>
                {marketableProducts.length > 0 && <label>Produto principal<select value={campaignProductId ?? ""} onChange={(event) => setCampaignProductId(event.target.value ? Number(event.target.value) : undefined)}><option value="">Marca da empresa</option>{marketableProducts.map((product) => <option key={product.id} value={product.id}>{product.name} · qualidade {Math.round(product.quality)}%</option>)}</select></label>}
              </section>
              <section className="campaign-forecast">
                <header><small>PREVISÃO DA AGÊNCIA</small><b>Compatibilidade {campaignForecast.score}%</b><span>Orçamento de referência: {money.format(campaignForecast.idealBudget)}</span></header>
                <div className="probability-stack">
                  {(Object.keys(marketingOutcomeLabels) as MarketingCampaignOutcome[]).map((outcome) => <div className={outcome} key={outcome}><span>{marketingOutcomeLabels[outcome]}</span><b>{campaignForecast.probabilities[outcome]}%</b><i><em style={{ width: `${campaignForecast.probabilities[outcome]}%` }} /></i></div>)}
                </div>
                <ul>{campaignForecast.factors.map((factor) => <li key={factor}>{factor}</li>)}</ul>
                {campaignBudget > campaignForecast.idealBudget * 2 && <p className="campaign-risk-warning">Você está acima da saturação. Mais dinheiro aumenta a exposição, mas também o risco de rejeição e desperdício.</p>}
                {active.cash - campaignBudget < 30000 && <p className="campaign-risk-warning">A campanha deixará a empresa com somente {money.format(active.cash - campaignBudget)} em caixa.</p>}
                <button className="launch-campaign-button" disabled={active.cash < campaignBudget || campaignObjective === "lancamento" && (!marketableProducts.length || !campaignProductId)} onClick={startMarketingCampaign}>Lançar campanha · {money.format(campaignBudget)}</button>
              </section>
            </div>
          </div>
        </GameModal>
      )}
      {dialog === "finance" && (
        <GameModal onClose={() => setDialog(null)}>
          <div className="finance-ledger-room">
            <ModalTitle
              label="CAIXA E MOVIMENTAÇÕES"
              title="Para onde foi o dinheiro"
              text="O patrimônio mede o valor estimado do império. Caixa sustenta impostos, capital de giro e a complexidade de crescer. Este extrato mostra o que entrou e saiu em cada empresa."
            />
            <div className="finance-summary">
              <div><small>CAIXA DA EMPRESA ATIVA</small><b>{money.format(active?.cash ?? 0)}</b><span>{active?.name ?? "Nenhuma empresa ativa"}</span></div>
              <div><small>CAIXA SOMADO DO GRUPO</small><b>{money.format(groupCash)}</b><span>Empresas em operação</span></div>
              <div><small>PATRIMÔNIO PESSOAL</small><b>{money.format(game.personalCash)}</b><span>Recursos fora das empresas</span></div>
            </div>
            {metrics && <div className="finance-scale-summary">
              <div><small>ESCALA ATUAL</small><b>{metrics.scaleProfile.label}</b><span>Alíquota de resultado: {Math.round(metrics.scaleProfile.taxRate * 100)}%</span></div>
              <div><small>CAPITAL DE GIRO</small><b>{money.format(metrics.requiredReserve)}</b><span className={metrics.cashCoverage < .7 ? "bad" : ""}>{Math.max(0, Math.round(metrics.cashCoverage * 100))}% coberto pelo caixa</span></div>
              <div><small>IMPOSTOS DA SEMANA</small><b>{money.format(metrics.taxes)}</b><span>Somente quando há resultado positivo</span></div>
              <div><small>BUROCRACIA E ESCALA</small><b>{money.format(metrics.complexityCost)}</b><span>Administração, licenças e conformidade</span></div>
            </div>}
            <div className="finance-ledger-list">
              {(game.financialLedger ?? []).length === 0 ? (
                <p className="empty-state">O primeiro extrato será criado quando a próxima semana terminar.</p>
              ) : (game.financialLedger ?? []).slice(0, 60).map((entry) => (
                <article key={entry.id} className={entry.amount >= 0 ? "credit" : "debit"}>
                  <div><small>SEMANA {entry.week} · {entry.companyName}</small><b>{entry.label}</b><p>{entry.detail}</p></div>
                  <strong>{entry.amount >= 0 ? "+" : "−"}{money.format(Math.abs(entry.amount))}</strong>
                </article>
              ))}
            </div>
          </div>
        </GameModal>
      )}
      {dialog === "help" && (
        <GameModal onClose={() => setDialog(null)}>
          <ModalTitle
            label="COMO JOGAR"
            title="Você não administra números. Você constrói uma história."
            text="Converse com pessoas, escolha projetos, responda mensagens e viva as semanas. Venda quando achar que chegou a hora — ou continue até criar um legado."
          />
          <ol className="help-steps">
            <li>
              <b>1</b>Explore o escritório e resolva conversas.
            </li>
            <li>
              <b>2</b>Defina salários, contrate e cuide das relações.
            </li>
            <li>
              <b>3</b>Crie projetos e viva as consequências semanais.
            </li>
            <li>
              <b>4</b>Venda empresas e reinvista em novos setores.
            </li>
          </ol>
          <section className="help-page-links"><small>GUIAS DE CADA PÁGINA</small><p>Você pode reabrir qualquer apresentação quando quiser.</p><div>{(Object.keys(pageGuides) as View[]).map((guide) => <button onClick={() => navigateToView(guide, true)} key={guide}>{pageGuides[guide].title}</button>)}</div></section>
        </GameModal>
      )}
      {dialog === "page-guide" && pageGuideView && (
        <GameModal onClose={() => { setDialog(null); setPageGuideView(null); }} wide>
          <div className={`page-guide-room guide-${pageGuideView}`}>
            <header><div><small>{pageGuides[pageGuideView].eyebrow} · GUIA RÁPIDO</small><h2>{pageGuides[pageGuideView].title}</h2><p>{pageGuides[pageGuideView].summary}</p></div><span>{(Object.keys(pageGuides) as View[]).indexOf(pageGuideView) + 1}<small>de 7 áreas</small></span></header>
            <section className="page-guide-actions"><small>O QUE VOCÊ FAZ AQUI</small><div>{pageGuides[pageGuideView].actions.map((action, index) => <article key={action}><b>{index + 1}</b><p>{action}</p></article>)}</div></section>
            <div className="page-guide-insights"><article className="watch"><small>PRESTE ATENÇÃO</small><p>{pageGuides[pageGuideView].watch}</p></article><article className="start"><small>PRIMEIRO PASSO RECOMENDADO</small><p>{pageGuides[pageGuideView].firstStep}</p></article></div>
            <footer><p>Este resumo aparece somente na primeira visita. O botão <b>?</b> permite reabrir todos os guias.</p><button onClick={() => { setDialog(null); setPageGuideView(null); }}>Entendi. Explorar {pageGuides[pageGuideView].title}</button></footer>
          </div>
        </GameModal>
      )}
      {toast && <div className="game-toast">{toast}</div>}
    </main>
  );
}

function StartScreen({
  onStart,
}: {
  onStart: (sector: Sector, holdingName: string, founderName: string, difficulty: GameDifficulty) => void;
}) {
  const [sector, setSector] = useState<Sector>("Tecnologia");
  const [holdingName, setHoldingName] = useState("");
  const [founderName, setFounderName] = useState("");
  const [difficulty, setDifficulty] = useState<GameDifficulty>("executivo");
  const validName = holdingName.trim().length >= 2;
  const validFounder = founderName.trim().length >= 2;
  return (
    <main className="start-screen">
      <div className="start-art" />
      <div className="start-overlay" />
      <section className="start-copy">
        <p>UMA HISTÓRIA DE NEGÓCIOS</p>
        <h1>
          Você tem oito semanas de caixa.
          <br />E uma ideia que ninguém entende.
        </h1>
        <span>
          Diga quem você é, dê um nome ao grupo e escolha onde sua história
          começa.
        </span>
        <div className="founder-fields">
          <label className="holding-name-field">
            <small>SEU NOME</small>
            <input
              autoFocus
              maxLength={36}
              placeholder="Ex.: Daken Brasil"
              value={founderName}
              onChange={(e) => setFounderName(e.target.value)}
            />
            <em>
              {validFounder
                ? `Você será apresentado como fundador e CEO: ${founderName.trim()}.`
                : "Digite pelo menos 2 caracteres."}
            </em>
          </label>
          <label className="holding-name-field">
            <small>NOME DO SEU GRUPO EMPRESARIAL</small>
            <input
              maxLength={36}
              placeholder="Ex.: Grupo Daken, Atlas Participações..."
              value={holdingName}
              onChange={(e) => setHoldingName(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && validName && validFounder)
                  onStart(sector, holdingName, founderName, difficulty);
              }}
            />
            <em>
              {validName
                ? `Sua holding será conhecida como “${holdingName.trim()}”.`
                : "Digite pelo menos 2 caracteres."}
            </em>
          </label>
        </div>
        <div className="sector-choice">
          {(Object.keys(sectorData) as Sector[]).map((s) => (
            <button
              className={sector === s ? "active" : ""}
              onClick={() => setSector(s)}
              key={s}
            >
              <b>{sectorData[s].icon}</b>
              <span>
                {s}
                <small>{sectorData[s].difficulty}</small>
              </span>
            </button>
          ))}
        </div>
        <div className="difficulty-choice">
          <small>RITMO DA HISTÓRIA</small>
          <div>{(Object.keys(difficultyProfiles) as GameDifficulty[]).map((level) => <button className={difficulty === level ? "active" : ""} onClick={() => setDifficulty(level)} key={level}><b>{difficultyProfiles[level].title}</b><span>{difficultyProfiles[level].description}</span></button>)}</div>
        </div>
        <article className="sector-preview">
          <div>
            <small>SEU PRIMEIRO NEGÓCIO</small>
            <h2>{sectorData[sector].title}</h2>
            <p>{sectorData[sector].desc}</p>
          </div>
          <button
            disabled={!validName || !validFounder}
            onClick={() => onStart(sector, holdingName, founderName, difficulty)}
          >
            Começar a história <span>›</span>
          </button>
        </article>
      </section>
    </main>
  );
}

function PageIntro({
  kicker,
  title,
  text,
  action,
}: {
  kicker: string;
  title: string;
  text: string;
  action?: React.ReactNode;
}) {
  return (
    <header className="page-intro">
      <div>
        <small>{kicker}</small>
        <h1>{title}</h1>
        <p>{text}</p>
      </div>
      {action}
    </header>
  );
}
function Avatar({ initials, color }: { initials: string; color: string }) {
  return (
    <div
      className="mini-avatar"
      style={{ "--person": color } as React.CSSProperties}
    >
      {initials}
    </div>
  );
}
function ModalTitle({
  label,
  title,
  text,
}: {
  label: string;
  title: string;
  text: string;
}) {
  return (
    <header className="modal-title">
      <small>{label}</small>
      <h2>{title}</h2>
      <p>{text}</p>
    </header>
  );
}
function Conversation({
  message,
  onChoose,
}: {
  message: StoryMessage;
  onChoose: (c: MessageChoice) => void;
}) {
  return (
    <>
      <div className="message-author">
        <Avatar initials={message.initials} color={message.color} />
        <div>
          <b>{message.from}</b>
          <small>{message.role}</small>
        </div>
      </div>
      <h2 className="conversation-title">{message.subject}</h2>
      <p className="conversation-body">{message.body}</p>
      <div className="dialog-choices">
        {message.choices.map((c) => (
          <button
            className={c.tone ?? ""}
            key={c.label}
            onClick={() => onChoose(c)}
          >
            {c.label}
            <span>Essa escolha altera a relação e o futuro.</span>
          </button>
        ))}
      </div>
    </>
  );
}
function GameModal({
  children,
  onClose,
  wide = false,
}: {
  children: React.ReactNode;
  onClose: () => void;
  wide?: boolean;
}) {
  return (
    <div className="game-modal-bg">
      <div className={`game-modal ${wide ? "wide" : ""}`}>
        <button className="close-modal" onClick={onClose}>
          ×
        </button>
        {children}
      </div>
    </div>
  );
}
