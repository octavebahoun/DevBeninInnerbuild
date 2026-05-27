import React from 'react';
import { Search } from 'lucide-react';

export default function ProjectFilters({
  query,
  onQueryChange,
  categories,
  activeCategory,
  onCategoryChange,
  stacks,
  activeStack,
  onStackChange,
  sortBy,
  onSortChange,
}) {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="relative w-full md:max-w-sm">
          <Search className="absolute left-3 top-2.5 h-4 w-4" style={{ color: 'var(--text-muted)' }} />
          <input
            value={query}
            onChange={(event) => onQueryChange(event.target.value)}
            placeholder="Rechercher un projet, tag, stack..."
            className="w-full rounded px-3.5 py-2 pl-9 text-xs focus:outline-none"
            style={{ background: 'var(--card-bg)', border: '1px solid var(--border-col)', color: 'var(--text-main)' }}
          />
        </div>
        <div className="flex items-center gap-3">
          <label className="text-[10px] uppercase tracking-widest" style={{ color: 'var(--text-sub)' }}>
            Trier
          </label>
          <select
            value={sortBy}
            onChange={(event) => onSortChange(event.target.value)}
            className="rounded px-3 py-2 text-xs"
            style={{ background: 'var(--card-bg)', border: '1px solid var(--border-col)', color: 'var(--text-main)', colorScheme: 'dark' }}
          >
            <option value="recent" className="bg-neutral-900 text-white">Plus recents</option>
            <option value="likes" className="bg-neutral-900 text-white">Plus aimes</option>
            <option value="comments" className="bg-neutral-900 text-white">Plus commentes</option>
            <option value="alpha" className="bg-neutral-900 text-white">A a Z</option>
          </select>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <div className="text-[10px] uppercase tracking-widest mb-2" style={{ color: 'var(--text-sub)' }}>
            Categories
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => onCategoryChange(cat)}
                className="rounded-full px-4 py-1.5 text-[10px] font-semibold tracking-wider"
                style={
                  activeCategory === cat
                    ? {
                        background: 'var(--accent-orange)',
                        color: '#fff',
                        border: '1px solid var(--accent-orange)',
                      }
                    : {
                        background: 'var(--card-bg)',
                        border: '1px solid var(--border-col)',
                        color: 'var(--text-muted)',
                      }
                }
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div>
          <div className="text-[10px] uppercase tracking-widest mb-2" style={{ color: 'var(--text-sub)' }}>
            Tech stack
          </div>
          <div className="flex flex-wrap gap-2">
            {stacks.map((stack) => (
              <button
                key={stack}
                onClick={() => onStackChange(stack)}
                className="rounded-full px-4 py-1.5 text-[10px] font-semibold tracking-wider"
                style={
                  activeStack === stack
                    ? {
                        background: 'var(--glow-green)',
                        color: 'var(--accent-green)',
                        border: '1px solid var(--border-col)',
                      }
                    : {
                        background: 'var(--surface)',
                        border: '1px solid var(--border-col)',
                        color: 'var(--text-sub)',
                      }
                }
              >
                {stack}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
