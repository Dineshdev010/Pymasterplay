import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Key, Type, Info } from "lucide-react";

interface ColumnInfo {
  name: string;
  type: string;
  isPrimary?: boolean;
  isNullable?: boolean;
  references?: string;
  description?: string;
}

interface TableSchema {
  name: string;
  columns: ColumnInfo[];
  description: string;
}

const SCHEMAS: TableSchema[] = [
  {
    name: "customers",
    description: "Core user data including contact info and location.",
    columns: [
      { name: "id", type: "INTEGER", isPrimary: true },
      { name: "name", type: "TEXT", isNullable: false },
      { name: "city", type: "TEXT", isNullable: false },
      { name: "signup_date", type: "TEXT", isNullable: false },
      { name: "phone", type: "TEXT", isNullable: false },
    ]
  },
  {
    name: "products",
    description: "Catalog items across various categories.",
    columns: [
      { name: "id", type: "INTEGER", isPrimary: true },
      { name: "name", type: "TEXT", isNullable: false },
      { name: "category", type: "TEXT", isNullable: false },
      { name: "price", type: "INTEGER", isNullable: false },
    ]
  },
  {
    name: "orders",
    description: "Transactional records linked to customers.",
    columns: [
      { name: "id", type: "INTEGER", isPrimary: true },
      { name: "customer_id", type: "INTEGER", references: "customers(id)" },
      { name: "order_date", type: "TEXT", isNullable: false },
      { name: "status", type: "TEXT", isNullable: false },
    ]
  },
  {
    name: "order_items",
    description: "Line items for every order, linking products to orders.",
    columns: [
      { name: "order_id", type: "INTEGER", references: "orders(id)" },
      { name: "product_id", type: "INTEGER", references: "products(id)" },
      { name: "quantity", type: "INTEGER", isNullable: false },
    ]
  },
  {
    name: "product_reviews",
    description: "Customer feedback and ratings for products.",
    columns: [
      { name: "id", type: "INTEGER", isPrimary: true },
      { name: "product_id", type: "INTEGER", references: "products(id)" },
      { name: "customer_id", type: "INTEGER", references: "customers(id)" },
      { name: "rating", type: "INTEGER", description: "1-5 range" },
      { name: "review_text", type: "TEXT" },
      { name: "review_date", type: "TEXT" },
    ]
  }
];

export function SqlSchemaTable() {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {SCHEMAS.map((table) => (
        <div key={table.name} className="space-y-3">
          <div className="flex items-center gap-3">
            <Badge variant="outline" className="bg-primary/5 text-primary border-primary/20 px-3 py-1 font-mono text-sm">
              {table.name}
            </Badge>
            <span className="text-xs text-muted-foreground italic flex items-center gap-1">
              <Info className="w-3 h-3" /> {table.description}
            </span>
          </div>
          
          <div className="rounded-xl border border-border bg-card/50 overflow-hidden shadow-sm">
            <Table>
              <TableHeader className="bg-muted/30">
                <TableRow className="hover:bg-transparent">
                  <TableHead className="w-[180px] text-[10px] uppercase tracking-widest font-bold">Column</TableHead>
                  <TableHead className="text-[10px] uppercase tracking-widest font-bold">Type</TableHead>
                  <TableHead className="text-[10px] uppercase tracking-widest font-bold">Attributes</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {table.columns.map((col) => (
                  <TableRow key={col.name} className="hover:bg-primary/5 transition-colors border-border/40">
                    <TableCell className="font-mono text-xs font-bold text-foreground">
                      <div className="flex items-center gap-1.5">
                        {col.isPrimary && <Key className="w-3 h-3 text-reward-gold" />}
                        {col.name}
                      </div>
                    </TableCell>
                    <TableCell className="font-mono text-[11px] text-muted-foreground uppercase">
                      <div className="flex items-center gap-1.5">
                        <Type className="w-3 h-3 opacity-50" />
                        {col.type}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1.5">
                        {col.isPrimary && (
                          <span className="text-[9px] font-black uppercase bg-reward-gold/10 text-reward-gold px-1.5 py-0.5 rounded-sm border border-reward-gold/20">PK</span>
                        )}
                        {col.references && (
                          <span className="text-[9px] font-black uppercase bg-primary/10 text-primary px-1.5 py-0.5 rounded-sm border border-primary/20">
                            FK: {col.references}
                          </span>
                        )}
                        {!col.isNullable && col.name !== "id" && !col.references && (
                          <span className="text-[9px] font-black uppercase bg-muted text-muted-foreground px-1.5 py-0.5 rounded-sm">NOT NULL</span>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      ))}
    </div>
  );
}
