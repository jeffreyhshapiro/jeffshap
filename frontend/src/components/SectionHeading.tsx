interface Props {
  id: string;
  index: string;
  title: string;
}

export function SectionHeading({ id, index, title }: Props) {
  return (
    <div className="section-heading">
      <span className="section-heading__index" aria-hidden="true">
        {index}
      </span>
      <h2 className="section-heading__title" id={id}>
        {title}
      </h2>
      <span className="section-heading__rule" aria-hidden="true" />
    </div>
  );
}
