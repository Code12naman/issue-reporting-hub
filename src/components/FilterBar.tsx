
import { categories } from '../utils/mockData';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface FilterBarProps {
  activeFilter: string;
  categoryFilter: string;
  onStatusFilter: (status: string) => void;
  onCategoryChange: (category: string) => void;
}

const FilterBar = ({ 
  activeFilter, 
  categoryFilter, 
  onStatusFilter, 
  onCategoryChange 
}: FilterBarProps) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0">
        <div className="flex space-x-2 overflow-x-auto pb-2 md:pb-0">
          <Button
            variant={activeFilter === 'all' ? 'default' : 'outline'}
            className={activeFilter === 'all' ? 'bg-fixit-primary hover:bg-fixit-secondary' : ''}
            onClick={() => onStatusFilter('all')}
          >
            All Issues
          </Button>
          <Button
            variant={activeFilter === 'open' ? 'default' : 'outline'}
            className={activeFilter === 'open' ? 'bg-fixit-danger hover:bg-red-700' : 'text-fixit-danger border-fixit-danger hover:bg-red-50'}
            onClick={() => onStatusFilter('open')}
          >
            Open
          </Button>
          <Button
            variant={activeFilter === 'in-progress' ? 'default' : 'outline'}
            className={activeFilter === 'in-progress' ? 'bg-fixit-warning hover:bg-amber-600' : 'text-fixit-warning border-fixit-warning hover:bg-amber-50'}
            onClick={() => onStatusFilter('in-progress')}
          >
            In Progress
          </Button>
          <Button
            variant={activeFilter === 'resolved' ? 'default' : 'outline'}
            className={activeFilter === 'resolved' ? 'bg-fixit-success hover:bg-green-700' : 'text-fixit-success border-fixit-success hover:bg-green-50'}
            onClick={() => onStatusFilter('resolved')}
          >
            Resolved
          </Button>
        </div>
        
        <div className="w-full md:w-64">
          <Select 
            value={categoryFilter} 
            onValueChange={onCategoryChange}
          >
            <SelectTrigger>
              <SelectValue placeholder="Filter by category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};

export default FilterBar;
