type Props = { params: { id: string } };
export default function Page({ params }: Props) {
  return <div style={{ padding: 16 }}>Order Detail: {params.id}</div>;
}
