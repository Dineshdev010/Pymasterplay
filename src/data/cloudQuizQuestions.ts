export interface QuizQuestion {
  id: number;
  topic: string;
  question: string;
  options: string[];
  answer: string;
  explanation: string;
}

function rotateOptions(options: string[], shift: number) {
  const uniqueSet = new Set<string>();
  options.forEach(opt => uniqueSet.add(opt));
  let offset = 1;
  while (uniqueSet.size < 4) {
    const baseVal = parseFloat(options[0]);
    if (!isNaN(baseVal)) {
      const candidate = String(baseVal + offset);
      if (!uniqueSet.has(candidate)) uniqueSet.add(candidate);
    } else {
      const candidate = `${options[0]}_${offset}`;
      if (!uniqueSet.has(candidate)) uniqueSet.add(candidate);
    }
    offset++;
  }
  const uniqueOptions = Array.from(uniqueSet);
  const normalized = shift % 4;
  return [...uniqueOptions.slice(normalized), ...uniqueOptions.slice(0, normalized)];
}

export function createCloudQuestion(id: number): QuizQuestion {
  const block = Math.floor((id - 1) / 10) + 1;
  const type = (id - 1) % 10;

  if (type === 0) {
    return {
      id,
      topic: "Service Models",
      question: "Which model provides on-demand computing services like servers and storage?",
      options: rotateOptions(["IaaS", "PaaS", "SaaS", "FaaS"], block),
      answer: "IaaS",
      explanation: "Infrastructure as a Service (IaaS) provides virtualized computing resources over the internet.",
    };
  }

  if (type === 1) {
    return {
      id,
      topic: "Service Models",
      question: "Which model allows customers to develop, run, and manage applications without the complexity of infrastructure?",
      options: rotateOptions(["PaaS", "IaaS", "SaaS", "DaaS"], block),
      answer: "PaaS",
      explanation: "Platform as a Service (PaaS) provides a framework for developers to build applications.",
    };
  }

  if (type === 2) {
    return {
      id,
      topic: "Deployment",
      question: "Which cloud deployment model is shared by several organizations with common concerns?",
      options: rotateOptions(["Community Cloud", "Public Cloud", "Private Cloud", "Hybrid Cloud"], block),
      answer: "Community Cloud",
      explanation: "Community Cloud serves a specific community that has shared interests.",
    };
  }

  if (type === 3) {
    return {
      id,
      topic: "Benefits",
      question: "What is the ability to quickly scale up or down cloud resources called?",
      options: rotateOptions(["Elasticity", "Scalability", "Agility", "Availability"], block),
      answer: "Elasticity",
      explanation: "Elasticity is the ability to grow or shrink infrastructure resources dynamically.",
    };
  }

  if (type === 4) {
    return {
      id,
      topic: "Storage",
      question: "Which AWS service provides highly scalable object storage?",
      options: rotateOptions(["S3", "EBS", "EFS", "Glacier"], block),
      answer: "S3",
      explanation: "Amazon Simple Storage Service (S3) is an object storage service.",
    };
  }

  if (type === 5) {
    return {
      id,
      topic: "Compute",
      question: "Which service is used for serverless functions in AWS?",
      options: rotateOptions(["Lambda", "EC2", "Fargate", "Elastic Beanstalk"], block),
      answer: "Lambda",
      explanation: "AWS Lambda lets you run code without provisioning or managing servers.",
    };
  }

  if (type === 6) {
    return {
      id,
      topic: "Networking",
      question: "What is a private, isolated section of the AWS Cloud called?",
      options: rotateOptions(["VPC", "Subnet", "Gateway", "VPN"], block),
      answer: "VPC",
      explanation: "Amazon Virtual Private Cloud (VPC) lets you provision a logically isolated section of the AWS Cloud.",
    };
  }

  if (type === 7) {
    return {
      id,
      topic: "Database",
      question: "Which managed relational database service does AWS offer?",
      options: rotateOptions(["RDS", "DynamoDB", "Redshift", "ElastiCache"], block),
      answer: "RDS",
      explanation: "Amazon Relational Database Service (RDS) makes it easy to set up and operate relational databases.",
    };
  }

  if (type === 8) {
    return {
      id,
      topic: "Security",
      question: "Which service helps you securely control access to AWS resources?",
      options: rotateOptions(["IAM", "KMS", "GuardDuty", "Shield"], block),
      answer: "IAM",
      explanation: "AWS Identity and Access Management (IAM) helps you control access to AWS services.",
    };
  }

  return {
    id,
    topic: "Architecture",
    question: "What is the term for a globally distributed network of proxy servers?",
    options: rotateOptions(["CDN", "DNS", "VPC", "Load Balancer"], block),
    answer: "CDN",
    explanation: "A Content Delivery Network (CDN) speeds up delivery of web content.",
  };
}

export const cloudQuizQuestions: QuizQuestion[] = Array.from({ length: 500 }, (_, i) => createCloudQuestion(i + 1));
