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
  status: "ativo" | "negociacao" | "encerrado";
  lastEvent?: string;
};
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
};
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
};
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
  lastDynastyEventWeek?: number;
  completedDynastyGoals?: string[];
  recentNewsTopics?: string[];
  weeklyReports?: WeeklyReport[];
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
    lastEvent: "Contrato em andamento dentro das condições negociadas.",
  }));
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
  const marketingEffect =
    1 + Math.min(0.55, (product.productMarketing ?? 0) / 35000);
  const qualityEffect = 0.62 + product.quality / 155;
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
  Tecnologia: ["Engenharia", "Produto", "Dados", "Cibersegurança", "UX", "Vendas B2B", "Suporte técnico", "Qualidade"],
  Alimentação: ["Cozinha", "Operações", "Qualidade", "Compras", "Logística", "Marketing local", "Expansão", "Atendimento"],
  Varejo: ["Compras", "E-commerce", "Logística", "Vendas", "Visual merchandising", "Atendimento", "CRM", "Estoque"],
  Agência: ["Criação", "Atendimento", "Mídia", "Estratégia", "Produção", "Comercial", "Redação", "Design"],
};
const laborTraits = ["Analítico", "Carismático", "Criativo", "Competitivo", "Diplomático", "Disciplinado", "Empático", "Inventivo", "Pragmático", "Questionador", "Resiliente", "Visionário"];
const laborAmbitions = ["Quer liderar uma equipe", "Busca estabilidade", "Quer virar diretor", "Sonha em criar um produto", "Quer participação na empresa", "Busca autonomia", "Quer aprender rápido", "Pretende abrir o próprio negócio", "Quer reconhecimento público", "Valoriza equilíbrio pessoal"];
const laborColors = ["#778ad9", "#d982a8", "#6da88c", "#df9d5d", "#7d72ad", "#57a7a0", "#bd735f", "#8d9a61"];

function createLaborMarket(sector: Sector, companyId: number, week: number, existingNames: string[] = [], count = 10): Employee[] {
  const marketCycle = Math.floor(Math.max(1, week) / 2);
  const used = new Set(existingNames);
  const result: Employee[] = [];
  for (let index = 0; index < count * 3 && result.length < count; index += 1) {
    const seed = companyId * 97 + marketCycle * 53 + index * 29 + sector.length * 17;
    const firstName = laborFirstNames[seed % laborFirstNames.length];
    const lastName = laborLastNames[(seed * 7 + companyId * 11) % laborLastNames.length];
    const name = `${firstName} ${lastName}`;
    if (used.has(name)) continue;
    used.add(name);
    const role = laborRoles[sector][(seed * 5 + index) % laborRoles[sector].length];
    const skill = 58 + (seed % 37);
    const rolePremium = ["Engenharia", "Dados", "Cibersegurança", "Estratégia", "Expansão"].includes(role) ? 900 : 0;
    const market = Math.round((2400 + skill * 43 + rolePremium) / 100) * 100;
    const salary = Math.round((market * (0.86 + ((seed >> 2) % 15) / 100)) / 100) * 100;
    result.push({
      id: 200000000 + companyId * 100000 + marketCycle * 100 + result.length,
      name,
      initials: `${firstName[0]}${lastName[0]}`.toUpperCase(),
      role,
      salary,
      market,
      skill,
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
  const market = createLaborMarket(company.sector, company.id, week, company.employees.map((employee) => employee.name), 12);
  const preferredRoles = roles[style];
  const selected = market.find((candidate) => preferredRoles.some((role) => candidate.role.includes(role))) ?? market[seed % market.length];
  const name = selected.name;
  const role = roles[style][seed % roles[style].length];
  const skill = 70 + (seed % 22);
  const marketSalary = Math.max(selected.market, Math.round((3900 + skill * 38 + (style === "inovacao" ? 700 : 0)) / 100) * 100);
  const salary = Math.round((marketSalary * (0.91 + (seed % 5) / 100)) / 100) * 100;
  return {
    ...selected,
    name,
    role,
    salary,
    market: marketSalary,
    skill,
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
    const accepts = !negotiated || Math.random() < clamp(.72 + (company.reputation - 50) / 180 - (candidate.skill - 75) / 160);
    return {
      ...state,
      companies: state.companies.map((item) => {
        if (item.id !== company.id || item.employees.some((employee) => employee.name === candidate.name)) return item;
        if (!accepts) return {
          ...item,
          ceoTrust: clamp((item.ceoTrust ?? 65) - 1),
          ceoHireCooldown: 5,
          ceoLastDecision: `${candidate.name} recusou a contraproposta da holding`,
          ceoHistory: [`Semana ${state.week}: contraproposta de ${money.format(offeredSalary)} recusada por ${candidate.name}.`, ...(item.ceoHistory ?? [])].slice(0, 8),
        };
        return {
          ...item,
          cash: item.cash - 9000,
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
    employees: foundingTeam,
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
  balanceVersion: 2,
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
  lastDynastyEventWeek: 0,
  completedDynastyGoals: [],
  recentNewsTopics: [],
  weeklyReports: [],
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

function companyMetrics(
  company: Company,
  economy: Economy = initialState.economy,
) {
  const payroll = company.employees.reduce((sum, e) => sum + e.salary, 0);
  const available = company.employees.filter((e) => (e.leaveWeeks ?? 0) <= 0);
  const morale = company.employees.length
    ? company.employees.reduce((sum, e) => sum + e.morale, 0) /
      company.employees.length
    : 40;
  const skill = available.length
    ? available.reduce((sum, e) => sum + e.skill, 0) / available.length
    : 20;
  const capacity = Math.max(0.35, available.length) * skill * (morale / 100);
  const sectorMultiplier =
    company.sector === "Agência"
      ? 1.75
      : company.sector === "Alimentação"
        ? 0.78
        : 1;
  const baseRevenue = Math.min(
    company.customers * company.price,
    capacity * 410 * sectorMultiplier,
  );
  const recurringRevenue =
    (company.productRevenue ?? 0) * (company.campaignWeeks ? 1.12 : 1);
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
  const revenue = Math.round(
    (baseRevenue + recurringRevenue + contractRevenue) *
      (0.75 + company.reputation / 250) *
      economy.demand *
      (0.9 + economy.confidence / 500) *
      effectRevenue,
  );
  const weeklyPayroll = payroll / 4.33;
  const weeklyOverhead = (12500 + company.employees.length * 800) / 4.33;
  const productMarketing = company.projects.reduce(
    (sum, p) =>
      sum + (p.lifecycle === "mercado" ? (p.productMarketing ?? 0) : 0),
    0,
  );
  const costs =
    ((weeklyPayroll + company.marketing + productMarketing + weeklyOverhead + supplierCosts) *
      economy.costs *
      (company.efficiency ?? 1) +
      company.debt * economy.interest) *
    effectCosts;
  const profit = Math.round(revenue - costs);
  const valuation = Math.max(
    30000,
    Math.round(
      revenue * 10 +
        company.cash * 0.8 +
        company.reputation * 4200 -
        company.debt,
    ),
  );
  return { payroll, morale, skill, revenue, costs, profit, valuation };
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
  };
}

const averageStress = (company: Company) => company.employees.length
  ? company.employees.reduce((sum, employee) => sum + (employee.stress ?? 0), 0) / company.employees.length
  : 0;

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
        { key: "valuation", label: "Valor da empresa", before: before.valuation, after: after.valuation, delta: after.valuation - before.valuation, format: "money", reasons: [reason("Fórmula de valuation", "Combina faturamento ×10, 80% do caixa, reputação × R$ 4.200 e desconta a dívida.", "neutro"), ...revenueReasons.slice(0, 1), ...cashReasons.slice(0, 1)] },
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

const formatIndicatorValue = (value: number, format: IndicatorChange["format"]) =>
  format === "money"
    ? money.format(value)
    : format === "percent"
      ? `${Math.round(value)}%`
      : Math.round(value).toLocaleString("pt-BR");

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
    | "partner"
    | "factions"
    | "annual-plan"
    | "founder-finale"
    | "dynasty-transition"
    | "help"
    | null
  >(null);
  const [toast, setToast] = useState("");
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
  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null);
  const [selectedReportWeek, setSelectedReportWeek] = useState<number | null>(null);
  const [reportCompanyId, setReportCompanyId] = useState<number | null>(null);
  const [selectedPartnerId, setSelectedPartnerId] = useState<string | null>(null);
  const [selectedFactionId, setSelectedFactionId] = useState<string | null>(null);
  const [annualPriorityChoice, setAnnualPriorityChoice] = useState<AnnualPriority>("crescimento");
  const [holdingTab, setHoldingTab] = useState<"ceo" | "integridade" | "capital" | "societario">("ceo");
  const [dynastyTab, setDynastyTab] = useState<"visao" | "familia" | "poder" | "sucessao" | "cronica">("visao");

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
          balanceVersion: 2,
          economy:
            parsed.balanceVersion === 2
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
          formerPresidents: parsed.formerPresidents ?? (parsed.dynastyMode ? [
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
          ] : []),
          lastDynastyTransition: parsed.lastDynastyTransition,
          lastDynastyEventWeek: parsed.lastDynastyEventWeek ?? 0,
          completedDynastyGoals: parsed.completedDynastyGoals ?? [],
          recentNewsTopics: parsed.recentNewsTopics ?? [],
          weeklyReports: parsed.weeklyReports ?? [],
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
            partners: c.partners ?? createBusinessPartners(c.sector, c.id),
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
            })),
            employees: c.employees.map((e) => ({
              ...e,
              salary:
                parsed.balanceVersion === 2
                  ? e.salary
                  : Math.round((e.salary * 0.78) / 100) * 100,
              market:
                parsed.balanceVersion === 2
                  ? e.market
                  : Math.round((e.market * 0.84) / 100) * 100,
              stress: Math.min(e.stress ?? 25, 48),
              weeks: e.weeks ?? 0,
              warnings: e.warnings ?? 0,
              leaveWeeks: e.leaveWeeks ?? 0,
              memories: e.memories ?? [],
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
  const currentLeader = game.playerExecutive ?? game.founder;
  const selectedWeeklyReport = (game.weeklyReports ?? []).find((report) => report.week === selectedReportWeek) ?? game.weeklyReports?.[0] ?? null;
  const selectedCompanyReport = selectedWeeklyReport?.companies.find((report) => report.companyId === reportCompanyId)
    ?? selectedWeeklyReport?.companies.find((report) => report.companyId === game.activeCompanyId)
    ?? selectedWeeklyReport?.companies[0]
    ?? null;
  const advisedCompany = selectedCompanyReport
    ? game.companies.find((company) => company.id === selectedCompanyReport.companyId) ?? null
    : null;
  const weeklyAdvice = selectedCompanyReport && advisedCompany
    ? buildWeeklyAdvice(selectedCompanyReport, advisedCompany)
    : [];
  const latestActiveReport = game.weeklyReports?.[0]?.companies.find((report) => report.companyId === game.activeCompanyId) ?? null;
  const selectedPartner = active?.partners?.find((partner) => partner.id === selectedPartnerId) ?? null;
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
  const empireValue =
    game.companies
      .filter((c) => !c.sold && !c.bankrupt && !c.closed)
      .reduce((sum, c) => sum + companyMetrics(c, game.economy).valuation, 0) +
    game.personalCash;
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
    setGame((s) => ({
      ...s,
      companies: s.companies.map((c) =>
        c.id === s.activeCompanyId ? fn(c) : c,
      ),
    }));
  };
  const notify = (text: string) => {
    setToast(text);
    setTimeout(() => setToast(""), 2600);
  };

  const partnerAction = (action: "renovar" | "pressionar" | "relacionamento" | "encerrar") => {
    if (!active || !selectedPartner || !isCEO) return;
    if (action === "relacionamento" && active.cash < 20000) return;
    const identity = game.leadershipIdentity ?? initialLeadershipIdentity;
    const negotiationPower = identity.negociacao * 0.45 + identity.integridade * 0.2 + selectedPartner.trust * 0.35;
    const pressureSuccess = negotiationPower >= (selectedPartner.personality === "exigente" ? 63 : selectedPartner.personality === "oportunista" ? 58 : 52);
    const changes: Partial<Record<IdentityDimension, number>> = action === "renovar"
      ? { prudencia: 2, negociacao: 1 }
      : action === "pressionar"
        ? { negociacao: 3, agressividade: 2, pessoas: -1 }
        : action === "relacionamento"
          ? { pessoas: 2, integridade: 1 }
          : { agressividade: 3, integridade: -1 };
    setGame((state) => evolveIdentity({
      ...state,
      companies: state.companies.map((company) => company.id !== active.id ? company : ({
        ...company,
        cash: company.cash - (action === "relacionamento" ? 20000 : 0),
        reputation: clamp(company.reputation + (action === "encerrar" ? -2 : action === "relacionamento" ? 1 : 0)),
        partners: (company.partners ?? []).map((partner) => {
          if (partner.id !== selectedPartner.id) return partner;
          if (action === "encerrar") return { ...partner, status: "encerrado" as const, weeksLeft: 0, trust: clamp(partner.trust - 22), lastEvent: "Você encerrou o contrato unilateralmente." };
          if (action === "relacionamento") return { ...partner, status: "ativo" as const, weeksLeft: Math.max(partner.weeksLeft, 8) + 4, trust: clamp(partner.trust + 15), lastEvent: "A liderança investiu pessoalmente na relação." };
          if (action === "renovar") return { ...partner, status: "ativo" as const, weeksLeft: 18, trust: clamp(partner.trust + 4), weeklyValue: Math.round(partner.weeklyValue * (partner.kind === "cliente" ? 1.03 : 1.04)), lastEvent: "Contrato renovado em condições equilibradas." };
          if (!pressureSuccess) return { ...partner, status: "negociacao" as const, trust: clamp(partner.trust - 10), lastEvent: "A pressão foi recusada e a relação ficou sob risco." };
          return { ...partner, status: "ativo" as const, weeksLeft: Math.max(12, partner.weeksLeft), trust: clamp(partner.trust - 7), weeklyValue: Math.round(partner.weeklyValue * (partner.kind === "cliente" ? 1.12 : 0.9)), lastEvent: partner.kind === "cliente" ? "Você conquistou um contrato maior, mas desgastou a relação." : "Você reduziu o custo do fornecimento, mas perdeu confiança." };
        }),
      })),
      news: [{
        id: Date.now(), week: state.week, category: "negocios",
        headline: action === "encerrar" ? `${active.name} rompe contrato com ${selectedPartner.name}` : `${active.name} renegocia acordo com ${selectedPartner.name}`,
        body: action === "pressionar" && !pressureSuccess ? "A contraparte recusou as condições e a relação comercial entrou em risco." : `A decisão de ${action} alterou valores, confiança e dependência entre as empresas.`,
        impact: action === "relacionamento" || (action === "pressionar" && pressureSuccess) ? "positivo" : action === "encerrar" || (action === "pressionar" && !pressureSuccess) ? "negativo" : "neutro",
      }, ...state.news].slice(0, 60),
    }, changes, `${action} com ${selectedPartner.name}`));
    setDialog(null);
    notify(action === "pressionar" ? pressureSuccess ? "A negociação dura funcionou." : "A contraparte recusou sua pressão." : "A decisão comercial foi registrada.");
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
      return evolveIdentity(changed, action === "confrontar" ? { agressividade: 3, negociacao: -1 } : action === "negociar" ? { negociacao: 3, pessoas: 1 } : agenda === "seguranca" ? { prudencia: 3 } : agenda === "inovacao" ? { visao: 3 } : agenda === "pessoas" ? { pessoas: 3 } : { agressividade: 2 }, `${action} com ${selectedFaction.name}`);
    });
    notify("O equilíbrio político da holding mudou.");
  };

  const startAnnualPlan = () => {
    if (game.annualPlan) return;
    const details = annualPlanDetails[annualPriorityChoice];
    setGame((state) => ({
      ...state,
      annualPlan: { year: (state.annualReviews?.length ?? 0) + 1, startWeek: state.week, endWeek: state.week + 51, priority: annualPriorityChoice, title: details.title, promises: details.promises, baseline: annualSnapshot(state) },
      news: [{ id: Date.now(), week: state.week, category: "negocios", headline: `${state.holdingName} anuncia ${details.title}`, body: `A liderança assumiu três promessas públicas para as próximas 52 semanas: ${details.promises.join("; ")}.`, impact: "neutro" }, ...state.news].slice(0, 60),
    }));
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

  const start = (sector: Sector, holdingName: string, founderName: string) => {
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
      return {
        ...changed,
        unread: changed.unread.filter((m) => m.id !== message.id),
        log: [choice.result, ...changed.log].slice(0, 10),
      };
    });
    notify(choice.result);
    setSelectedMessage(null);
  };

  const addMessage = (message: StoryMessage) =>
    setGame((s) =>
      s.unread.some((m) => m.id === message.id)
        ? s
        : { ...s, unread: [...s.unread, message] },
    );

  const followWeeklyAdvice = (advice: WeeklyAdvice) => {
    if (advisedCompany)
      setGame((state) => ({ ...state, activeCompanyId: advisedCompany.id }));
    if (advice.action === "pessoas") setView("pessoas");
    if (advice.action === "projetos") setView("projetos");
    if (advice.action === "mercado") setView("cidade");
    if (advice.action === "estrategia") setView("escritorio");
    setDialog(null);
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
            label: `Aceitar ${compact.format(valuation * 1.35)}`,
            tone: "good",
            result:
              "Você vendeu sua primeira empresa. Agora joga com o próprio patrimônio.",
            effect: (s) => ({
              ...s,
              personalCash: s.personalCash + Math.round(valuation * 1.35),
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
    if (!active || active.sold || active.bankrupt) return;
    setGame((current) => {
      const nextWeek = current.week + 1;
      const controlledExecutive = current.playerExecutive ?? current.founder;
      const economyRoll = rollEconomy(current.economy);
      const weeklyNews: NewsItem[] = economyRoll.news
        ? [{ ...economyRoll.news, id: Date.now() + 1, week: nextWeek }]
        : [];
      const ambientNews = generateWorldNews(
        current,
        economyRoll.economy,
        nextWeek,
        current.recentNewsTopics ?? [],
        nextWeek % 4 === 0 ? 2 : 1,
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
        if (ceoDecisionWeek) {
          if (ceoStyle === "crescimento") {
            ceoCustomerBoost = Math.round(3 + ceoSpend / 3500);
            ceoReputationBoost = 1.2;
            ceoLastDecision = "Acelerou marketing e expansão comercial";
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
          Math.random() < 0.16
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
              lawsuitWeeks: Math.max(0, (p.lawsuitWeeks ?? 0) - 1),
            };
          }
          const setback =
            Math.random() < p.risk / 650
              ? 8 + Math.round(Math.random() * 13)
              : 0;
          const availableCount = company.employees.filter(
            (e) => (e.leaveWeeks ?? 0) <= 0,
          ).length;
          const progress =
            p.progress +
            Math.round(
              cm.skill / 11 +
                availableCount * 1.35 -
                p.risk / 27 +
                ceoProgressBoost,
            ) -
            setback;
          return progress >= 100
            ? {
                ...p,
                progress: 100,
                status: "concluido" as const,
                lifecycle:
                  p.kind === "produto" ? ("mercado" as const) : p.lifecycle,
                marketStage:
                  p.kind === "produto"
                    ? ("lancamento" as const)
                    : p.marketStage,
                marketWeeks: 0,
                productPrice: p.productPrice ?? company.price,
                productMarketing: p.productMarketing ?? 0,
                version: p.version ?? 1,
                patented: p.patented ?? false,
                rightsOwned: p.rightsOwned ?? 100,
                royaltyRevenue: p.royaltyRevenue ?? 0,
              }
            : {
                ...p,
                progress: Math.max(0, progress),
                quality: clamp(p.quality + cm.skill / 55 - setback / 4),
                risk: clamp(p.risk + (setback ? 7 : -1)),
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
        const customerDelta = Math.round(
          (company.marketing / 1900 +
            company.reputation / 20 -
            Math.max(0, 70 - cm.morale) / 7 +
            Math.random() * 6) *
            economyRoll.economy.demand +
            effectValue("customerDelta") +
            ceoCustomerBoost,
        );
        const evolvedEmployees = company.employees.map((e) => {
          const creditedProduct = newlyCompleted.find(
            (project) => project.proposedByEmployeeId === e.id,
          );
          const payGap = e.salary / Math.max(1, e.market);
          const onLeave = (e.leaveWeeks ?? 0) > 0;
          const workload =
            activePressure / 34 +
            company.projects.filter((p) => p.status === "ativo").length * 1.05;
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
          return {
            ...e,
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
                (creditedProduct ? 9 : 0),
            ),
            loyalty: clamp(
              e.loyalty +
                (company.culture === "Pessoas" ? 0.6 : 0) -
                careerStagnation -
                (stress > 82 ? 1 : 0) +
                (creditedProduct ? 7 : 0),
            ),
            relation: clamp(
              e.relation +
                (company.culture === "Pessoas" ? 0.5 : 0) +
                (Math.random() - 0.5) +
                (creditedProduct ? 6 : 0),
            ),
            stress: clamp(
              stress + effectValue("stressDelta") - ceoStressRelief,
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
          const leaves =
            e.loyalty < 18 && (e.weeks ?? 0) > 8 && Math.random() < 0.24;
          if (leaves)
            weeklyNews.push({
              id: Date.now() + e.id,
              week: nextWeek,
              category: "pessoas",
              headline: `${e.name} deixa ${company.name} sem acordo`,
              body: `A saída de ${e.role.toLowerCase()} ocorre após semanas de desgaste e deve afetar projetos em andamento.`,
              impact: "negativo",
            });
          return !leaves;
        });
        if (
          employees.length > 1 &&
          activePressure > 64 &&
          Math.random() < 0.07
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
        const hiringReserve = replacementVacancy
          ? 25000 + plannedHire.salary * 4 + 9000
          : 45000 + plannedHire.salary * 8 + 9000;
        const hiringReviewDue = replacementVacancy
          ? (nextWeek + company.id) % 3 === 0
          : (nextWeek + company.id) % (ceoStyle === "crescimento" ? 9 : ceoStyle === "pessoas" ? 10 : 12) === 0;
        const canHire =
          delegated &&
          (company.ceoTenure ?? 0) >= (replacementVacancy ? 2 : 4) &&
          (ceoHireCooldown === 0 || (replacementVacancy && ceoHireCooldown <= 2)) &&
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
            skill: badHire ? Math.max(48, plannedHire.skill - 22) : plannedHire.skill,
            morale: badHire ? 64 : plannedHire.morale,
            loyalty: badHire ? 45 : plannedHire.loyalty,
            trait: badHire ? "Boa entrevista, execução incerta" : plannedHire.trait,
            memories: [characterMemory(nextWeek, "contratacao", `${company.ceo} me contratou com autonomia para reforçar a ${company.name}.`, "confiante", 4, 70)],
          };
          employees = [...employees, autonomousHire];
          ceoExtraCost += 9000;
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
        if (exposedProduct && Math.random() < 0.018) {
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
          ceoExtraCost;
        const dividend =
          cm.profit > 0 && (company.dividendRate ?? 0) > 0
            ? Math.min(
                Math.max(0, grossCash - 50000),
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
        const partners = (company.partners ?? createBusinessPartners(company.sector, company.id)).map((partner) => {
          if (partner.status !== "ativo") return partner;
          const weeksLeft = Math.max(0, partner.weeksLeft - 1);
          const identityTrust = partner.kind === "cliente"
            ? (publicIdentity.integridade - 50) / 180 + (publicIdentity.visao - 50) / 260
            : (publicIdentity.negociacao - 50) / 240 + (publicIdentity.prudencia - 50) / 220;
          if (partner.trust < 24 && Math.random() < 0.08) {
            weeklyNews.push({ id: Date.now() + partner.id.length * 73, week: nextWeek, category: "negocios", headline: `${partner.name} suspende acordo com ${company.name}`, body: `A confiança caiu para ${Math.round(partner.trust)}%. A dependência de ${partner.dependency}% amplia o impacto da ruptura.`, impact: "negativo" });
            return { ...partner, status: "negociacao" as const, weeksLeft: 0, lastEvent: "A baixa confiança levou à suspensão do contrato." };
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
        return {
          ...company,
          cash: nextCash,
          customers: Math.max(1, company.customers + customerDelta),
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
              ceoReputationBoost,
          ),
          productRevenue,
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
          personalityEffect + cycleEffect + partnershipEffect,
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
        if (rival.relationship === "rival" && shock < 0.035) {
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
      if (mergerBuyers.length && Math.random() < 0.025) {
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
      const dynastyMessage =
        current.dynastyMode &&
        nextWeek - (current.lastDynastyEventWeek ?? current.dynastyStartedWeek ?? 0) >= 7 &&
        current.unread.length === 0 &&
        Math.random() < 0.32
          ? dynastyStoryMessage({ ...current, week: nextWeek, companies })
          : null;
      const familyCandidate = (current.heirs ?? [])[nextWeek % Math.max(1, (current.heirs ?? []).length)];
      const familyMessage =
        !current.founderRetired &&
        familyCandidate &&
        nextWeek >= 12 &&
        nextWeek - (current.lastFamilyEventWeek ?? 0) >= 14 &&
        current.unread.length === 0 &&
        Math.random() < 0.24
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
        !dynastyMessage &&
        !familyMessage &&
        !personalMessage &&
        !nemesisMessage &&
        politicalCandidate &&
        nextWeek >= 8 &&
        current.unread.length === 0 &&
        Math.random() < 0.22 + Math.max(0, -characterMemoryScore(politicalCandidate.ceoMemories, nextWeek)) / 100
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
        !personalMessage &&
        !nemesisMessage &&
        !ceoProposalMessage &&
        crisisEmployee &&
        !current.unread.some((m) =>
          m.id.startsWith(`employee-${crisisEmployee.id}-`),
        ) &&
        Math.random() < 0.2 + Math.max(0, -characterMemoryScore(crisisEmployee.memories, nextWeek)) / 120
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
        Math.random() < .68
          ? employeeProductIdeaMessage(ideaEmployee, activeCompany, economyRoll.economy, nextWeek)
          : null;
      const narrativeMessage =
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
        Math.random() < 0.24
          ? narrativeEvent(activeCompany, {
              ...current,
              week: nextWeek,
              companies,
              competitors,
            })
          : null;

      if (crisisEmployee && Math.random() < 0.16) {
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
      const finalWeeklyNews = dedupeNewsItems(weeklyNews, current.news);
      const weeklyReport = buildWeeklyReport(current, companies, economyAfterNews, nextWeek);
      const becameJourneyReady = !current.founderJourneyReady && !current.founderJourneyComplete && nextWeek >= 130;
      const nextState: GameState = {
        ...current,
        week: nextWeek,
        chapter: Math.max(current.chapter, founderAct(nextWeek).id),
        personalCash: current.personalCash + holdingDividends,
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
        factions,
        factionHistory: hostileFaction ? [`Semana ${nextWeek}: ${hostileFaction.name} iniciou oposição.`, ...(current.factionHistory ?? [])].slice(0, 16) : current.factionHistory,
        annualPlan,
        annualReviews,
        legacy: current.legacy + (completedAnnualReview ? Math.round(completedAnnualReview.score / 12) : 0),
        reputation: clamp(current.reputation + (completedAnnualReview ? completedAnnualReview.score >= 67 ? 4 : -4 : 0)),
        nemesisId: current.nemesisId ?? competitors[0]?.id,
        founderPersonal: current.founderRetired ? current.founderPersonal : {
          ...(current.founderPersonal ?? { health: 82, family: 72, satisfaction: 60, ego: 38, regrets: 8 }),
          health: clamp((current.founderPersonal?.health ?? 82) - (nextWeek % 4 === 0 ? .35 : 0)),
        },
        founderJourneyReady: current.founderJourneyReady || nextWeek >= 130,
        unread: dynastyMessage
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
        log: [
          `Semana ${current.week}: ${activeMetrics.profit >= 0 ? "lucro" : "prejuízo"} de ${money.format(Math.abs(activeMetrics.profit))}.`,
          ...(completedName ? [`Projeto ${completedName} concluído.`] : []),
          ...current.log,
        ].slice(0, 12),
      };
      setTimeout(
        () => storyBeat(nextState, activeCompany, activeMetrics.valuation),
        0,
      );
      if (dynastyMessage)
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
    if (!active || !isCEO || active.cash < 9000) return;
    updateActive((c) => ({
      ...c,
      cash: c.cash - 9000,
      employees: [...c.employees, {
        ...candidate,
        id: Date.now(),
        memories: addCharacterMemory(candidate.memories, characterMemory(
          game.week,
          "contratacao",
          "Você apostou em mim e abriu as portas desta empresa.",
          "confiante",
          7,
          72,
        )),
      }],
      workforceTarget: Math.max(c.workforceTarget ?? c.employees.length, c.employees.length + 1),
    }));
    setGame((state) => evolveIdentity(state, { pessoas: 1 }, `contratação de ${candidate.name}`));
    setDialog(null);
    notify(`${candidate.name} aceitou sua proposta.`);
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
    }));
    setGame((state) => evolveIdentity(
      state,
      { negociacao: 2, pessoas: increase > 0.08 ? 3 : increase >= 0 ? 1 : -3, prudencia: increase < 0 ? 2 : 0 },
      `acordo salarial com ${employee.name}`,
    ));
    setDialog(null);
    setSalaryEmployee(null);
    setNegotiationNote("");
    notify(`${employee.name} aceitou ${money.format(salaryOffer)} por mês.`);
  };

  const createProject = (kind: "seguro" | "ousado" | "marca") => {
    if (!isCEO) return;
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
    updateActive((c) => ({
      ...c,
      cash: c.cash - p.budget,
      projects: [
        ...c.projects,
        {
          ...p,
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
    if (!isCEO || product.kind !== "produto" || product.status !== "concluido")
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

  const launchProductVersion = () => {
    if (!active || !managedProduct || active.cash < 35000) return;
    updateManagedProduct(
      {
        version: (managedProduct.version ?? 1) + 1,
        quality: clamp(managedProduct.quality + 12),
        marketWeeks: 6,
        marketStage: "crescimento",
        risk: clamp(managedProduct.risk - 4),
      },
      -35000,
    );
    notify(
      `Versão ${(managedProduct.version ?? 1) + 1} lançada. O produto voltou a crescer.`,
    );
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
    setGame((s) => ({
      ...s,
      companies: s.companies.map((c) =>
        c.id !== active.id
          ? c
          : {
              ...c,
              cash: c.cash + rightsOffer.value,
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
          body: `A transação de ${money.format(rightsOffer.value)} encerra o produto dentro da empresa e transfere sua exploração comercial ao comprador.`,
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
    const buyer = [
      "Grupo Meridian",
      "Northstar Capital",
      "Horizonte Participações",
      "Fundo Aurora",
      "Vértice Global",
    ][Math.floor(Math.random() * 5)];
    setGame((s) => ({
      ...s,
      personalCash: s.personalCash + offer,
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
          body: `A venda encerra um ciclo para o fundador e inicia especulações sobre seu próximo negócio. Funcionários aguardam detalhes sobre a transição.`,
          impact: "neutro",
        },
        ...s.news,
      ].slice(0, 50),
    }));
    setGame((state) => evolveIdentity(state, { negociacao: 4, prudencia: 3, visao: -1 }, `venda da ${active.name}`));
    setDialog(null);
    setView("portfolio");
    notify(`Empresa vendida por ${money.format(offer)}.`);
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
      const amount = Math.min(
        Math.round(holdingCompany.cash * 0.08),
        Math.max(0, holdingCompany.cash - 50000),
      );
      if (amount <= 0) return;
      setGame((s) => ({
        ...s,
        personalCash: s.personalCash + amount,
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
      notify(`${money.format(amount)} distribuídos ao patrimônio do fundador.`);
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
    const buyer = [
      "Grupo Meridian",
      "Aurora Partners",
      "Vértice Global",
      "Orbe Participações",
    ][Math.floor(Math.random() * 4)];
    setGame((s) => ({
      ...s,
      personalCash: s.personalCash + offer,
      companies: s.companies.map((c) =>
        c.id === holdingCompany.id ? { ...c, sold: true, buyer } : c,
      ),
      news: [
        {
          id: Date.now(),
          week: s.week,
          category: "negocios",
          headline: `${s.holdingName} vende ${holdingCompany.name}`,
          body: `${buyer} pagou ${money.format(offer)} pela empresa. O grupo perde a operação e ganha liquidez.`,
          impact: "neutro",
        },
        ...s.news,
      ].slice(0, 50),
    }));
    setDialog(null);
    setHoldingCompanyId(null);
    notify(`Empresa vendida por ${money.format(offer)}.`);
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
            setView(operationalAccess ? "escritorio" : "portfolio")
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
          <button className="inbox-button" onClick={() => setDialog("inbox")}>
            Mensagens {game.unread.length > 0 && <i>{game.unread.length}</i>}
          </button>
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
              onClick={() => setView(id)}
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
          onClick={() => setView("noticias")}
        >
          <span>PLANTÃO</span>
          <b>{game.news[0].headline}</b>
          <small>Ver noticiário ›</small>
        </button>
      )}

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
                onClick={() => setView("pessoas")}
              >
                <i>{active.employees.length}</i>
                <span>Conversar com a equipe</span>
              </button>
              <button
                className="hotspot board"
                onClick={() => setView("projetos")}
              >
                <i>
                  {active.projects.filter((p) => p.status === "ativo").length}
                </i>
                <span>Quadro de projetos</span>
              </button>
              <button
                className="hotspot city"
                onClick={() => setView("cidade")}
              >
                <i>↗</i>
                <span>Observar o mercado</span>
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
                  <b>
                    {p.kind === "produto"
                      ? `${compact.format(productWeeklyRevenue(p))}/sem.`
                      : `${compact.format(p.reward)} entrega`}
                  </b>
                </div>
                {p.status === "concluido" &&
                  p.kind === "produto" &&
                  p.lifecycle === "mercado" && (
                    <button
                      className="product-manage"
                      disabled={!isCEO}
                      onClick={() => openProductDecision(p)}
                    >
                      Gerenciar produto
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
                <div className="partner-value"><small>{partner.kind === "cliente" ? "RECEITA SEMANAL" : "CUSTO SEMANAL"}</small><b>{money.format(partner.weeklyValue)}</b></div>
                <div className="partner-stats"><span>Confiança <b>{Math.round(partner.trust)}%</b></span><span>Dependência <b>{Math.round(partner.dependency)}%</b></span><span>Prazo <b>{partner.weeksLeft} sem.</b></span></div>
                <em>{partner.lastEvent}</em><button disabled={!isCEO} onClick={() => { setSelectedPartnerId(partner.id); setDialog("partner"); }}>{partner.status === "negociacao" ? "Renegociar contrato" : "Gerir relação"}</button>
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
              <span>Marketing semanal</span>
              <b>{money.format(active.marketing)}</b>
              <input
                type="range"
                min="0"
                max="35000"
                step="1000"
                value={active.marketing}
                onChange={(e) =>
                  updateActive((c) => ({
                    ...c,
                    marketing: Number(e.target.value),
                  }))
                }
              />
            </label>
            <div>
              <span>Valor estimado</span>
              <b>{compact.format(metrics?.valuation ?? 0)}</b>
              <small>O comprador pode oferecer mais — ou menos.</small>
            </div>
          </div>
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
            <header><div><small>{selectedPartner.kind.toUpperCase()} ESTRATÉGICO · {selectedPartner.status.toUpperCase()}</small><h2>{selectedPartner.name}</h2><p>{selectedPartner.representative} negocia com perfil {selectedPartner.personality}. Sua identidade como {leadershipTitle.toLowerCase()} influencia a confiança e a força do acordo.</p></div><b>{money.format(selectedPartner.weeklyValue)}<span>{selectedPartner.kind === "cliente" ? "receita" : "custo"}/semana</span></b></header>
            <div className="partner-negotiation-facts"><div><small>CONFIANÇA</small><b>{Math.round(selectedPartner.trust)}%</b></div><div><small>DEPENDÊNCIA</small><b>{Math.round(selectedPartner.dependency)}%</b></div><div><small>CONTRATO</small><b>{selectedPartner.weeksLeft} sem.</b></div><div><small>SEU PODER DE NEGOCIAÇÃO</small><b>{Math.round((game.leadershipIdentity?.negociacao ?? 50) * .45 + (game.leadershipIdentity?.integridade ?? 50) * .2 + selectedPartner.trust * .35)}%</b></div></div>
            <p className="partner-last-event">“{selectedPartner.lastEvent}”</p>
            <section className="partner-decisions">
              <button onClick={() => partnerAction("renovar")}><b>Renovar com equilíbrio</b><span>18 semanas · confiança +4 · pequeno reajuste contratual.</span></button>
              <button onClick={() => partnerAction("pressionar")}><b>Pressionar por condições melhores</b><span>{selectedPartner.kind === "cliente" ? "+12% de receita" : "−10% de custo"} se funcionar; reduz confiança e pode ser recusado.</span></button>
              <button disabled={active.cash < 20000} onClick={() => partnerAction("relacionamento")}><b>Investir na relação · R$ 20 mil</b><span>Confiança +15 · amplia prazo · fortalece sua imagem humana.</span></button>
              <button className="danger" onClick={() => partnerAction("encerrar")}><b>Encerrar contrato</b><span>Remove imediatamente receita ou custo e pode afetar reputação.</span></button>
            </section>
          </div>
        </GameModal>
      )}
      {dialog === "weekly-report" && selectedWeeklyReport && selectedCompanyReport && (
        <GameModal onClose={() => setDialog(null)} wide>
          <div className="weekly-advice-room">
            <header className="weekly-advice-title">
              <div className="advisor-avatar">HD</div>
              <div><small>CONSELHO DA SEMANA {selectedWeeklyReport.week}</small><h2>{selectedCompanyReport.severity === "critico" ? "Temos algo importante para resolver." : selectedCompanyReport.severity === "atencao" ? "Eu olharia isto antes de avançar." : "A empresa está respirando. Não complique."}</h2><p>{selectedCompanyReport.summary}</p></div>
              <span className={`report-severity ${selectedCompanyReport.severity}`}>{selectedCompanyReport.severity}</span>
            </header>
            {selectedWeeklyReport.companies.length > 1 && <nav className="advice-company-tabs">
              {selectedWeeklyReport.companies.map((report) => <button className={report.companyId === selectedCompanyReport.companyId ? "active" : ""} onClick={() => setReportCompanyId(report.companyId)} key={report.companyId}>{report.companyName}</button>)}
            </nav>}
            <section className="advisor-quote"><b>Helena:</b> “Você não precisa entender nove gráficos. Precisa decidir qual incêndio merece o extintor primeiro.”</section>
            <section className="weekly-advice-grid">
              {weeklyAdvice.map((advice) => <article className={advice.tone} key={advice.title}><small>{advice.tone === "urgente" ? "FAÇA AGORA" : advice.tone === "atencao" ? "VALE OLHAR" : "BOA OPORTUNIDADE"}</small><h3>{advice.title}</h3><p>{advice.detail}</p><button onClick={() => followWeeklyAdvice(advice)}>{advice.actionLabel}</button></article>)}
            </section>
            <section className="weekly-pulse">
              {selectedCompanyReport.indicators.filter((item) => ["revenue", "profit", "customers", "stress"].includes(item.key)).map((item) => <div key={item.key}><small>{item.label}</small><b>{formatIndicatorValue(item.after, item.format)}</b><span className={item.key === "stress" ? item.delta > 0 ? "bad" : "good" : item.delta < 0 ? "bad" : "good"}>{item.delta > 0 ? "+" : ""}{formatIndicatorValue(item.delta, item.format)}</span></div>)}
            </section>
            <footer className="weekly-advice-footer"><span>Economia: <b>{selectedWeeklyReport.economyAfter}</b></span><span>Confiança do mercado: <b>{selectedWeeklyReport.confidenceAfter}/100</b></span><button onClick={() => setDialog(null)}>Entendi. Voltar ao jogo.</button></footer>
          </div>
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
      {dialog === "hire" && (
        <GameModal onClose={() => setDialog(null)}>
          <ModalTitle
            label="MERCADO DE TALENTOS"
            title="Uma contratação muda o grupo."
            text={`A lista é própria do setor e da região da ${active?.name ?? "empresa"}, com novos perfis a cada duas semanas. Além de competência, considere ambição, lealdade e cultura.`}
          />
          <div className="hire-list">
            {(active ? createLaborMarket(active.sector, active.id, game.week, active.employees.map((employee) => employee.name), 10) : [])
              .map((c) => (
                <button key={c.name} onClick={() => hire(c)}>
                  <Avatar initials={c.initials} color={c.color} />
                  <span>
                    <b>{c.name}</b>
                    <small>
                      {c.role} · {c.trait}
                    </small>
                    <em>“{c.ambition}.”</em>
                  </span>
                  <strong>{money.format(c.salary)}</strong>
                </button>
              ))}
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
                recursos.
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
                  {managedProduct.rightsOwned ?? 100}% dos direitos pertencem à
                  empresa.
                </p>
              </div>
              <div className="product-revenue">
                <small>RECEITA SEMANAL ESTIMADA</small>
                <b>{money.format(productWeeklyRevenue(managedProduct))}</b>
                <span>
                  {managedProduct.licensee
                    ? `inclui royalties de ${managedProduct.licensee}`
                    : "vendas diretas"}
                </span>
              </div>
            </header>
            {rightsOffer ? (
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
                  <button
                    disabled={active.cash < 35000}
                    onClick={launchProductVersion}
                  >
                    Lançar nova versão · R$ 35 mil
                  </button>
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
            text={`A estimativa atual da ${active.name} é ${money.format(metrics.valuation)}. Uma venda converte o negócio em patrimônio pessoal e permite começar de novo em outro setor.`}
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
              ], ["familia", "Família"], ["poder", "Poder"], ["sucessao", "Sucessão"], ["cronica", "Crônica"]] as const).map(([id, label]) => (
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
                      <dl><div><dt>Influência</dt><dd>{Math.round(president.influence)}%</dd></div><div><dt>Relação</dt><dd>{Math.round(president.relationship)}%</dd></div><div><dt>Ambição</dt><dd>{Math.round(president.ambition)}%</dd></div></dl>
                      <p className="former-last-move">{president.lastMove}</p>
                      <footer><button disabled={game.personalCash < 30000} onClick={() => formerPresidentAction(president.name, "aproximar")}>Reconciliar</button><button disabled={game.personalCash < 80000} onClick={() => formerPresidentAction(president.name, "conselho")}>Dar poder</button><button disabled={game.personalCash < 60000} onClick={() => formerPresidentAction(president.name, "limitar")}>Limitar influência</button></footer>
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
            {dynastyTab === "cronica" && <section className="dynasty-history room-tab-panel"><small>CRÔNICA DA FAMÍLIA</small>{(game.dynastyHistory ?? []).slice(0, 8).map((item, index) => <p key={`${item}-${index}`}>{item}</p>)}</section>}
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
                    step="10000"
                    value={transferAmount}
                    onChange={(e) =>
                      setTransferAmount(Math.max(0, Number(e.target.value)))
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
                    transferAmount <= 0
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
        </GameModal>
      )}
      {toast && <div className="game-toast">{toast}</div>}
    </main>
  );
}

function StartScreen({
  onStart,
}: {
  onStart: (sector: Sector, holdingName: string, founderName: string) => void;
}) {
  const [sector, setSector] = useState<Sector>("Tecnologia");
  const [holdingName, setHoldingName] = useState("");
  const [founderName, setFounderName] = useState("");
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
                  onStart(sector, holdingName, founderName);
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
        <article className="sector-preview">
          <div>
            <small>SEU PRIMEIRO NEGÓCIO</small>
            <h2>{sectorData[sector].title}</h2>
            <p>{sectorData[sector].desc}</p>
          </div>
          <button
            disabled={!validName || !validFounder}
            onClick={() => onStart(sector, holdingName, founderName)}
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
